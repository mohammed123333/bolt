import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" dir="rtl">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6 space-x-reverse">
            <a 
              href="tel:+962797942027" 
              className="flex items-center space-x-2 space-x-reverse bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              title="اتصل الآن"
            >
              <Phone size={18} className="text-white" />
              <span className="text-white font-semibold">اتصل بنا</span>
            </a>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Mail size={16} />
              <span>info.tibjo@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>السبت - الخميس: 8:00 ص - 6:00 م | الجمعة: 9:00 ص - 4:00 م</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img 
  src="/images/logo.png" 
  alt="طب جو" 
  className="h-20 w-auto bg-white p-1 rounded shadow-none border border-white"
/>
</div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">الرئيسية</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">من نحن</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">الخدمات</a>
            <a href="#doctors" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">الأطباء</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">اتصل بنا</a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
              احجز موعد
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">الرئيسية</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">من نحن</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">الخدمات</a>
              <a href="#doctors" className="text-gray-700 hover:text-blue-600 transition-colors">الأطباء</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">اتصل بنا</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors w-fit">
                احجز موعد
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;