'use client';

import React, { useEffect, useRef } from 'react';

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let running = true;

        // ✅ Adjust star count based on device
        const getStarCount = () => {
            const area = window.innerWidth * window.innerHeight;
            return Math.min(600, Math.floor(area / 2000)); // dynamic density
        };

        let STAR_COUNT = getStarCount();

        // Typed arrays (much faster)
        let x = new Float32Array(STAR_COUNT);
        let y = new Float32Array(STAR_COUNT);
        let radius = new Float32Array(STAR_COUNT);
        let alpha = new Float32Array(STAR_COUNT);
        let fadeSpeed = new Float32Array(STAR_COUNT);
        let fadeDir = new Float32Array(STAR_COUNT);
        let speedX = new Float32Array(STAR_COUNT);
        let speedY = new Float32Array(STAR_COUNT);

        const initStars = () => {
            for (let i = 0; i < STAR_COUNT; i++) {
                x[i] = Math.random() * canvas.width;
                y[i] = Math.random() * canvas.height;
                radius[i] = Math.random() * 1.2;
                alpha[i] = Math.random();
                fadeSpeed[i] = Math.random() * 0.02 + 0.005;
                fadeDir[i] = Math.random() > 0.5 ? 1 : -1;
                speedX[i] = (Math.random() - 0.5) * 0.05;
                speedY[i] = (Math.random() - 0.5) * 0.05;
            }
        };

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;

            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            STAR_COUNT = getStarCount();
            initStars();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // ✅ FPS limiter (30 FPS)
        let lastTime = 0;
        const FPS = 30;
        const interval = 1000 / FPS;

        const render = (time: number) => {
            if (!running) return;

            if (time - lastTime < interval) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }
            lastTime = time;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < STAR_COUNT; i++) {
                // Twinkle
                alpha[i] += fadeSpeed[i] * fadeDir[i];
                if (alpha[i] <= 0) {
                    alpha[i] = 0;
                    fadeDir[i] = 1;
                } else if (alpha[i] >= 1) {
                    alpha[i] = 1;
                    fadeDir[i] = -1;
                }

                // Movement
                x[i] += speedX[i];
                y[i] += speedY[i];

                if (x[i] < 0) x[i] = canvas.width;
                if (x[i] > canvas.width) x[i] = 0;
                if (y[i] < 0) y[i] = canvas.height;
                if (y[i] > canvas.height) y[i] = 0;

                // Draw
                ctx.globalAlpha = alpha[i];
                ctx.beginPath();
                ctx.arc(x[i], y[i], radius[i], 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }

            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(render);
        };

        render(0);

        // ✅ Pause when tab inactive (huge performance win)
        const handleVisibility = () => {
            running = !document.hidden;
            if (running) render(performance.now());
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            running = false;
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
        />
    );
}
