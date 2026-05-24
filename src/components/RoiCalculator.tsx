import React, { useState, useEffect } from 'react';

export default function RoiCalculator() {
  const [ticket, setTicket] = useState<number>(15000);
  const [newClients, setNewClients] = useState<number>(3);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // One-time investment packages
  const packages = [
    { name: 'Impulso de Captación', cost: 8900, badge: 'Básico' },
    { name: 'Sistema Web Inteligente', cost: 15900, badge: 'Popular' },
    { name: 'Arquitectura IA Comercial', cost: 34900, badge: 'Avanzado' }
  ];

  // Calculations
  const monthlyRevenue = ticket * newClients;
  const annualRevenue = monthlyRevenue * 12;

  // Format currency
  const formatCurrency = (val: number) => {
    if (!isMounted) {
      // Return predictable generic currency format on server-side SSR to avoid hydration mismatch
      return `$${val.toLocaleString('en-US')}`;
    }
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-transparent p-0 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-royal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Sliders */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
          <div>
            <span className="editorial-label text-xs block mb-2">Simulador de Retorno</span>
            <h3 className="font-playfair text-2xl md:text-4xl text-offwhite font-bold leading-tight">
              Calcula el impacto en tu facturación
            </h3>
            <p className="text-subtle text-sm mt-3 font-jakarta leading-relaxed">
              Mueve los controles para simular cuántos ingresos adicionales puedes generar al mes al optimizar tu conversión web e indexación con IA.
            </p>
          </div>

          <div className="space-y-6">
            {/* Slider 1: Ticket Promedio */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-offwhite font-medium font-jakarta">Ticket promedio del cliente:</label>
                <span className="text-gold font-bold font-jakarta text-lg">{formatCurrency(ticket)}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="100000"
                step="1000"
                value={ticket}
                onChange={(e) => setTicket(Number(e.target.value))}
                className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer accent-gold border border-white/5"
              />
              <div className="flex justify-between text-xs text-subtle font-jakarta">
                <span>$3,000 MXN</span>
                <span>$100,000 MXN</span>
              </div>
            </div>

            {/* Slider 2: Nuevos Clientes al Mes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-offwhite font-medium font-jakarta">Nuevos clientes mensuales gracias a IA/Web:</label>
                <span className="text-gold font-bold font-jakarta text-lg">{newClients} {newClients === 1 ? 'cliente' : 'clientes'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={newClients}
                onChange={(e) => setNewClients(Number(e.target.value))}
                className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer accent-gold border border-white/5"
              />
              <div className="flex justify-between text-xs text-subtle font-jakarta">
                <span>1 cliente</span>
                <span>15 clientes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Output & ROI cards */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
          {/* Floating borderless glow indicator with vertical gold rules */}
          <div className="relative border-l-2 border-gold pl-6 py-6 flex flex-col justify-center">
            <div className="absolute inset-0 bg-gold/2 rounded-r-xl pointer-events-none" />
            <span className="text-xs text-subtle uppercase tracking-wider font-jakarta font-semibold">
              Retorno Mensual Estimado
            </span>
            <div className="text-4xl md:text-5xl lg:text-6xl font-playfair text-offwhite font-bold my-2 tracking-tight">
              {formatCurrency(monthlyRevenue)}
            </div>
            <span className="text-sm text-gold font-medium font-jakarta">
              {formatCurrency(annualRevenue)} adicionales al año
            </span>
          </div>

          <div className="space-y-4">
            <span className="text-xs text-subtle uppercase tracking-wider font-jakarta font-semibold block mb-1">
              Tiempo para recuperar la inversión:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {packages.map((pkg, idx) => {
                const paybackMonths = pkg.cost / monthlyRevenue;
                const paybackText = paybackMonths <= 0.3 ? 'Días' : paybackMonths <= 1 ? '1 Mes' : `${Math.ceil(paybackMonths)} Meses`;
                const roiPercentage = ((annualRevenue - pkg.cost) / pkg.cost) * 100;
                
                // Show multiplier for high ROI percentages, which is more professional for CEOs
                const multiplier = annualRevenue / pkg.cost;
                const roiText = multiplier >= 2 ? `x${multiplier.toFixed(1)} veces` : `+${Math.round(roiPercentage)}%`;
                
                return (
                  <div key={idx} className="bg-transparent border border-white/5 hover:border-gold/25 hover:bg-white/[0.01] flex flex-col justify-between relative overflow-hidden group transition-all duration-300 rounded-xl p-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] uppercase font-bold text-subtle bg-white/5 px-2 py-0.5 rounded-full font-jakarta">
                          {pkg.badge}
                        </span>
                        <span className="text-xs font-bold text-gold font-jakarta">{formatCurrency(pkg.cost)}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-offwhite font-jakarta truncate leading-normal mt-2">
                        {pkg.name}
                      </h4>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-end">
                      <div>
                        <span className="text-[9px] text-subtle font-jakarta block">Amortización</span>
                        <span className="text-xs font-bold text-offwhite font-jakarta">{paybackText}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-subtle font-jakarta block">ROI Anual</span>
                        <span className="text-xs font-bold text-success font-jakarta">{roiText}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[10px] text-subtle font-jakarta leading-normal">
            *Cálculo hipotético basado en un incremento de captación y optimización. Los resultados reales varían de acuerdo a la industria y ticket promedio del negocio.
          </p>
        </div>

      </div>
    </div>
  );
}

