"use client";

import { useState } from "react";

const words = ["小林", "把", "模型", "放进", "展柜", "，", "因为", "它", "太", "珍贵", "了", "。"];
const defaultWeights = [12, 5, 38, 6, 8, 2, 7, 100, 5, 20, 3, 1];

export function AttentionDemo() {
  const [active, setActive] = useState(7);
  return (
    <div className="attention-demo">
      <div className="attention-display" aria-label="交互式注意力示意">
        {words.map((word, index) => {
          const distance = Math.abs(index - active);
          const weight = active === 7 ? defaultWeights[index] : Math.max(7, 100 - distance * 17);
          return <button key={`${word}-${index}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} style={{ "--weight": `${weight / 100}` } as React.CSSProperties}>{word}</button>;
        })}
      </div>
      <div className="attention-key"><i /> 当前词 <i /> 关联强度 <span>移动鼠标，观察注意力如何改变</span></div>
    </div>
  );
}
