import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const doctors = [
    {
      id: 'drmuhanedalzoubi',
      name: 'د. مهند الزعبي',
      specialty: 'إستشاري جراحة العظام و المفاصل',
      experience: '10+ سنة خبرة',
      image: '/images/IMG_8538.jpeg',
      qualifications: ['البورد العربي', 'البورد الأوروبي', 'البورد الأردني']
    },
    {
      id: 'drnazihjalad',
      name: 'د. نزيه الجلاد',
      specialty: 'إستشاري أمراض الدماغ و الأعصاب',
      experience: '20+ سنة خبرة',
      image: '/images/dr.nazih al-jalad.jpg',
      qualifications: ['اضطراب الحركة', 'الصرع', 'التصلب اللويحي', 'الزهايمر']
    },
    {
      id: 'dramjadzwairy',
      name: 'د. أمجد الزويري',
      specialty: 'أخصائي جراحة الفم و الفكين',
      experience: '15+ سنوات خبرة',
      image: '/images/dr.amjad alzwairy.jpg',
      qualifications: ['تجميل و ترميم الوجه', 'كسور الفكين', 'أورام الفم']
    },
    {
      id: 'drmutasemhaloush',
      name: 'د. معتصم حلّوش',
      specialty: 'إستشاري جراحة الشبكية',
      experience: '10+ سنة خبرة',
      image: '/images/dr.mutasem haloush.jpg',
      qualifications: ['جراحة الساد', 'تصحيح البصر', 'السائل الزجاجي']
    },
    {
      id: 'drsaraahmed',
      name: 'د. سارة أحمد',
      specialty: 'أخصائية أمراض القلب',
      experience: '15+ سنة خبرة',
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg',
      qualifications: ['قسطرة القلب', 'تخطيط القلب', 'ارتفاع ضغط الدم']
    },
    {
      id: 'drmohammadkhaled',
      name: 'د. محمد خالد',
      specialty: 'جراح الأعصاب',
      experience: '12+ سنة خبرة',
      image: 'https://images.pexels.com/photos/4989165/pexels-photo-4989165.jpeg',
      qualifications: ['جراحة الدماغ', 'جراحة العمود الفقري', 'الأورام العصبية']
    },
    {
      id: 'dralihassan',
      name: 'د. علي حسان',
      specialty: 'أخصائي طب الأطفال',
      experience: '8+ سنوات خبرة',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
      qualifications: ['طب الأطفال حديثي الولادة', 'التطعيمات', 'نمو الأطفال']
    },
    {
      id: 'drfatimaomar',
      name: 'د. فاطمة عمر',
      specialty: 'أخصائية أمراض النساء والتوليد',
      experience: '12+ سنة خبرة',
      image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg',
      qualifications: ['الولادة الطبيعية', 'العمليات النسائية', 'متابعة الحمل']
    },
    {
      id: 'drahmedyoussef',
      name: 'د. أحمد يوسف',
      specialty: 'أخصائي طب العيون',
      experience: '14+ سنة خبرة',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg',
      qualifications: ['جراحة الساد', 'علاج الشبكية', 'تصحيح البصر']
    },
    {
      id: 'drlaithsalim',
      name: 'د. ليث سليم',
      specialty: 'أخصائي الأمراض الجلدية',
      experience: '9+ سنوات خبرة',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
      qualifications: ['علاج الأكزيما', 'جراحة الجلد', 'التجميل الطبي']
    }
  ];

const scroll = (direction: "left" | "right") => {
  if (!scrollContainerRef.current) return;
  const container = scrollContainerRef.current;
  const amount = 300;

  let delta = direction === "left" ? -amount : amount;
  container.scrollBy({ left: delta, behavior: "smooth" });
};


const handleScroll = () => {
  if (!scrollContainerRef.current) return;
  const container = scrollContainerRef.current;

  const maxScroll = container.scrollWidth - container.clientWidth;

  // In RTL, "scrollLeft" behaves weird, so just check extremes
  const atStart = Math.abs(container.scrollLeft) === 0 || container.scrollLeft === maxScroll;
  const atEnd = Math.abs(container.scrollLeft) >= maxScroll;

  setCanScrollLeft(!atStart);
  setCanScrollRight(!atEnd);
};


  // run once to initialize button states
  useEffect(() => {
    handleScroll();
  }, []);

  const handleDoctorClick = (doctorId: string) => {
    navigate(`/${doctorId}`);
  };

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

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={24} />
          </button>

          {/* Doctors Carousel */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {doctors.map((doctor, index) => (
              <div
                key={index}
                onClick={() => handleDoctorClick(doctor.id)}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">انقر للمزيد من التفاصيل</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4">{doctor.experience}</p>

                  <div className="space-y-1 mb-6">
                    {doctor.qualifications.slice(0, 3).map((qual, qualIndex) => (
                      <p key={qualIndex} className="text-xs text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-2 flex-shrink-0"></span>
                        {qual}
                      </p>
                    ))}
                    {doctor.qualifications.length > 3 && (
                      <p className="text-xs text-blue-600 font-medium">
                        +{doctor.qualifications.length - 3} المزيد
                      </p>
                    )}
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium group-hover:shadow-lg">
                    عرض الملف الشخصي
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
            {Array.from({ length: Math.ceil(doctors.length / 3) }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300"
              ></div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            لم تجد التخصص المناسب؟ تصفح جميع أطبائنا
          </p>
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium">
            عرض جميع الأطباء
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Doctors;
