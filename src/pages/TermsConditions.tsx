import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowRight size={24} className="text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">الأحكام والشروط</h1>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. مقدمة</h2>
              <p>
                مرحباً بكم في منصة طب جو. هذه الأحكام والشروط تحكم استخدامكم لخدماتنا. 
                باستخدام منصتنا، فإنكم توافقون على الالتزام بهذه الشروط.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. الخدمات المقدمة</h2>
              <p>
                طب جو هي منصة إلكترونية تسهل حجز المواعيد الطبية مع الأطباء المعتمدين في الأردن. 
                نحن نعمل كوسيط بين المرضى والأطباء ولا نقدم خدمات طبية مباشرة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. حجز المواعيد</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>جميع المواعيد تخضع لتوفر الطبيب</li>
                <li>يجب تأكيد الموعد قبل 24 ساعة من الموعد المحدد</li>
                <li>في حالة الإلغاء، يرجى إشعارنا قبل 4 ساعات على الأقل</li>
                <li>رسوم الاستشارة تدفع مباشرة للطبيب</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. المسؤوليات</h2>
              <p>
                المرضى مسؤولون عن تقديم معلومات دقيقة وصحيحة. الأطباء مسؤولون عن تقديم 
                الرعاية الطبية المناسبة وفقاً للمعايير المهنية المعتمدة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. الخصوصية</h2>
              <p>
                نحن ملتزمون بحماية خصوصيتكم. جميع المعلومات الطبية والشخصية تعامل بسرية تامة 
                وفقاً لقوانين حماية البيانات المعمول بها في الأردن.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. الدفع والاسترداد</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>الدفع يتم مباشرة للطبيب أو العيادة</li>
                <li>في حالة إلغاء الموعد من قبل الطبيب، سيتم إعادة جدولة الموعد مجاناً</li>
                <li>لا توجد رسوم إضافية لاستخدام المنصة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. إخلاء المسؤولية</h2>
              <p>
                طب جو غير مسؤولة عن جودة الخدمات الطبية المقدمة من قبل الأطباء. 
                نحن نسهل عملية الحجز فقط ولا نتدخل في العلاقة الطبية بين الطبيب والمريض.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. التواصل</h2>
              <p>
                للاستفسارات أو الشكاوى، يمكنكم التواصل معنا على:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>الهاتف: +962 7 9837 6025</li>
                <li>البريد الإلكتروني: info@tibjo.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. تعديل الشروط</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين 
                بأي تغييرات جوهرية عبر المنصة أو البريد الإلكتروني.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. القانون المطبق</h2>
              <p>
                هذه الشروط تخضع لقوانين المملكة الأردنية الهاشمية. أي نزاع ينشأ 
                عن استخدام المنصة يخضع لاختصاص المحاكم الأردنية.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              آخر تحديث: يناير 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;