import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      <Globe size={18} className="text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        {language === 'ar' ? 'EN' : 'العربية'}
      </span>
    </button>
  );
};

export default LanguageToggle;