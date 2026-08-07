"use client";

import { ArrowUpRight, BookOpen, CalendarDays, Clock3, Microscope } from "lucide-react";

const icons = { history: Clock3, daily: CalendarDays, research: Microscope, concepts: BookOpen };

export function ExplorePortal({ title, meta, icon, tone, className, onOpen }: {
  title: string; meta: string; icon: keyof typeof icons; tone: string; className: string; onOpen: () => void;
}) {
  const Icon = icons[icon];
  return (
    <button className={`portal ${className}`} data-tone={tone} onClick={onOpen}>
      <span className="portal-icon"><Icon size={23} strokeWidth={1.4} /></span>
      <strong>{title}</strong><small>{meta}</small>
      <span className="portal-enter">进入 <ArrowUpRight size={13} /></span>
    </button>
  );
}
