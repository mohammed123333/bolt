import React from 'react';

const Doctors = () => {
  const doctors = [
    {
      name: 'د. ',
      specialty: 'أخصائية أمراض القلب',
      experience: '15+ سنة خبرة',
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg',
      qualifications: ['دكتوراه في الطب، الجامعة الأردنية', 'زمالة أمراض القلب', 'عضو الجمعية الأردنية لأمراض القلب']
    },
    {
      name: 'د. نزيه الجلاد',
      specialty: 'جراح الأعصاب',
      experience: '20+ سنة خبرة',
      image: '/images/dr.nazih al-jalad.jpg',
      qualifications: ['اضطراب الحركة' ,'الصرع', 'التصلب اللويحي', 'الزهايمر']
    },
    {
      name: 'د. أمجد الزويري',
      specialty: 'أخصائي جراحة الفم و الفكين ',
      experience: '15+ سنوات خبرة',
      image: '/images/dr.amjad alzwairy.jpg',
      qualifications: ['تجميل و ترميم الوجه' ,'كسور الفكين', 'أورام الفم']
    },
    {
      name: 'د. معتصم حلّوش',
      specialty: 'إستشاري جراحة الشبكية',
      experience: '10+ سنة خبرة',
      image: 'https://images.pexels.com/photos/13060625/pexels-photo-13060625.jpeg',
      qualifications: ['دكتوراه في طب الطوارئ', 'أخصائي رعاية الصدمات', 'مستشفى الجامعة الأردنية']
    }
  ];

  return (
    <section id="doctors" className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            أطباؤنا المتميزون
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            فريق من الأطباء المعتمدين والمتخصصين ملتزمون بتقديم أعلى مستوى من الرعاية الطبية 
            باستخدام أحدث العلاجات والتقنيات الطبية.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-4">{doctor.experience}</p>
                
                <div className="space-y-1">
                  {doctor.qualifications.map((qual, qualIndex) => (
                    <p key={qualIndex} className="text-xs text-gray-600">• {qual}</p>
                  ))}
                </div>
                
                <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium">
                  احجز موعد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;