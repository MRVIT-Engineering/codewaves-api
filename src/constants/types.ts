export type Tab = {
  name: string;
  language: string;
  code: string;
};

export type Lecture = {
  title: string;
  type: 'text' | 'quizz' | 'example';
  sublectures?: [];
  tabs?: Tab[];
};
