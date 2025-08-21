import React from 'react';
import { Heart, Brain, Bone, Eye, Stethoscope, Activity } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'أمراض القلب',
      description: 'احجز موعد مع أطباء القلب المتخصصين في تشخيص وعلاج أمراض القلب والأوعية الدموية.',
      features: ['تخطيط القلب', 'قسطرة القلب', 'الرعاية الوقائية']
    },
    {
      icon: Brain,
      title: 'الأمراض العصبية',
      description: 'أطباء متخصصون في علاج الأمراض العصبية التي تؤثر على الدماغ والحبل الشوكي.',
      features: ['تصوير الدماغ', 'علاج السكتة', 'اضطرابات الذاكرة']
    },
    {
      icon: Bone,
      title: 'العظام والمفاصل',
      description: 'علاج أمراض العظام والمفاصل والعضلات بالطرق الجراحية وغير الجراحية.',
      features: ['استبدال المفاصل', 'طب الرياضة', 'علاج الكسور'],
      link: '/drmuhanedalzoubi' // 👈 redirect URL
    },
    {
      icon: Eye,
      title: 'طب العيون',
      description: 'خدمات شاملة لرعاية العيون من الفحوصات الروتينية إلى العمليات الجراحية المتقدمة.',
      features: ['فحص النظر', 'جراحة الساد', 'علاج الشبكية']
    },
    {
      icon: Stethoscope,
      title: 'الطب العام',
      description: 'خدمات الرعاية الأولية للحفاظ على الصحة العامة وعلاج الحالات الشائعة.',
      features: ['الفحوصات الدورية', 'الأمراض المزمنة', 'الرعاية الوقائية']
    },
    {
      icon: Activity,
      title: 'الطوارئ',
      description: 'خدمات الطوارئ الطبية على مدار الساعة مع مرافق حديثة وطاقم طبي متخصص.',
      features: ['رعاية الصدمات', 'العناية المركزة', 'خدمة الإسعاف']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            التخصصات الطبية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نوفر لك إمكانية حجز المواعيد مع أفضل الأطباء في جميع التخصصات الطبية 
            باستخدام أحدث التقنيات والمعدات الطبية المتطورة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* ✅ Button only shows if link exists */}
              {service.link && (
                <button
                  onClick={() => (window.location.href = service.link)}
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  اذهب إلى الصفحة
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
