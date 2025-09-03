import React from 'react';
import { ArrowLeft, Shield, Clock, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="block mb-4">احجز موعدك مع</span>
              <span className="text-blue-600 block">أفضل الأطباء</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              اكتشف أفضل الأطباء في الأردن واحجز موعدك بسهولة. 
              نوفر لك خدمة حجز المواعيد الطبية مع أطباء متخصصين ومعتمدين.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group font-medium text-lg">
                ابحث عن طبيب
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium text-lg">
                حالات الطوارئ
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="text-blue-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">طبيب معتمد</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">خدمة العملاء</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/images/woman at the dentist.jpg" 
                alt="مريض مبتسم يتلقى استشارة من طبيب في عيادته" 
                className="scale-[1] float-left mr-4 rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full opacity-20 z-0"></div>
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-indigo-200 rounded-full opacity-30 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;