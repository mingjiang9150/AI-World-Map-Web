"use client";

import { useState } from "react";
import { ArrowDown, Mouse } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { AIWorldGlobe, type KnowledgeItem } from "./components/AIWorldGlobe";
import { ExplorePortal } from "./components/ExplorePortal";
import { Timeline } from "./components/Timeline";

const portals = [
  { title: "AI发展历史", meta: "1956 — Now", icon: "history", tone: "amber", className: "portal-history" },
  { title: "每日AI", meta: "Today", icon: "daily", tone: "cyan", className: "portal-daily" },
  { title: "最新研究", meta: "Research", icon: "research", tone: "violet", className: "portal-research" },
  { title: "核心术语", meta: "Concepts", icon: "concepts", tone: "orange", className: "portal-concepts" },
] as const;

export default function Home() {
  const [selected, setSelected] = useState<KnowledgeItem | null>(null);
  const [section, setSection] = useState<string | null>(null);

  return (
    <main className="museum-shell">
      <Navigation onNavigate={setSection} />
      <section className="hero" id="home">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <aside className="intro-block reveal">
          <p className="eyebrow">THE ATLAS OF INTELLIGENCE</p>
          <h1>AI WORLD<br />MAP</h1>
          <p className="cn-title">人工智能演进地图</p>
          <span className="small-line" />
          <p className="year-range">1956 — 2026</p>
          <p className="categories">历史 · 动态 · 研究 · 术语</p>
        </aside>

        <div className="globe-stage">
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <AIWorldGlobe onSelect={setSelected} />
          {portals.map((portal) => (
            <ExplorePortal key={portal.title} {...portal} onOpen={() => portal.title === "核心术语" ? window.location.assign("/concepts") : setSection(portal.title)} />
          ))}
        </div>

        <div className="scroll-whisper" aria-hidden="true">
          <ArrowDown size={15} />
          <span>向下漫游</span>
        </div>
        <div className="drag-hint">
          <Mouse size={19} strokeWidth={1.5} />
          <span>拖动球体，探索知识节点</span>
        </div>
      </section>

      <Timeline />

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="knowledge-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭">×</button>
            <p className="modal-index">KNOWLEDGE NODE · {selected.category}</p>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            {selected.name === "Transformer" ? (
              <a className="detail-link" href="/concepts/transformer">进入节点 <span>↗</span></a>
            ) : (
              <button className="detail-link" onClick={() => setSection(selected.name)}>进入节点 <span>↗</span></button>
            )}
          </article>
        </div>
      )}

      {section && (
        <div className="sim-page" role="dialog" aria-modal="true">
          <button onClick={() => setSection(null)} aria-label="返回首页">←</button>
          <p>AI WORLD MAP / ARCHIVE</p>
          <h2>{section}</h2>
          <span>该展厅将在下一阶段开放</span>
        </div>
      )}
    </main>
  );
}
