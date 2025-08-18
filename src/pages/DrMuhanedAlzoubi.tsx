import React from 'react';
import { Star, DollarSign, Home, Clock, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { doctorData } from '../data/doctorData';
import LanguageToggle from '../components/LanguageToggle';

const DrMuhanedAlzoubi = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const data = doctorData[language];

  const handleBookAppointment = () => {
    navigate('/DrMuhanedAlzoubi/booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Logo and Language Toggle */}
        <div className="flex justify-between items-center mb-8">
          <img 
            src="/images/logo.png" 
            alt="طب جو" 
            className="h-16 w-auto"
          />
          <LanguageToggle />
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Doctor Image */}
          <div className="relative h-80 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <img 
              src="/images/IMG_8538.jpeg" 
              alt="د. مهند الزعبي"
              className="w-64 h-64 object-cover rounded-full shadow-lg"
            />
          </div>

          <div className="p-8">
            {/* Doctor Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-6">{data.specialty}</p>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <span className={`text-lg font-medium text-gray-700 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}>{t('rating')}:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Pricing and Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <DollarSign className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-700">30 {t('jordanianDinar')}</span>
              </div>
              
              <div className="flex items-center">
                <Home className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-700">35 {t('jordanianDinar')} - {t('homeVisit')}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-700">30 {t('minutes')} - {t('waitingTime')}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-700">{t('ammanFifthCircle')}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className={`w-5 h-5 text-gray-600 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-700 break-all">+962 7 9837 6025 - {t('directBooking')}</span>
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

            {/* About Me Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('aboutMe')}</h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {data.aboutMe}
              </div>
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
                    <div className={`w-2 h-2 bg-orange-600 rounded-full ${language === 'ar' ? 'ml-3' : 'mr-3'} flex-shrink-0`}></div>
                    <span className="text-gray-700 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Appointment Button */}
            <button
              onClick={handleBookAppointment}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium text-lg"
            >
              {t('bookAppointment')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrMuhanedAlzoubi;