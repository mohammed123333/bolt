import React from 'react';
import { Award, Users, Clock, MapPin } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, number: '5+', label: 'سنوات من التميز' },
    { icon: Users, number: '500+', label: 'طبيب معتمد' },
    { icon: Clock, number: '24/7', label: 'خدمة العملاء' },
    { icon: MapPin, number: '12', label: 'sمحافظة' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              عن طب جو
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              طب جو هي منصة رائدة في الأردن لحجز المواعيد الطبية، نربط المرضى بأفضل الأطباء 
              والمتخصصين في جميع أنحاء المملكة. نهدف إلى تسهيل الوصول للرعاية الصحية 
              وتوفير تجربة سلسة ومريحة للمرضى.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">أطباء معتمدون</h4>
                  <p className="text-gray-600">أطباء حاصلون على شهادات معتمدة ومتخصصون في مجالاتهم</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">حجز سهل وسريع</h4>
                  <p className="text-gray-600">احجز موعدك في دقائق معدودة من خلال منصتنا الإلكترونية</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">تغطية شاملة</h4>
                  <p className="text-gray-600">نغطي جميع محافظات الأردن مع شبكة واسعة من الأطباء</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3 mx-auto">
                    <stat.icon className="text-blue-600" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="منصة طب جو" 
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="text-green-600" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">معتمد من</div>
                  <div className="text-sm text-gray-600">أطباء مختصين</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;