export const getArabicDate = (date: Date = new Date()) => {
  const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const arabicMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  const dayName = arabicDays[date.getDay()];
  const day = date.getDate();
  const month = arabicMonths[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayName} ${day} ${month} ${year}`;
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getGradeInArabic = (score: number) => {
  if (score < 60) return 'مقبول';
  if (score < 75) return 'جيد';
  if (score < 85) return 'جيد جداً';
  return 'ممتاز';
};

export const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'ممتاز': return 'bg-green-500';
    case 'جيد جداً': return 'bg-blue-500';
    case 'جيد': return 'bg-yellow-500';
    case 'مقبول': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};
