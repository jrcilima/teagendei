import { webcrypto as crypto } from 'crypto';
import { TextEncoder } from 'util';

// Simplified auth without external dependencies
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export function generateToken(userId: string): string {
  const payload = {
    userId,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
  };
  return btoa(JSON.stringify(payload));
}

export function verifyToken(token: string): { userId: number } | null {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null;
    }
    return { userId: payload.userId };
  } catch {
    return null;
  }
}

type MinimalRequest = {
  headers: {
    get(name: string): string | null;
  };
};

export function getUserFromRequest(request: MinimalRequest): { userId: number } | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  return verifyToken(token);
}
function btoa(arg0: string): string {
  throw new Error('Function not implemented.');
}

function atob(token: string): string {
  throw new Error('Function not implemented.');
}

