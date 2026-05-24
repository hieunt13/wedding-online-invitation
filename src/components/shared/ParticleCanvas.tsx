"use client";

import { useEffect, useRef } from "react";

class Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight - canvasHeight;
    this.size = Math.random() * 8 + 6;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 1 + 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.4 + 0.2;
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y / 50);
    this.rotation += this.rotationSpeed;
    
    if (this.y > canvasHeight) {
      this.y = -20;
      this.x = Math.random() * canvasWidth;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.beginPath();
    ctx.fillStyle = `rgba(251, 249, 246, ${this.opacity})`;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(this.size, -this.size, this.size, this.size, 0, this.size);
    ctx.bezierCurveTo(-this.size, this.size, -this.size, -this.size, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Petal[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push(new Petal(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[90]"
    />
  );
}
