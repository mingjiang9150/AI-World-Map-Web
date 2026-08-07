const moments = [
  ["1956", "人工智能诞生"], ["2012", "深度学习突破"], ["2017", "Transformer"], ["2022", "ChatGPT"], ["2026+", "Agent时代"],
];

export function Timeline() {
  return (
    <section className="timeline reveal" aria-label="人工智能发展时间轴">
      <div className="timeline-head"><span>CHRONOLOGY · 01</span><p>一条横跨七十年的智能演进坐标</p></div>
      <div className="timeline-track">
        {moments.map(([year, event]) => <article key={year}><i /><strong>{year}</strong><span>{event}</span></article>)}
      </div>
    </section>
  );
}
