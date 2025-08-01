import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getArabicDate, getCurrentYear, getGradeInArabic, getGradeColor } from "@/lib/arabic-dates";
import { TopBannerAd, SidebarAd, BottomBannerAd } from "@/components/AdSense";
import type { ExamResult } from "@shared/schema";

// API function
const submitExamQuery = async (fullName: string, seatNumber: string): Promise<ExamResult> => {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, seatNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'فشل في جلب النتيجة');
  }

  return response.json();
};

const examQuerySchema = z.object({
  fullName: z.string().min(1, "الاسم الرباعي مطلوب"),
  seatNumber: z.string().min(1, "رقم الجلوس مطلوب").regex(/^\d+$/, "رقم الجلوس يجب أن يحتوي على أرقام فقط"),
});

type ExamQueryForm = z.infer<typeof examQuerySchema>;

export default function Home() {
  const [result, setResult] = useState<ExamResult | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ExamQueryForm>({
    resolver: zodResolver(examQuerySchema),
    defaultValues: {
      fullName: "",
      seatNumber: "",
    },
  });

  const examMutation = useMutation({
    mutationFn: ({ fullName, seatNumber }: ExamQueryForm) => 
      submitExamQuery(fullName, seatNumber),
    onSuccess: (data: ExamResult) => {
      setResult(data);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('resultsSection')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ExamQueryForm) => {
    examMutation.mutate(data);
  };

  const currentYear = getCurrentYear();
  const currentDate = getArabicDate();
  
  const grade = result ? getGradeInArabic(parseFloat(result.score)) : '';
  const gradeColor = getGradeColor(grade);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Ad Space - Top Banner */}
      <div className="w-full bg-gray-100 border-b border-gray-200 p-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-2">مساحة إعلانية</p>
          <TopBannerAd />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-egyptian-blue rounded-full flex items-center justify-center ml-4">
                <span className="text-white text-2xl font-bold">🎓</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-egyptian-blue mb-2">
                  نتيجة الثانوية العامة بمصر لعام {currentYear}
                </h1>
                <p className="text-gray-600">وزارة التربية والتعليم</p>
              </div>
            </div>
            <p className="text-lg text-egyptian-green font-medium">
              نتيجة الثانوية العامة الجديدة بتاريخ: {currentDate}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  🔍 استعلام عن النتيجة
                </h2>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name Input */}
                  <div>
                    <Label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-2">
                      الاسم الرباعي <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="اكتب الاسم الرباعي كاملاً"
                      className="w-full px-4 py-3 text-lg"
                      {...form.register("fullName")}
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullName.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">مثال: أحمد محمد علي حسن</p>
                  </div>

                  {/* Seat Number Input */}
                  <div>
                    <Label htmlFor="seatNumber" className="block text-lg font-medium text-gray-700 mb-2">
                      رقم الجلوس <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="seatNumber"
                      placeholder="مثال: 123456"
                      className="w-full px-4 py-3 text-lg"
                      dir="ltr"
                      {...form.register("seatNumber")}
                    />
                    {form.formState.errors.seatNumber && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.seatNumber.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">أدخل رقم الجلوس المكون من أرقام فقط</p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-egyptian-blue hover:bg-blue-700 py-4 text-lg"
                    disabled={examMutation.isPending}
                  >
                    {examMutation.isPending ? (
                      <>
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        جاري البحث...
                      </>
                    ) : (
                      "🔎 استعلام عن النتيجة"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad Space - Sidebar */}
            <Card className="shadow-md">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-2 text-center">مساحة إعلانية</p>
                <SidebarAd />
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-blue-50 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-egyptian-blue mb-4">📋 تعليمات الاستعلام</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-egyptian-green ml-2">•</span>
                    اكتب الاسم الرباعي كاملاً كما هو مسجل
                  </li>
                  <li className="flex items-start">
                    <span className="text-egyptian-green ml-2">•</span>
                    أدخل رقم الجلوس بدقة
                  </li>
                  <li className="flex items-start">
                    <span className="text-egyptian-green ml-2">•</span>
                    تأكد من صحة البيانات قبل الاستعلام
                  </li>
                  <li className="flex items-start">
                    <span className="text-egyptian-green ml-2">•</span>
                    النتيجة متاحة على مدار الساعة
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Grade Scale */}
            <Card className="bg-green-50 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-egyptian-green mb-4">📊 مقياس التقديرات</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">ممتاز</span>
                    <span className="text-green-600">85% - 95%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">جيد جداً</span>
                    <span className="text-blue-600">75% - 85%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">جيد</span>
                    <span className="text-yellow-600">60% - 75%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">مقبول</span>
                    <span className="text-orange-600">50% - 60%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div id="resultsSection" className="mt-8">
            <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-egyptian-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl">🎉</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">نتيجة الطالب</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                      <div>
                        <p className="text-gray-600 mb-1">الاسم:</p>
                        <p className="font-semibold text-lg">{result.fullName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">رقم الجلوس:</p>
                        <p className="font-semibold text-lg">{result.seatNumber}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <p className="text-xl text-gray-700 mb-2">درجتك هي:</p>
                    <p className="text-5xl font-bold text-egyptian-blue mb-4">{result.score}%</p>
                    <div className={`inline-block px-6 py-3 text-white rounded-lg text-xl font-semibold ${gradeColor}`}>
                      {grade}
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <p className="text-gray-600 text-sm">
                      تاريخ الاستعلام: {getArabicDate(new Date(result.createdAt))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Ad Space - Bottom Banner */}
      <div className="w-full bg-gray-100 border-t border-gray-200 p-4 text-center mt-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-2">مساحة إعلانية</p>
          <BottomBannerAd />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-egyptian-blue text-white text-center py-6 mt-8">
        <p className="mb-2">© {currentYear} وزارة التربية والتعليم - جمهورية مصر العربية</p>
        <p className="text-sm opacity-75">جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
