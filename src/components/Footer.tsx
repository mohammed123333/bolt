import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">طب جو</div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              منصة رائدة لحجز المواعيد الطبية في الأردن، نربط المرضى بأفضل الأطباء المتخصصين.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">الرئيسية</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">من نحن</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">الخدمات</a></li>
              <li><a href="#doctors" className="text-gray-300 hover:text-blue-400 transition-colors">الأطباء</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">التخصصات</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">أمراض القلب</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الأمراض العصبية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">العظام والمفاصل</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الطوارئ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الطب العام</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">معلومات التواصل</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 space-x-reverse">
                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">2027 9794 7 962+</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info.tibjo@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 طب جو - منصة حجز المواعيد الطبية. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">سياسة الخصوصية</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">شروط الخدمة</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">سياسة الكوكيز</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;