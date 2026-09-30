import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  Wine,
  Bed,
  Sparkles,
  Coffee,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

export const StewardCallModal: React.FC = () => {
  const { stewardModalBooking, setStewardModalBooking, addStewardRequest } = useApp();

  const [selectedRequest, setSelectedRequest] = useState('Chilled Champagne & Flutes');
  const [customNote, setCustomNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!stewardModalBooking) return null;

  const quickRequests = [
    {
      title: 'Chilled Champagne & Flutes',
      desc: 'Two flutes of chilled vintage sparkling delivered table-side.',
      icon: Wine,
    },
    {
      title: 'Turn-Down Bedding Service',
      desc: 'Egyptian cotton linen preparation, dim lighting, and bedtime herbal nightcap.',
      icon: Bed,
    },
    {
      title: 'Warm Lavender Oshibori Towels',
      desc: 'Fresh steamed essential-oil towels brought to your berth.',
      icon: Sparkles,
    },
    {
      title: 'Espresso & Artisanal Praline Refill',
      desc: 'Double shot Illy espresso with handcrafted Swiss chocolate.',
      icon: Coffee,
    },
    {
      title: 'Station Luggage Valet Assistance',
      desc: 'Porter escort to transport baggage upon terminal arrival.',
      icon: Briefcase,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStewardRequest(stewardModalBooking, selectedRequest, customNote);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStewardModalBooking(null);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#faf8f5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
              <Bell className="w-5 h-5 text-amber-800 animate-bounce" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Call Dedicated Carriage Steward
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Assigned: {stewardModalBooking.stewardAssigned} · {stewardModalBooking.selectedSeatId}
              </p>
            </div>
          </div>

          <button
            onClick={() => setStewardModalBooking(null)}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Steward Dispatched
            </h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Your attendant <strong>{stewardModalBooking.stewardAssigned}</strong> has been notified on the carriage intercom and is arriving at <strong>{stewardModalBooking.selectedSeatId}</strong> shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Select Service Request
              </label>

              <div className="space-y-2">
                {quickRequests.map((req) => {
                  const Icon = req.icon;
                  const isSelected = selectedRequest === req.title;

                  return (
                    <div
                      key={req.title}
                      onClick={() => setSelectedRequest(req.title)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                        isSelected
                          ? 'border-amber-700 bg-amber-50/60 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          isSelected
                            ? 'bg-amber-800 text-amber-100'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-stone-900">{req.title}</div>
                        <div className="text-[11px] text-stone-500 font-light">{req.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Additional Notes or In-Suite Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Please bring an extra goose down pillow and ice bucket..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setStewardModalBooking(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
              >
                Dismiss
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-100 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Dispatch Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
