'use client';

import React, { useEffect, useRef, useState } from 'react';

interface DimensionalMultiverseProps {
  className?: string;
  activePathIndex?: number;
}

export const DimensionalMultiverse: React.FC<DimensionalMultiverseProps> = ({
  className = '',
  activePathIndex = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };

    window.addEventListener('resize', handleResize);

    // 3D Nodes representing divergent possible timelines
    const numPoints = 36;
    const points: { x: number; y: number; z: number; branch: number }[] = [];
    const radius = Math.min(width, height) * 0.28;

    for (let i = 0; i < numPoints; i++) {
      const theta = (i / numPoints) * Math.PI * 2;
      const phi = Math.acos(2 * (i / numPoints) - 1);
      const branch = i % 3; // 3 divergent branches
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        branch,
      });
    }

    let angleX = 0.2;
    let angleY = 0;
    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Gentle auto-rotation blended with mouse movement
      angleY += 0.003 + (mousePos.x * 0.00005);
      angleX = 0.25 + (mousePos.y * 0.0001);

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Branch color palettes: Path 0 (Violet), Path 1 (Ice Blue), Path 2 (Platinum Silver)
      const branchColors = [
        { stroke: 'rgba(124, 58, 237, 0.45)', glow: 'rgba(139, 92, 246, 0.7)', core: '#c4b5fd' },
        { stroke: 'rgba(56, 189, 248, 0.45)', glow: 'rgba(125, 211, 252, 0.7)', core: '#e0f2fe' },
        { stroke: 'rgba(226, 232, 240, 0.45)', glow: 'rgba(255, 255, 255, 0.7)', core: '#ffffff' },
      ];

      // Draw subtle orbital luxury latitude rings
      ctx.lineWidth = 1;
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        const ringRadius = radius * (0.6 + r * 0.35);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + (r === activePathIndex + 1 ? 0.06 : 0)})`;
        ctx.ellipse(centerX, centerY, ringRadius, ringRadius * 0.35, angleY * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Project 3D points
      const projected = points.map((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const fov = 650;
        const scale = fov / (fov + z2 + 300);

        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          z: z2,
          scale,
          branch: p.branch,
        };
      });

      // Sort points by depth (Z-buffer)
      projected.sort((a, b) => b.z - a.z);

      // Draw branching connecting filaments between neighbor nodes
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110 * p1.scale) {
            const isHighlight = p1.branch === activePathIndex && p2.branch === activePathIndex;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = isHighlight ? 1.5 : 0.6;
            ctx.strokeStyle = isHighlight
              ? branchColors[activePathIndex].stroke
              : 'rgba(255, 255, 255, 0.05)';
            ctx.stroke();
          }
        }
      }

      // Draw quantum nodes
      projected.forEach((p) => {
        const isSelectedBranch = p.branch === activePathIndex;
        const nodeRadius = (isSelectedBranch ? 3.2 : 1.8) * p.scale;
        const color = branchColors[p.branch];

        // Glow halo for active branch
        if (isSelectedBranch) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = color.glow;
          ctx.globalAlpha = 0.25;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Core point
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSelectedBranch ? color.core : 'rgba(226, 232, 240, 0.4)';
        ctx.fill();
      });

      // Central core singularity
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.4);
      grad.addColorStop(0, activePathIndex === 0 ? 'rgba(124, 58, 237, 0.2)' : activePathIndex === 1 ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activePathIndex, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-auto ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block filter contrast-125"
      />
    </div>
  );
};
