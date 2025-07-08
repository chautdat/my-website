// ======== PHÁO HOA TỰ ĐỘNG TRÊN CANVAS (NÂNG CẤP) ========
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("fireworks-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework() {
    const x = random(100, canvas.width - 100);
    const y = random(50, canvas.height / 2);
    const baseHue = Math.floor(Math.random() * 360);

    // 💥 Tạo nhiều hơn và rực rỡ hơn
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 6 + 2;

      particles.push({
        x,
        y,
        radius: random(1.5, 3.5),
        color: `hsl(${baseHue + random(-20, 20)}, 100%, ${random(55, 70)}%)`,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: random(0.005, 0.015)
      });
    }
  }

  function draw() {
    // 🌟 Nền trắng với hiệu ứng mờ trail
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    requestAnimationFrame(draw);
  }

  // ⏱ Pháo nổ nhiều hơn (liên tục)
  setInterval(createFirework, 350);
  draw();
});
