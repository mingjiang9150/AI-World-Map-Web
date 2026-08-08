import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { concepts } from "../../../content/concepts";
import { AttentionDemo } from "./AttentionDemo";
import { ConceptIndex } from "./ConceptIndex";

const concept = concepts[0];

export default function TransformerPage() {
  return (
    <main className="concept-page">
      <header className="concept-nav">
        <a href="/" className="concept-brand"><span className="brand-mark"><i /><b /></span><span>AI WORLD MAP</span></a>
        <span>CORE CONCEPTS · 001</span>
        <a href="/" aria-label="返回地图"><ArrowLeft size={17} /> 返回地图</a>
      </header>
      <ConceptIndex />

      <article>
        <section className="concept-hero" id="overview">
          <div className="concept-coordinate">34.4° N / 118.2° W<br />ARCHITECTURE</div>
          <p className="concept-kicker">核心术语 · {concept.category}</p>
          <h1>{concept.name}</h1>
          <p className="concept-cn">{concept.chineseName}</p>
          <div className="concept-definition"><span>一句话理解</span><strong>{concept.oneLine}</strong></div>
          <p className="concept-abstract">{concept.abstract}</p>
          <div className="concept-meta"><span>{concept.era}</span><span>阅读约 {concept.readingMinutes} 分钟</span><span>CONCEPT 001</span></div>
          <div className="hero-index">
            <p>你将在这里看到</p>
            <a href="#significance"><i>01</i><span>价值</span><b>为什么它改变了 AI</b></a>
            <a href="#mental-model"><i>02</i><span>直觉</span><b>如何形成正确的理解</b></a>
            <a href="#mechanism"><i>03</i><span>机制</span><b>信息在其中如何流动</b></a>
            <a href="#example"><i>04</i><span>实践</span><b>注意力究竟看见了什么</b></a>
            <a href="#history"><i>05</i><span>坐标</span><b>它从哪里来、走向哪里</b></a>
          </div>
          <div className="transformer-orb" aria-hidden="true"><i /><i /><i /><b>Q</b><b>K</b><b>V</b></div>
        </section>

        <section className="concept-section significance" id="significance">
          <header><p>01 · SIGNIFICANCE</p><h2>为什么它重要</h2></header>
          <div className="significance-grid">{concept.significance.map((item, index) => <div key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
        </section>

        <section className="mental-model" id="mental-model">
          <div><p>{concept.mentalModel.eyebrow}</p><h2>{concept.mentalModel.title}</h2><span>{concept.mentalModel.body}</span></div>
          <div className="gallery-lights" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </section>

        <section className="concept-section mechanism" id="mechanism">
          <header><p>02 · MECHANISM</p><h2>它如何工作</h2><span>从一句话进入 Transformer，大致会经历四个动作。</span></header>
          <div className="mechanism-list">{concept.mechanism.map((item) => <div key={item.index}><b>{item.index}</b><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
        </section>

        <section className="concept-section example-section" id="example">
          <header><p>03 · IN PRACTICE</p><h2>看见注意力</h2><span>{concept.example.explanation}</span></header>
          <blockquote>“{concept.example.input}”</blockquote>
          <AttentionDemo />
        </section>

        <section className="concept-section history-section" id="history">
          <header><p>04 · CHRONOLOGY</p><h2>历史坐标</h2></header>
          <div className="concept-history">{concept.history.map((item) => <div key={item.year}><b>{item.year}</b><i /><h3>{item.event}</h3><p>{item.detail}</p></div>)}</div>
        </section>

        <section className="concept-section relation-section" id="connections">
          <header><p>05 · CONSTELLATION</p><h2>概念星座</h2><span>理解 Transformer，也是在理解它与周围概念的关系。</span></header>
          <div className="relation-map"><strong>Transformer</strong>{concept.connections.map((item) => <div key={item.name}><b>{item.name}</b><span>{item.relation}</span></div>)}</div>
        </section>

        <section className="source-section">
          <div><p>继续探索</p><h2>从概念走向原始资料</h2></div>
          {concept.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer"><span>{source.label}</span><strong>{source.detail}</strong><ArrowUpRight size={16} /></a>)}
        </section>

        <footer className="concept-footer"><span>AI WORLD MAP · CORE CONCEPTS</span><a href="/">回到知识球体 ↑</a></footer>
      </article>
    </main>
  );
}
