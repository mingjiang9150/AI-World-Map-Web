export type ConceptCluster = "foundation" | "architecture" | "generation" | "application" | "risk";

export type ConceptMapNode = {
  id: string;
  title: string;
  summary: string;
  cluster: ConceptCluster;
  tags: string[];
  related: string[];
  x: number;
  y: number;
  detailHref?: string;
};

export const conceptClusters = [
  { id: "foundation", label: "基础学习", color: "#b58a48", description: "AI 如何从数据与经验中形成能力" },
  { id: "architecture", label: "架构与模型", color: "#7368bd", description: "信息如何被表示、关联与处理" },
  { id: "generation", label: "生成与多模态", color: "#4d9e9a", description: "AI 如何理解并创造不同媒介" },
  { id: "application", label: "应用增强", color: "#cf7b45", description: "模型能力如何变成可用系统" },
  { id: "risk", label: "风险边界", color: "#b75d5d", description: "流畅输出为何不等于可靠事实" },
] as const;

export const conceptMapNodes: ConceptMapNode[] = [
  { id: "machine-learning", title: "机器学习", summary: "让机器从例子中寻找规律，而不是把每条规则都提前写好。", cluster: "foundation", tags: ["AI基础"], related: ["neural-network", "training-data", "deep-learning"], x: 205, y: 270 },
  { id: "training-data", title: "训练数据", summary: "AI 用来练习、寻找规律和形成能力的材料。", cluster: "foundation", tags: ["AI基础", "数据"], related: ["machine-learning", "large-language-model"], x: 120, y: 440 },
  { id: "neural-network", title: "神经网络", summary: "一种通过大量例子，自己学会判断规律的方法。", cluster: "foundation", tags: ["AI基础", "机器学习"], related: ["deep-learning", "transformer", "large-language-model"], x: 355, y: 410 },
  { id: "deep-learning", title: "深度学习", summary: "让多层神经网络逐步从原始信息中学出越来越复杂的特征。", cluster: "foundation", tags: ["AI基础", "神经网络"], related: ["neural-network", "transformer", "machine-learning"], x: 410, y: 195 },
  { id: "embedding", title: "信息表示", summary: "把文字、图片或声音变成机器可以比较和处理的形式。", cluster: "architecture", tags: ["AI基础", "信息"], related: ["transformer", "multimodal-ai", "attention-mechanism", "rag"], x: 580, y: 520 },
  { id: "attention-mechanism", title: "注意力机制", summary: "让机器在处理信息时，判断此刻哪些部分更值得关注。", cluster: "architecture", tags: ["AI基础", "Transformer"], related: ["transformer", "large-language-model"], x: 600, y: 205 },
  { id: "transformer", title: "Transformer", summary: "一种让一段信息里的不同部分彼此寻找联系的方法。", cluster: "architecture", tags: ["AI基础", "注意力", "大语言模型"], related: ["attention-mechanism", "large-language-model", "multimodal-ai", "embedding"], x: 720, y: 355, detailHref: "/concepts/transformer" },
  { id: "large-language-model", title: "大语言模型", summary: "一种从海量语言材料中学习规律，并能接着生成内容的 AI。", cluster: "architecture", tags: ["生成式AI", "语言"], related: ["transformer", "training-data", "prompt", "context-window", "rag", "ai-agent"], x: 870, y: 205 },
  { id: "context-window", title: "上下文窗口", summary: "AI 在一次回答中能够同时参考的信息范围。", cluster: "architecture", tags: ["大语言模型", "信息"], related: ["large-language-model", "prompt", "rag"], x: 900, y: 500 },
  { id: "generative-ai", title: "生成式 AI", summary: "能够根据学到的规律，创造文字、图像、声音或视频的 AI。", cluster: "generation", tags: ["AI基础", "内容生成"], related: ["large-language-model", "multimodal-ai", "training-data"], x: 1090, y: 180 },
  { id: "multimodal-ai", title: "多模态 AI", summary: "能够在文字、图像、声音和视频之间共同理解与表达的 AI。", cluster: "generation", tags: ["生成式AI", "图像", "语音"], related: ["transformer", "large-language-model", "embedding", "ai-agent"], x: 1205, y: 345 },
  { id: "prompt", title: "提示", summary: "人提供给 AI 的任务、背景、材料和限制条件。", cluster: "application", tags: ["人机交互", "大语言模型"], related: ["large-language-model", "context-window", "ai-agent"], x: 1040, y: 610 },
  { id: "rag", title: "检索增强生成", summary: "先从外部资料中寻找相关内容，再让 AI 依据这些内容回答。", cluster: "application", tags: ["大语言模型", "知识"], related: ["large-language-model", "context-window", "embedding", "hallucination", "ai-agent"], x: 790, y: 665 },
  { id: "ai-agent", title: "AI Agent", summary: "能够围绕目标观察情况、选择工具并连续采取行动的 AI 系统。", cluster: "application", tags: ["AI应用", "大语言模型"], related: ["large-language-model", "prompt", "rag", "multimodal-ai"], x: 1190, y: 570 },
  { id: "hallucination", title: "AI 幻觉", summary: "AI 生成了看起来合理、实际上缺少依据或并不正确的内容。", cluster: "risk", tags: ["AI风险", "大语言模型"], related: ["large-language-model", "rag", "training-data"], x: 520, y: 690 },
];

export const conceptMapEdges = Array.from(
  new Map(
    conceptMapNodes.flatMap((node) => node.related.map((target) => {
      const key = [node.id, target].sort().join("--");
      return [key, { source: node.id, target }] as const;
    })),
  ).values(),
).filter((edge) => conceptMapNodes.some((node) => node.id === edge.target));
