"use client";

import { Search } from "lucide-react";

export function Navigation({ onNavigate }: { onNavigate: (name: string) => void }) {
  const items = ["首页", "AI发展历史", "每日AI", "最新研究", "核心术语"];
  return (
    <header className="nav-wrap">
      <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span className="brand-mark"><i /><b /></span>
        <span>AI WORLD MAP</span>
      </button>
      <nav aria-label="主要导航">
        {items.map((item, index) => (
          <button className={index === 0 ? "active" : ""} key={item} onClick={() => index === 0 ? window.scrollTo({ top: 0, behavior: "smooth" }) : item === "核心术语" ? window.location.assign("/concepts") : onNavigate(item)}>{item}</button>
        ))}
      </nav>
      <button className="search-button" aria-label="搜索知识节点"><Search size={20} strokeWidth={1.5} /></button>
    </header>
  );
}
