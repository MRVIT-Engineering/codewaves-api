export type Tab = {
  name: string;
  language: string;
  code: string;
};

export type LectureType = {
  title: string;
  type: 'text' | 'quizz' | 'example';
  sublectures?: [];
  tabs?: Tab[];
  quizz?: {};
};
