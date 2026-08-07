"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type KnowledgeItem = { name: string; category: string; description: string; position: [number, number, number] };

const knowledge: KnowledgeItem[] = [
  { name: "Neural Network", category: "基础", description: "由相互连接的计算单元构成，用于从数据中学习复杂模式。", position: [-1.15, .45, 1.5] },
  { name: "Deep Learning", category: "基础", description: "通过多层神经网络学习数据中逐级抽象的表示。", position: [-.8, 1.25, 1.25] },
  { name: "Transformer", category: "基础", description: "以注意力机制为核心的架构，重塑了现代人工智能。", position: [-1.45, .75, .7] },
  { name: "Attention", category: "基础", description: "让模型在处理信息时动态关注最相关的部分。", position: [-.55, -1.35, 1.25] },
  { name: "Embedding", category: "基础", description: "把概念映射为连续向量，让机器能够计算语义关系。", position: [1.15, -.85, 1.25] },
  { name: "LLM", category: "大模型", description: "在海量文本上训练、能够理解与生成语言的大型模型。", position: [-.35, -.15, 1.85] },
  { name: "GPT", category: "大模型", description: "基于 Transformer 的生成式预训练模型家族。", position: [.1, 1.45, 1.4] },
  { name: "RAG", category: "大模型", description: "结合外部知识检索与生成，提高答案的准确性和时效性。", position: [.75, -1.05, 1.45] },
  { name: "Agent", category: "未来", description: "能够感知目标、规划步骤并调用工具自主完成任务的智能体。", position: [1.35, .4, 1.25] },
  { name: "Multimodal", category: "未来", description: "统一理解文字、图像、声音与视频等多种信息形态。", position: [.85, .95, 1.5] },
  { name: "Embodied AI", category: "未来", description: "让智能进入物理世界，通过身体与环境交互学习。", position: [1.65, -.2, .8] },
];

export function AIWorldGlobe({ onSelect }: { onSelect: (item: KnowledgeItem) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [labels, setLabels] = useState<Array<{ item: KnowledgeItem; x: number; y: number; visible: boolean }>>([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, 64, 64),
      new THREE.MeshPhysicalMaterial({ color: 0xeef7f6, transparent: true, opacity: .18, roughness: .35, transmission: .25, side: THREE.DoubleSide })
    );
    globe.add(sphere);
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(2.08, 32, 32), new THREE.MeshBasicMaterial({ color: 0x6a76b8, wireframe: true, transparent: true, opacity: .065 })));

    const points: number[] = [];
    for (let i = 0; i < 520; i++) {
      const phi = Math.acos(1 - 2 * (i + .5) / 520);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.11;
      points.push(radius * Math.cos(theta) * Math.sin(phi), radius * Math.cos(phi), radius * Math.sin(theta) * Math.sin(phi));
    }
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    globe.add(new THREE.Points(pointsGeometry, new THREE.PointsMaterial({ color: 0x6574d8, size: .023, transparent: true, opacity: .55 })));

    const nodeMeshes: THREE.Mesh[] = [];
    const lines: number[] = [];
    knowledge.forEach((item, index) => {
      const position = new THREE.Vector3(...item.position).normalize().multiplyScalar(2.13);
      const node = new THREE.Mesh(new THREE.SphereGeometry(index === 6 ? .075 : .052, 16, 16), new THREE.MeshBasicMaterial({ color: index > 7 ? 0x43a9a1 : index > 4 ? 0x7a5cd6 : 0xc89246 }));
      node.position.copy(position);
      node.userData.item = item;
      globe.add(node); nodeMeshes.push(node);
      const next = new THREE.Vector3(...knowledge[(index + 3) % knowledge.length].position).normalize().multiplyScalar(2.09);
      lines.push(position.x, position.y, position.z, next.x, next.y, next.z);
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    globe.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x8794c9, transparent: true, opacity: .18 })));
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcbd8e8, 2.4));

    let dragging = false, previousX = 0, previousY = 0, raf = 0;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const resize = () => {
      const width = mount.clientWidth, height = mount.clientHeight;
      renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
    };
    const onDown = (event: PointerEvent) => { dragging = true; previousX = event.clientX; previousY = event.clientY; renderer.domElement.setPointerCapture(event.pointerId); };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      globe.rotation.y += (event.clientX - previousX) * .006; globe.rotation.x += (event.clientY - previousY) * .004;
      previousX = event.clientX; previousY = event.clientY;
    };
    const onUp = () => { dragging = false; };
    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(nodeMeshes)[0];
      if (hit) { hit.object.scale.setScalar(1.8); onSelect(hit.object.userData.item); }
    };
    renderer.domElement.addEventListener("pointerdown", onDown); renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerup", onUp); renderer.domElement.addEventListener("click", onClick);
    const observer = new ResizeObserver(resize); observer.observe(mount); resize();

    const tick = () => {
      if (!dragging) globe.rotation.y += .00125;
      renderer.render(scene, camera);
      const nextLabels = knowledge.map((item) => {
        const v = new THREE.Vector3(...item.position).normalize().multiplyScalar(2.25).applyMatrix4(globe.matrixWorld).project(camera);
        return { item, x: (v.x * .5 + .5) * mount.clientWidth, y: (-v.y * .5 + .5) * mount.clientHeight, visible: v.z < 1 && new THREE.Vector3(...item.position).normalize().applyQuaternion(globe.quaternion).z > -.2 };
      });
      setLabels(nextLabels); raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); observer.disconnect(); renderer.dispose(); mount.removeChild(renderer.domElement); };
  }, [onSelect]);

  return (
    <div className="globe-wrap" ref={mountRef} aria-label="可拖动的 AI 知识球体">
      <div className="globe-glow" />
      <div className="globe-labels">
        {labels.map(({ item, x, y, visible }) => <button key={item.name} style={{ transform: `translate(${x}px, ${y}px)`, opacity: visible ? 1 : 0 }} onClick={() => onSelect(item)}>{item.name}</button>)}
      </div>
    </div>
  );
}
