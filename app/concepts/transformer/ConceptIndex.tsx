"use client";

import { useEffect, useState } from "react";

const chapters = [
  ["overview", "概览"],
  ["significance", "为什么重要"],
  ["mental-model", "直觉模型"],
  ["mechanism", "工作机制"],
  ["example", "实际例子"],
  ["history", "历史坐标"],
  ["connections", "概念星座"],
] as const;

export function ConceptIndex() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const sections = chapters.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, .15, .4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="concept-index" aria-label="本文目录">
      <span className="concept-index-label">INDEX</span>
      {chapters.map(([id, label], index) => (
        <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined}>
          <i>{String(index).padStart(2, "0")}</i><span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
