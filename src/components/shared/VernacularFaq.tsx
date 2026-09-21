"use client";

import React, { useState } from "react";
import { HelpCircle, Globe, ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface LanguageFaqs {
  language: string;
  langCode: "en" | "hi" | "bn";
  nativeName: string;
  faqs: FaqItem[];
}

const VERNACULAR_FAQS: LanguageFaqs[] = [
  {
    language: "English",
    langCode: "en",
    nativeName: "English",
    faqs: [
      {
        question: "Where can I get free food or ration distribution near me today?",
        answer: "DonateFood.in coordinates with over 450 verified community kitchens, gurudwaras, and emergency shelter nodes across India. Visit our /assistance page or Action Hub to find the nearest distribution point serving warm meals without charge.",
      },
      {
        question: "Do I need any identity proof to receive emergency meal packets?",
        answer: "No identity cards or documents are required at emergency relief lines and community kitchens. Food is provided freely and unconditionally to anyone in need.",
      },
      {
        question: "How do I request bulk food assistance for a local slum colony or disaster area?",
        answer: "Call our 24x7 emergency helpline at 1800-FOOD-RESCUE or submit an urgent dispatch request on our Emergency Assistance portal. Our mobile fleet dispatches within 2 hours.",
      },
    ],
  },
  {
    language: "Hindi",
    langCode: "hi",
    nativeName: "हिंदी (Hindi)",
    faqs: [
      {
        question: "मेरे नजदीकी क्षेत्र में मुफ्त भोजन या राशन वितरण कहाँ उपलब्ध है?",
        answer: "DonateFood.in पूरे भारत में 450 से अधिक सत्यापित सामुदायिक रसोइयों, गुरुद्वारों और आश्रय स्थलों के साथ काम करता है। हमारे /assistance पेज या एक्शन हब पर जाकर अपने निकटतम मुफ्त भोजन केंद्र का पता लगाएं।",
      },
      {
        question: "क्या भोजन सहायता प्राप्त करने के लिए किसी पहचान पत्र (ID) की आवश्यकता है?",
        answer: "नहीं! आपातकालीन राहत केंद्रों और सामुदायिक रसोइयों में किसी पहचान पत्र या दस्तावेज़ की आवश्यकता नहीं होती। भोजन हर जरूरतमंद के लिए पूरी तरह निःशुल्क है।",
      },
      {
        question: "शादी या कार्यक्रम का बचा हुआ खाना दान करने के लिए गाड़ी कैसे बुलाएं?",
        answer: "हमारे टोल-फ्री नंबर 1800-FOOD-RESCUE पर कॉल करें। हमारी इंसुलेटेड वैन 60 मिनट के भीतर आयोजन स्थल पर पहुंचकर भोजन एकत्र करेगी।",
      },
    ],
  },
  {
    language: "Bengali",
    langCode: "bn",
    nativeName: "বাংলা (Bengali)",
    faqs: [
      {
        question: "আজকে আমার কাছাকাছি কোথায় বিনামূল্যে খাবার বা ত্রাণ বিতরণ হচ্ছে?",
        answer: "DonateFood.in কলকাতা ও সমগ্র পশ্চিমবঙ্গে একাধিক কমিউনিটি কিচেন ও এনজিওর সাথে সরাসরি যুক্ত। আপনার নিকটতম খাবার কেন্দ্রের সন্ধান পেতে আমাদের /assistance পেজে যান বা অ্যাকশন হাব দেখুন।",
      },
      {
        question: "জরুরী খাদ্য সহায়তা পাওয়ার জন্য কি কোনো পরিচয়পত্র লাগবে?",
        answer: "না, খাদ্য সহায়তার জন্য কোনো আধার কার্ড বা পরিচয়পত্রের প্রয়োজন নেই। যেকোনো অভাবী মানুষ সরাসরি এসে বিনামূল্যে পুষ্টিকর খাবার গ্রহণ করতে পারেন।",
      },
      {
        question: "অনুষ্ঠান বা বিয়ের অতিরিক্ত বেঁচে যাওয়া খাবার কীভাবে দান করবেন?",
        answer: "আমাদের টোল-ফ্রি নাম্বারে যোগাযোগ করুন। খাদ্য সুরক্ষা ও FSSAI নির্দেশিকা মেনে আমাদের উদ্ধারকারী গাড়ি এসে খাবার সংগ্রহ করে অভাবী মানুষের কাছে পৌঁছে দেবে।",
      },
    ],
  },
];

export function VernacularFaq() {
  const [selectedLang, setSelectedLang] = useState<"en" | "hi" | "bn">("en");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const currentFaqs = VERNACULAR_FAQS.find((l) => l.langCode === selectedLang) || VERNACULAR_FAQS[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
            Voice &amp; Vernacular Help Center (AEO &amp; NLP Search)
          </h2>
        </div>

        {/* Language Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <Globe className="w-4 h-4 text-slate-500 ml-2 mr-1" />
          {VERNACULAR_FAQS.map((l) => (
            <button
              key={l.langCode}
              type="button"
              onClick={() => {
                setSelectedLang(l.langCode);
                setOpenIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLang === l.langCode
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {l.nativeName}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {currentFaqs.faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-all"
              >
                <span className="text-sm font-bold text-slate-900">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
