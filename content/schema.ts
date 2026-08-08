export type ConceptCategory = "基础架构" | "训练方法" | "模型能力" | "应用范式" | "未来方向";

export type ConceptRecord = {
  slug: string;
  name: string;
  chineseName: string;
  category: ConceptCategory;
  era: string;
  readingMinutes: number;
  oneLine: string;
  abstract: string;
  globe: { description: string; position: [number, number, number] };
  significance: { title: string; body: string }[];
  mentalModel: { eyebrow: string; title: string; body: string };
  mechanism: { index: string; title: string; body: string }[];
  example: { input: string; focus: string[]; explanation: string };
  history: { year: string; event: string; detail: string }[];
  connections: { name: string; relation: string }[];
  sources: { label: string; detail: string; href: string }[];
};
