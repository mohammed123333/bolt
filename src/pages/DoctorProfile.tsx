import React, { useEffect, useRef, useState } from 'react';
import { Star, DollarSign, Home, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';

const DoctorProfile = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [isAtBottom, setIsAtBottom] = useState(false);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Detect if button reached original place
  const handleScroll = () => {
    if (!buttonWrapperRef.current) return;

    const rect = buttonWrapperRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // If bottom of button wrapper is visible, stop fixing
    setIsAtBottom(rect.bottom <= windowHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get doctor info dynamically
  const doctor = doctorData[doctorId as keyof typeof doctorData];
  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const data = doctor[language];

  const handleBookAppointment = () => {
    navigate(`/${doctorId}/booking`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <img
              src="/images/logo.png"
              alt="طب جو"
              className="h-16 w-auto cursor-pointer"
              onClick={() => navigate('/')}
            />
            <a 
              href="tel:+962797942027" 
              className={`flex items-center ${language === 'ar' ? 'space-x-2 space-x-reverse' : 'space-x-2'} bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
              title={language === 'ar' ? 'اتصل الآن' : 'Call Now'}
            >
              <Phone size={18} className="text-white" />
              <span className="text-white font-semibold text-sm">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </span>
            </a>
          </div>
          <LanguageToggle />
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Doctor Image */}
          <div className="relative h-80 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <img
              src={doctor.image}
              alt={data.name}
              className="w-64 h-64 object-cover rounded-full shadow-lg"
            />
          </div>

          <div className="p-8">
            {/* Name & Specialty */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-6">{data.specialty}</p>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <span className={`text-lg font-medium text-gray-700 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>
                {t('rating')}:
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Pricing & Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <DollarSign className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-700">{doctor.priceClinic} {t('jordanianDinar')}</span>
              </div>

              {doctor.priceHome !== '_' && doctor.priceHome && (
                <div className="flex items-center">
                  <Home className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <span className="text-gray-700">{doctor.priceHome} {t('jordanianDinar')} - {t('homeVisit')}</span>
                </div>
              )}

              <div className="flex items-center">
                <Clock className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-700">{doctor.waitingTime} {t('minutes')} - {t('waitingTime')}</span>
              </div>

              <div className="flex items-center">
                <MapPin className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-gray-700">{doctor.location[language]}</span>
                  <button
                    onClick={() => window.open(doctor.googleMapsUrl || 'https://maps.google.com', '_blank')}
                    className={`text-blue-600 hover:text-blue-800 underline text-sm transition-colors ${language === 'en' ? 'ml-2' : ''}`}
                  >
                    {language === 'ar' ? 'الموقع على خرائط جوجل' : 'Location on Google Maps'}
                  </button>
                </div>
              </div>

<div className="flex items-center">
  <Phone className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
  <span className="text-gray-700 break-all" dir="ltr">
    {doctor.phone} - {t('directBooking')}
  </span>
</div>

            </div>

            {/* Specializations */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('specializations')}</h3>
              <ul className="space-y-2">
                {data.specializations.map((spec, index) => (
                  <li key={index} className="flex items-center">
                    <div className={`w-2 h-2 bg-blue-600 rounded-full ${language === 'ar' ? 'ml-3' : 'mr-3'}`}></div>
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Me */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('aboutMe')}</h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{data.aboutMe}</div>
            </div>

            {/* Educational Certificates */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('educationalCertificates')}</h3>
              <ul className="space-y-2">
                {data.educationalCertificates.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`w-2 h-2 bg-blue-600 rounded-full ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-2 flex-shrink-0`}></div>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treated Conditions */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('treatedConditions')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.treatedConditions.map((condition, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 bg-green-600 rounded-full ${language === 'ar' ? 'ml-3' : 'mr-3'} flex-shrink-0`}></div>
                    <span className="text-gray-700 text-sm">{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatments */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('treatments')}</h3>
              <ul className="space-y-2">
                {data.treatments.map((treatment, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`w-2 h-2 bg-purple-600 rounded-full ${language === 'ar' ? 'ml-3' : 'mr-3'} mt-2 flex-shrink-0`}></div>
                    <span className="text-gray-700">{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('servicesOffered')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-2 h-2 bg-orange-600 rounded-full ${
                        language === 'ar' ? 'ml-3' : 'mr-3'
                      } flex-shrink-0`}
                    ></div>
                    <span className="text-gray-700 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

{/* Book Appointment Button */}
<div ref={buttonWrapperRef} className="mt-8 flex justify-center">
  <div
    className={`${
      isAtBottom
        ? 'relative flex justify-center'
        : 'fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4'
    }`}
  >
    <div className="flex items-center space-x-3 space-x-reverse">
      <button
        onClick={handleBookAppointment}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-500 font-medium text-base sm:text-lg shadow-lg
                   w-64 sm:w-80 md:w-96" // responsive widths
      >
        {t('bookAppointment')}
      </button>
      <button
        onClick={() => window.open('https://wa.me/962797942027', '_blank')}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        title={language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </button>
    </div>
  </div>
</div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;