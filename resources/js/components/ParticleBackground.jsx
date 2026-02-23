import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let particles = [];
        let animationFrameId;

        // Configuration from original HTML
        const REFERENCE_AREA = 1440 * 900;
        const BASE_PARTICLE_COUNT = 244;
        const BASE_CONNECTION_DISTANCE = 75;
        const ROTATION_SPEED = 0.001;

        const config = {
            speed: 0.5,
            size: 4.0,
            mouseRadius: 150,
        };

        let mouse = { x: null, y: null, radius: config.mouseRadius };

        function getScreenArea() {
            return window.innerWidth * window.innerHeight;
        }

        function getScaledParticleCount() {
            const ratio = getScreenArea() / REFERENCE_AREA;
            return Math.round(
                Math.max(
                    60,
                    Math.min(BASE_PARTICLE_COUNT, BASE_PARTICLE_COUNT * ratio),
                ),
            );
        }

        function getScaledConnectionDistance() {
            const ratio = Math.sqrt(getScreenArea() / REFERENCE_AREA);
            return Math.round(Math.max(40, BASE_CONNECTION_DISTANCE * ratio));
        }

        class Particle {
            constructor() {
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                this.ox = (Math.random() - 0.5) * canvas.width;
                this.oz = (Math.random() - 0.5) * canvas.width;
                this.y = Math.random() * canvas.height;
                this.x = cx + this.ox;
                this.vx = (Math.random() - 0.5) * config.speed;
                this.vy = (Math.random() - 0.5) * config.speed;
                this.size = Math.random() * config.size + 1;
                this.hue = Math.random() * 20;
            }

            update() {
                const cosR = Math.cos(ROTATION_SPEED);
                const sinR = Math.sin(ROTATION_SPEED);
                const newOx = this.ox * cosR + this.oz * sinR;
                const newOz = -this.ox * sinR + this.oz * cosR;
                this.ox = newOx;
                this.oz = newOz;

                const perspective = 600 / (600 + this.oz + 300);
                const projectedX = canvas.width / 2 + this.ox * perspective;

                if (projectedX < 0 || projectedX > canvas.width) {
                    this.ox = (Math.random() - 0.5) * canvas.width * 0.6;
                    this.oz = (Math.random() - 0.5) * canvas.width * 0.6;
                }
                this.x =
                    canvas.width / 2 + this.ox * (600 / (600 + this.oz + 300));

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.vx -= Math.cos(angle) * force * 0.05;
                        this.vy -= Math.sin(angle) * force * 0.05;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));

                const maxSpeed = config.speed * 2;
                this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));
                this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, this.vy));

                this.vx *= 0.99;
                this.vy *= 0.99;

                this.hue = (this.hue + 0.2) % 20;
            }

            draw() {
                const color = `hsl(${this.hue}, 100%, 60%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function connectParticles(particleCount, connectionDistance) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        const color1 = `hsla(${particles[i].hue}, 100%, 60%, ${opacity})`;
                        const color2 = `hsla(${particles[j].hue}, 100%, 60%, ${opacity})`;

                        const gradient = ctx.createLinearGradient(
                            particles[i].x,
                            particles[i].y,
                            particles[j].x,
                            particles[j].y,
                        );
                        gradient.addColorStop(0, color1);
                        gradient.addColorStop(1, color2);

                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function initParticles() {
            const count = getScaledParticleCount();
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const connectionDistance = getScaledConnectionDistance();

            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            connectParticles(particles.length, connectionDistance);
            animationFrameId = requestAnimationFrame(animate);
        }

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener("resize", resize);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    );
};

export default ParticleBackground;
