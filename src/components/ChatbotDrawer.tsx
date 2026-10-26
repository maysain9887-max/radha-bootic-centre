import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getOfflineAnswer } from '../utils/offlineKnowledge';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { MessageSquare, Send, Sparkles, X, Wifi, WifiOff, Bot, User, RefreshCw, Scissors } from 'lucide-react';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRates: () => void;
  onOpenBooking: () => void;
  onOpen3D: () => void;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  onOpenRates,
  onOpenBooking,
  onOpen3D,
}) => {
  const isOnline = useOnlineStatus();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: "Namaste! 🙏 Welcome to Radha Bootic Centre. I'm your AI Tailoring & Styling Concierge. How can I help you today? Ask me about our blouse rates (starts ₹100), custom lehenga stitching, measurement guidance, or delivery schedules!",
      timestamp: Date.now(),
      suggestions: [
        'What are the blouse stitching rates?',
        'How do I take measurements?',
        'Bridal lehenga turnaround time?',
        'Can I bring my own fabric?',
        'Do you stitch girls dresses?',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // If offline, use client-side offline knowledge base immediately
    if (!isOnline) {
      setTimeout(() => {
        const offlineResult = getOfflineAnswer(query);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: offlineResult.reply,
          timestamp: Date.now(),
          isOffline: true,
          suggestions: ['Official Tailoring Rates', 'Measurement Guide', 'Delivery Timelines'],
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 350);
      return;
    }

    // When online, call server-side Gemini endpoint
    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || "Thank you for reaching out to Radha Bootic Centre. How else can we tailor your style today?",
        timestamp: Date.now(),
        isOffline: data.isFallback,
        suggestions: ['Blouse stitching rates', 'Book custom stitching', 'Explore 3D mannequin'],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Graceful offline fallback if server call fails
      const offlineResult = getOfflineAnswer(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: offlineResult.reply,
        timestamp: Date.now(),
        isOffline: true,
        suggestions: ['View Rate Card', 'How to Measure', 'Book Appointment'],
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === 'open_rates') onOpenRates();
    else if (actionId === 'open_booking') onOpenBooking();
    else if (actionId === 'open_3d') onOpen3D();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Chatbot Header */}
        <div className="p-4 bg-gradient-to-r from-[#0F4C3F] to-[#185e4e] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/assets/aistudio/logo_3fe417b7.png"
                alt="Radha AI"
                className="w-10 h-10 rounded-full object-cover bg-white p-0.5 border border-[#D4AF37]"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-bold text-sm">Radha AI</h3>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-200">
                {isOnline ? (
                  <>
                    <Wifi className="w-2.5 h-2.5 text-emerald-300" />
                    <span>Gemini 3.8 Flash • Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-2.5 h-2.5 text-amber-300" />
                    <span className="text-amber-200 font-semibold">Offline Knowledge Engine</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'reset-1',
                    role: 'model',
                    text: 'Chat history cleared. How can I assist you with tailoring or styling today?',
                    timestamp: Date.now(),
                  },
                ]);
              }}
              title="Reset Chat"
              className="p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Offline Banner alert inside chat if disconnected */}
        {!isOnline && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-[11px] text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium">
              <WifiOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Offline Assistance Active — Instant real boutique answers without internet!</span>
            </div>
          </div>
        )}

        {/* Scrollable Message Thread */}
        <div ref={scrollRef} className="p-4 flex-1 overflow-y-auto space-y-4 bg-[#FFF8F0]/30">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[88%]">
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-[#0F4C3F] text-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs mt-0.5">
                    R
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    m.role === 'user'
                      ? 'bg-[#E91E63] text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {/* Offline Badge Pill */}
                  {m.isOffline && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-1.5">
                      ⚡ Local Knowledge Base
                    </span>
                  )}

                  {/* Render content with bullet points and bolding */}
                  <div className="whitespace-pre-line space-y-1">
                    {m.text}
                  </div>

                  <span
                    className={`block text-[9px] mt-2 ${
                      m.role === 'user' ? 'text-pink-100 text-right' : 'text-gray-400'
                    }`}
                  >
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Suggestions / Quick chips */}
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                  {m.suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(sug)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-[#FADADD] border border-gray-200 text-gray-700 font-medium transition shadow-2xs"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0F4C3F] text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                R
              </div>
              <div className="p-3 rounded-2xl bg-white border border-gray-100 text-xs text-gray-500 flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C3F] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E91E63] animate-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce delay-300"></span>
                <span className="text-[11px] text-gray-400 ml-1">
                  {isOnline ? 'Styling with Gemini...' : 'Searching boutique catalog...'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Dock */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-[11px]">
          <span className="text-gray-500 font-medium">Boutique Shortcuts:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRates}
              className="text-[#0F4C3F] font-bold hover:underline"
            >
              Rate Card (₹100+)
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={onOpen3D}
              className="text-[#E91E63] font-bold hover:underline"
            >
              Watch Video
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={onOpenBooking}
              className="text-[#0F4C3F] font-bold hover:underline"
            >
              Book Stitching
            </button>
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isOnline ? "Ask about blouse cuts, rates, measurements..." : "Ask offline concierge about rates & stitching..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-xs rounded-xl border border-gray-300 py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-[#0F4C3F]/20 focus:border-[#0F4C3F]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-[#0F4C3F] hover:bg-[#0d3f34] disabled:opacity-50 text-white transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
