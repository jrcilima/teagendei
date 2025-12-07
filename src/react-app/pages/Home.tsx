import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Teagendei</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-white hover:text-purple-200 transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Começar Grátis
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-200 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Plataforma completa para gestão de agendamentos</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforme a Gestão
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              do seu Negócio
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Sistema completo de agendamentos para Barbearias, Salões, Esmalterias e Estéticas.
            Profissionalize sua gestão com tecnologia de ponta.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
            >
              Ver Demonstração
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-gray-300 text-lg">
              Ferramentas profissionais para gestão completa do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="bg-purple-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Agenda Inteligente
              </h3>
              <p className="text-gray-300">
                Sistema de agendamentos com visualização por dia, semana ou mês. Drag & drop e sincronização em tempo real.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="bg-pink-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Gestão de Equipe
              </h3>
              <p className="text-gray-300">
                Controle completo de profissionais, serviços, horários e comissões. Relatórios de performance individuais.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="bg-blue-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Relatórios e Analytics
              </h3>
              <p className="text-gray-300">
                Dashboards com métricas importantes. Acompanhe faturamento, ocupação e performance em tempo real.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Segments Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Perfeito para seu Segmento
            </h2>
            <p className="text-gray-300 text-lg">
              Interface adaptada para cada tipo de negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Barbearia', 'Salão de Beleza', 'Esmalteria', 'Estética'].map((segment) => (
              <div
                key={segment}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all cursor-pointer group"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {segment}
                </h3>
                <p className="text-gray-400 text-sm">
                  Interface personalizada
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section - CheckCircle is used here */}
      <div className="py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Por que escolher o Teagendei?
              </h2>
              
              <div className="space-y-4">
                {[
                  'Sistema multi-tenant com isolamento total de dados',
                  'Pagamentos via Pix integrados nativamente',
                  'Notificações automáticas por WhatsApp e Email',
                  'App PWA para clientes agendarem pelo celular',
                  'Suporte a redes de franquias e múltiplas unidades',
                  'Trial gratuito de 14 dias, sem cartão de crédito',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Plano Empresarial
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-white">R$ 60</span>
                  <span className="text-gray-300">/mês</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span>1 Unidade incluída</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span>Até 10 profissionais</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span>Agendamentos ilimitados</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span>Suporte por email</span>
                </li>
              </ul>

              <Link
                to="/register"
                className="w-full block text-center py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Começar Trial Grátis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para revolucionar seu negócio?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Comece seu trial gratuito de 14 dias agora mesmo. Sem cartão de crédito necessário.
          </p>
          
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 text-lg"
          >
            Criar Minha Conta Grátis
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Teagendei</span>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2024 Teagendei. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
