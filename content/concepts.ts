import type { ConceptRecord } from "./schema";

export const concepts: ConceptRecord[] = [
  {
    slug: "transformer",
    name: "Transformer",
    chineseName: "变换器架构",
    category: "基础架构",
    era: "2017 — Now",
    readingMinutes: 8,
    oneLine: "一种让信息彼此直接建立关系的神经网络架构。",
    abstract: "Transformer 改变的不是机器会不会读文字，而是它如何看待一段信息：不再逐字排队处理，而是让每个位置都能寻找与自己最相关的其他位置。今天的大语言模型、视觉生成和多模态系统，大多建立在这套思想之上。",
    globe: { description: "以注意力机制为核心的架构，重塑了现代人工智能。", position: [-1.45, .75, .7] },
    significance: [
      { title: "看得更远", body: "一句话开头和结尾的信息可以直接关联，不必经过漫长的逐步传递。" },
      { title: "学得更快", body: "大量位置可以并行计算，使模型能够利用更大的数据与算力规模。" },
      { title: "走出语言", body: "同一种结构后来扩展到图像、声音、蛋白质以及多模态信息。" },
    ],
    mentalModel: {
      eyebrow: "MENTAL MODEL · 直觉模型",
      title: "像在展厅中同时打亮彼此相关的展品",
      body: "读到“它”时，你会自然回看前文，判断“它”指向谁。Transformer 把这种回看变成可计算的权重：相关的信息被照亮，无关的信息逐渐变暗。",
    },
    mechanism: [
      { index: "01", title: "切分与定位", body: "输入被切成 token，并加入位置信息，让模型知道内容是什么、出现在哪里。" },
      { index: "02", title: "提出三个问题", body: "每个 token 形成 Query、Key 与 Value：我在找什么、我拥有什么、我要传递什么。" },
      { index: "03", title: "计算注意力", body: "Query 与所有 Key 比较，得到相关性，再按权重汇总对应的 Value。" },
      { index: "04", title: "多视角理解", body: "多个注意力头同时寻找不同关系，再经过前馈网络形成新的语义表示。" },
    ],
    example: {
      input: "小林把模型放进展柜，因为它太珍贵了。",
      focus: ["它", "模型"],
      explanation: "当处理“它”时，注意力会给“模型”更高权重，而不是距离更近的“展柜”。这不是预设语法规则，而是从大量上下文中学习到的关系。",
    },
    history: [
      { year: "2017", event: "Attention Is All You Need", detail: "原始论文提出 Transformer，用自注意力取代循环结构。" },
      { year: "2018", event: "BERT 与 GPT", detail: "预训练语言模型证明同一架构可以迁移到广泛任务。" },
      { year: "2020", event: "规模化定律", detail: "更大模型、数据和算力展现出持续可预测的能力增长。" },
      { year: "2022+", event: "生成式 AI 基础设施", detail: "Transformer 成为语言、图像与多模态模型的共同底座。" },
    ],
    connections: [
      { name: "Attention", relation: "核心计算机制" },
      { name: "Embedding", relation: "输入表示方式" },
      { name: "LLM", relation: "最重要的规模化应用" },
      { name: "Multimodal", relation: "跨媒介扩展方向" },
    ],
    sources: [
      { label: "原始论文", detail: "Vaswani et al. · 2017", href: "https://arxiv.org/abs/1706.03762" },
      { label: "推荐阅读", detail: "The Illustrated Transformer", href: "https://jalammar.github.io/illustrated-transformer/" },
    ],
  },
];

export const conceptBySlug = Object.fromEntries(concepts.map((concept) => [concept.slug, concept]));
