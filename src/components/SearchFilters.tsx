import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    serviceType: '',
    visitType: '',
    specialty: '',
    city: '',
    area: '',
    insurance: '',
    searchKeyword: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const serviceTypes = ['استشارات', 'عمليات/خدمات طبية'];
  
  const visitTypes = ['زيارة العيادة', 'زيارة منزلية'];
  
  const specialties = [
    'الطب العام',
    'أمراض القلب والأوعية الدموية',
    'الأمراض العصبية',
    'جراحة العظام والمفاصل',
    'طب العيون',
    'أمراض الأنف والأذن والحنجرة',
    'الأمراض الجلدية',
    'أمراض النساء والتوليد',
    'طب الأطفال',
    'الطب النفسي',
    'أمراض الجهاز الهضمي',
    'أمراض الكلى',
    'الأمراض الصدرية',
    'جراحة التجميل',
    'طب الأسنان',
    'جراحة المسالك البولية',
    'الأورام',
    'الغدد الصماء والسكري',
    'أمراض الدم',
    'الطب الباطني',
    'جراحة الأوعية الدموية',
    'طب الطوارئ',
    'التخدير والعناية المركزة',
    'الأشعة التشخيصية',
    'المختبرات الطبية'
  ];

  const cities = [
    'عمان',
    'الزرقاء',
    'إربد',
    'الرصيفة',
    'وادي السير',
    'العقبة',
    'السلط',
    'مادبا',
    'جرش',
    'عجلون',
    'الكرك',
    'معان',
    'الطفيلة',
    'المفرق',
    'الرمثا',
    'الخليل',
    'صويلح',
    'أبو نصير',
    'الجبيهة',
    'ماركا'
  ];

  const areas = [
    'وسط البلد',
    'عبدون',
    'الدوار السابع',
    'الدوار الرابع',
    'الدوار الخامس',
    'الدوار السادس',
    'جبل عمان',
    'جبل اللويبدة',
    'الشميساني',
    'العبدلي',
    'الصويفية',
    'تلاع العلي',
    'خلدا',
    'الجندويل',
    'مرج الحمام',
    'ناعور',
    'الجبيهة',
    'صويلح',
    'أبو نصير',
    'دير غبار'
  ];

  const insuranceCompanies = [
    'الضمان الاجتماعي',
    'التأمين الصحي العسكري',
    'شركة الأردن للتأمين',
    'الشركة الأردنية الفرنسية للتأمين',
    'شركة المتحدة للتأمين',
    'شركة الدلتا للتأمين',
    'شركة العربية للتأمين',
    'شركة الأهلية للتأمين',
    'شركة فيلادلفيا للتأمين',
    'شركة الإسلامية العربية للتأمين',
    'شركة الوطنية للتأمين',
    'شركة الشرق الأوسط للتأمين',
    'شركة الأردن دبي الإسلامي للتأمين',
    'شركة الملكية الأردنية للتأمين',
    'بدون تأمين'
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleFilterSelect = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    // Here you would implement the actual search functionality
  };

  const DropdownButton = ({ 
    label, 
    value, 
    options, 
    filterType, 
    placeholder 
  }: {
    label: string;
    value: string;
    options: string[];
    filterType: string;
    placeholder: string;
  }) => (
    <div className="relative">
      <button
        onClick={() => handleDropdownToggle(filterType)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-right flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transition-transform ${openDropdown === filterType ? 'rotate-180' : ''}`} 
        />
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || placeholder}
        </span>
      </button>
      
      {openDropdown === filterType && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleFilterSelect(filterType, option)}
              className="w-full px-4 py-3 text-right hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ابحث عن الطبيب المناسب
          </h2>
          <p className="text-lg text-gray-600">
            استخدم الفلاتر أدناه للعثور على الطبيب أو الخدمة الطبية التي تحتاجها
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الخدمة</label>
              <DropdownButton
                label="نوع الخدمة"
                value={filters.serviceType}
                options={serviceTypes}
                filterType="serviceType"
                placeholder="اختر نوع الخدمة"
              />
            </div>

            {/* Visit Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الزيارة</label>
              <DropdownButton
                label="نوع الزيارة"
                value={filters.visitType}
                options={visitTypes}
                filterType="visitType"
                placeholder="اختر نوع الزيارة"
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
              <DropdownButton
                label="التخصص"
                value={filters.specialty}
                options={specialties}
                filterType="specialty"
                placeholder="اختر التخصص"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
              <DropdownButton
                label="المدينة"
                value={filters.city}
                options={cities}
                filterType="city"
                placeholder="اختر المدينة"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة</label>
              <DropdownButton
                label="المنطقة"
                value={filters.area}
                options={areas}
                filterType="area"
                placeholder="اختر المنطقة"
              />
            </div>

            {/* Insurance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التأمين</label>
              <DropdownButton
                label="التأمين"
                value={filters.insurance}
                options={insuranceCompanies}
                filterType="insurance"
                placeholder="اختر شركة التأمين"
              />
            </div>

            {/* Search Keyword */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">البحث بالكلمات المفتاحية</label>
              <input
                type="text"
                value={filters.searchKeyword}
                onChange={(e) => setFilters(prev => ({ ...prev, searchKeyword: e.target.value }))}
                placeholder="ابحث عن اسم الطبيب، العيادات، المستشفيات"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2 space-x-reverse font-medium text-lg"
            >
              <Search size={20} />
              <span>بحث</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;