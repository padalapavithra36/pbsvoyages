import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Database,
  Copy,
  Check,
  Code2,
  Table,
  Layers,
  Sparkles,
} from 'lucide-react';
import { PRISMA_SCHEMA_STRING } from '../data/mockData';

export const SchemaInspectorModal: React.FC = () => {
  const { schemaModalOpen, setSchemaModalOpen, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('all');

  if (!schemaModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PRISMA_SCHEMA_STRING);
    setCopied(true);
    showToast('Prisma database schema copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const modelsList = [
    { name: 'User', desc: 'RBAC (Traveler, Host Operator, Admin) with Citizen ID & Royal loyalty tiers' },
    { name: 'TransitRoute', desc: 'Scenic rail & motorway corridors, live occupancy metrics & gross revenue' },
    { name: 'RouteStop', desc: 'Intermediate scenic stations, arrival/departure schedules, and panoramic vistas' },
    { name: 'Cabin', desc: 'Compartment suites, capacities, bed dimensions & inventory counts' },
    { name: 'Seat', desc: 'Granular individual carriage berths with real-time seat map locking' },
    { name: 'DiningMenu', desc: 'Four-course gastronomic programs, service windows & sommelier bar' },
    { name: 'Dish', desc: 'Haute cuisine tasting courses, dietary certifications & wine pairings' },
    { name: 'Booking', desc: 'Multi-step reservation record with dining picks, bespoke hospitality & billing' },
    { name: 'StewardCall', desc: 'Real-time passenger service calls with attendant dispatch lifecycle' },
    { name: 'Review', desc: 'Verified citizen traveler feedback and route ratings' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-stone-900 text-stone-100 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  VoyageEase Relational Architecture
                </h3>
                <span className="text-[10px] font-mono bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded border border-amber-600/40">
                  Prisma ORM / PostgreSQL
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light">
                Production-ready relational schema governing routes, cabins, dining, and live steward dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Schema'}</span>
            </button>

            <button
              onClick={() => setSchemaModalOpen(false)}
              className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Models summary ribbon */}
        <div className="px-6 py-3 bg-stone-900/80 border-b border-stone-800 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-stone-400 font-medium mr-2 shrink-0">Models:</span>
          {modelsList.map((m) => (
            <span
              key={m.name}
              className="px-2.5 py-1 rounded-lg bg-stone-800 text-amber-200 border border-stone-700/60 font-mono text-[11px] shrink-0"
            >
              {m.name}
            </span>
          ))}
        </div>

        {/* Code & Architectural notes body */}
        <div className="overflow-y-auto flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Schema Code Block */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Code2 className="w-3.5 h-3.5 text-amber-400" /> prisma/schema.prisma
              </span>
              <span className="text-[11px] text-stone-500 font-mono">UTF-8 · PostgreSQL</span>
            </div>

            <pre className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300 overflow-x-auto leading-relaxed max-h-[500px] selection:bg-amber-900">
              <code>{PRISMA_SCHEMA_STRING}</code>
            </pre>
          </div>

          {/* Right Col: Relational Data Dictionary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Layers className="w-4 h-4" />
              <span>Architectural Highlights</span>
            </div>

            <div className="space-y-3">
              {modelsList.map((mod) => (
                <div
                  key={mod.name}
                  className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-300">
                      model {mod.name}
                    </span>
                    <Table className="w-3.5 h-3.5 text-stone-600" />
                  </div>
                  <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-600/30 space-y-1.5 text-xs text-amber-200">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                Atomic Seat & Inventory Locking
              </div>
              <p className="text-[11px] text-stone-300 font-light leading-relaxed">
                Prevents double-booking across high-demand luxury suites using relational foreign key constraints between <code className="text-amber-200 font-mono">Seat</code>, <code className="text-amber-200 font-mono">Cabin</code>, and <code className="text-amber-200 font-mono">Booking</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>VoyageEase Database Version: 2.4.0 (Enterprise Grand Transit)</span>
          <button
            onClick={() => setSchemaModalOpen(false)}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
