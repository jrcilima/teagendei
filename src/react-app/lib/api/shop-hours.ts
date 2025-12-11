// Caminho: src/react-app/lib/api/shop-hours.ts
import { pb } from "./pocketbase";
import type { ShopHour, Weekday } from "@/shared/types";

// Helper para converter record em ShopHour
function asShopHour(record: any): ShopHour {
  return {
    id: record.id,
    shop_id: record.shop_id,
    company_id: record.company_id,
    weekday: record.weekday,
    start_time: record.start_time,
    end_time: record.end_time,
    is_closed: record.is_closed,
    created: record.created,
    updated: record.updated,
  };
}

/**
 * Busca todos os horários configurados para uma loja
 */
export async function getShopHours(shopId: string): Promise<ShopHour[]> {
  const records = await pb.collection("shop_hours").getFullList({
    filter: `shop_id = "${shopId}"`,
    sort: "weekday", // Podemos ordenar depois no front se precisar
  });
  return records.map(asShopHour);
}

/**
 * Salva ou Atualiza um horário de funcionamento
 * (Se já existir registro para aquele dia, atualiza. Se não, cria.)
 */
export async function upsertShopHour(data: {
  shopId: string;
  companyId: string;
  weekday: Weekday;
  startTime: string; // "09:00"
  endTime: string;   // "18:00"
  isClosed: boolean;
}): Promise<ShopHour> {
  
  // 1. Tenta achar registro existente para esse dia/loja
  let existingId: string | null = null;
  try {
    const found = await pb.collection("shop_hours").getFirstListItem(
      `shop_id="${data.shopId}" && weekday="${data.weekday}"`
    );
    existingId = found.id;
  } catch {
    // Não achou, tudo bem. Vamos criar.
  }

  const payload = {
    shop_id: data.shopId,
    company_id: data.companyId,
    weekday: data.weekday,
    start_time: data.startTime,
    end_time: data.endTime,
    is_closed: data.isClosed,
  };

  if (existingId) {
    // Atualiza
    const record = await pb.collection("shop_hours").update(existingId, payload);
    return asShopHour(record);
  } else {
    // Cria
    const record = await pb.collection("shop_hours").create(payload);
    return asShopHour(record);
  }
}

/**
 * Utilitário: Cria horários padrão para uma loja nova (Seg-Sex 09-18, Sab 09-14)
 */
export async function seedDefaultHours(shopId: string, companyId: string) {
  const defaults = [
    { day: "seg", start: "09:00", end: "18:00" },
    { day: "ter", start: "09:00", end: "18:00" },
    { day: "qua", start: "09:00", end: "18:00" },
    { day: "qui", start: "09:00", end: "18:00" },
    { day: "sex", start: "09:00", end: "18:00" },
    { day: "sab", start: "09:00", end: "14:00" },
    { day: "dom", start: "00:00", end: "00:00", closed: true },
  ];

  for (const item of defaults) {
    await upsertShopHour({
      shopId,
      companyId,
      weekday: item.day as Weekday,
      startTime: item.start,
      endTime: item.end,
      isClosed: item.closed || false,
    });
  }
}