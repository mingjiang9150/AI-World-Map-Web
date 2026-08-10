"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Minus, Plus, RotateCcw, Search, X } from "lucide-react";
import { conceptClusters, conceptMapEdges, conceptMapNodes, type ConceptCluster } from "../../content/concept-map";

const clusterById = Object.fromEntries(conceptClusters.map((cluster) => [cluster.id, cluster]));

export function ConceptAtlas() {
  const [activeId, setActiveId] = useState("transformer");
  const [cluster, setCluster] = useState<ConceptCluster | "all">("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
  const dragRef = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const active = conceptMapNodes.find((node) => node.id === activeId) ?? conceptMapNodes[0];
  const relatedIds = new Set([active.id, ...active.related]);

  const visibleIds = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return new Set(conceptMapNodes.filter((node) => {
      const inCluster = cluster === "all" || node.cluster === cluster;
      const matches = !normalized || `${node.title} ${node.summary} ${node.tags.join(" ")}`.toLowerCase().includes(normalized);
      return inCluster && matches;
    }).map((node) => node.id));
  }, [cluster, query]);

  const zoom = (delta: number) => setView((current) => ({ ...current, scale: Math.max(.62, Math.min(1.7, current.scale + delta)) }));

  return (
    <main className="atlas-page">
      <header className="atlas-nav">
        <a href="/" className="atlas-brand"><span className="brand-mark"><i /><b /></span><span>AI WORLD MAP</span></a>
        <div><span>CORE CONCEPTS</span><b>15 个已审阅术语 · 32 条关系</b></div>
        <a href="/"><ArrowLeft size={16} /> 返回世界地图</a>
      </header>

      <section className="atlas-intro">
        <p>CONCEPT ATLAS · 05</p>
        <h1>核心术语</h1>
        <p>选择一个术语，查看它的上下游关系。</p>
      </section>

      <div className="atlas-search">
        <Search size={15} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索术语或主题" aria-label="搜索术语" />
        {query && <button onClick={() => setQuery("")} aria-label="清空搜索"><X size={13} /></button>}
      </div>

      <nav className="atlas-filters" aria-label="术语分类">
        <button className={cluster === "all" ? "active" : ""} onClick={() => setCluster("all")}><i />全部</button>
        {conceptClusters.map((item) => <button key={item.id} className={cluster === item.id ? "active" : ""} onClick={() => setCluster(item.id)} style={{ "--cluster": item.color } as React.CSSProperties}><i />{item.label}</button>)}
      </nav>

      <section className="atlas-canvas" aria-label="AI 核心术语关系图">
        <svg viewBox="0 0 1400 820" role="img" aria-label="十五个 AI 术语组成的可交互关系地图"
          onWheel={(event) => { event.preventDefault(); zoom(event.deltaY > 0 ? -.08 : .08); }}
          onPointerDown={(event) => { dragRef.current = { x: event.clientX, y: event.clientY, vx: view.x, vy: view.y }; event.currentTarget.setPointerCapture(event.pointerId); }}
          onPointerMove={(event) => { if (!dragRef.current) return; setView((current) => ({ ...current, x: dragRef.current!.vx + event.clientX - dragRef.current!.x, y: dragRef.current!.vy + event.clientY - dragRef.current!.y })); }}
          onPointerUp={() => { dragRef.current = null; }}>
          <defs>
            <filter id="nodeGlow"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <g className="atlas-world" transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
            {conceptClusters.map((item, index) => <g className="cluster-orbit" key={item.id} opacity={cluster === "all" || cluster === item.id ? 1 : .1}><ellipse cx={[275,740,1120,1000,520][index]} cy={[350,350,310,610,690][index]} rx={[250,265,190,250,105][index]} ry={[225,230,190,135,82][index]} style={{ stroke: item.color }} /><text x={[75,555,985,835,435][index]} y={[112,95,82,780,790][index]}>{item.label.toUpperCase()}</text></g>)}
            {conceptMapEdges.map((edge) => {
              const source = conceptMapNodes.find((node) => node.id === edge.source)!;
              const target = conceptMapNodes.find((node) => node.id === edge.target)!;
              const highlighted = relatedIds.has(source.id) && relatedIds.has(target.id);
              const visible = visibleIds.has(source.id) && visibleIds.has(target.id);
              return <line key={`${edge.source}-${edge.target}`} className={highlighted ? "active" : ""} x1={source.x} y1={source.y} x2={target.x} y2={target.y} opacity={visible ? (highlighted ? .85 : .22) : .035} />;
            })}
            {conceptMapNodes.map((node) => {
              const isActive = node.id === active.id;
              const isRelated = relatedIds.has(node.id);
              const visible = visibleIds.has(node.id);
              const color = clusterById[node.cluster].color;
              const labelWidth = Math.max(82, Math.min(148, node.title.length * 16 + 30));
              return <g key={node.id} className={`atlas-node ${isActive ? "active" : ""} ${isRelated ? "related" : ""}`} transform={`translate(${node.x} ${node.y})`} opacity={visible ? (isActive || isRelated ? 1 : .72) : .06} onClick={(event) => { event.stopPropagation(); setActiveId(node.id); }} tabIndex={0} role="button" aria-label={`查看${node.title}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setActiveId(node.id); }}>
                <circle className="node-aura" r={isActive ? 36 : 27} fill={color} opacity={isActive ? .13 : .06} />
                <circle className="node-core" r={isActive ? 10 : 7} fill={color} filter={isActive ? "url(#nodeGlow)" : undefined} />
                <rect className="node-label" x={-labelWidth / 2} y={20} width={labelWidth} height={34} rx="17" style={{ "--node-color": color } as React.CSSProperties} />
                <text y="42" textAnchor="middle">{node.title}</text>
                {isActive && <text className="node-index" y="-43" textAnchor="middle">SELECTED</text>}
              </g>;
            })}
          </g>
        </svg>
        <div className="atlas-controls">
          <button onClick={() => zoom(.12)} aria-label="放大"><Plus size={15} /></button>
          <button onClick={() => zoom(-.12)} aria-label="缩小"><Minus size={15} /></button>
          <button onClick={() => setView({ x: 0, y: 0, scale: 1 })} aria-label="重置视图"><RotateCcw size={14} /></button>
        </div>
        <p className="atlas-hint">拖动画布 · 滚轮缩放 · 点击节点查看关系</p>
      </section>

      <aside className="atlas-panel">
        <div className="atlas-panel-head"><span style={{ background: clusterById[active.cluster].color }} /><p>{clusterById[active.cluster].label}</p><b>{String(conceptMapNodes.indexOf(active) + 1).padStart(2, "0")}</b></div>
        <h2>{active.title}</h2>
        <p>{active.summary}</p>
        <div className="atlas-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="atlas-related"><p>RELATIONSHIPS · {active.related.filter((id) => conceptMapNodes.some((node) => node.id === id)).length}</p>{active.related.map((id) => conceptMapNodes.find((node) => node.id === id)).filter(Boolean).map((node) => <button key={node!.id} onClick={() => setActiveId(node!.id)}><i style={{ background: clusterById[node!.cluster].color }} />{node!.title}<span>→</span></button>)}</div>
        {active.detailHref ? <a className="atlas-detail" href={active.detailHref}>进入完整术语页 <ArrowUpRight size={14} /></a> : <span className="atlas-coming">完整术语页 · 整理中</span>}
      </aside>
    </main>
  );
}
