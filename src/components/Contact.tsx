import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            اتصل بنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تواصل معنا لحجز المواعيد أو الاستفسارات أو الحصول على المساعدة. 
            نحن هنا لمساعدتك على مدار الساعة.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">اتصل بنا</h4>
                <p className="text-gray-600">2027 9794 7 962+</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">راسلنا</h4>
                <p className="text-gray-600">info.tibjo@gmail.com<br />appointments.tibjo@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">ساعات العمل</h4>
                <p className="text-gray-600">السبت - الخميس: 8:00 ص - 6:00 م<br />الجمعة: 9:00 ص - 4:00 م<br /></p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h3>
            <form className="space-y-6">
              
                            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+962 7 9999 9999"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="الاسم الأول"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="اسم العائلة"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option>طلب حجز موعد</option>
                  <option>استفسار عام</option>
                  <option>حالة طارئة</option>
                  <option>سؤال حول التأمين</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="يرجى وصف كيف يمكننا مساعدتك..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2 space-x-reverse font-medium"
              >
                <Send size={20} />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;