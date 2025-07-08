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

  setInterval(createFirework, 350);
  draw();

  // ======== FLIP CARD NẾU CÓ NÚT ========
  const flipBtn = document.getElementById("flip-button");
  const card = document.getElementById("flip-card");

  if (flipBtn && card) {
    flipBtn.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  }
});

const wishes = [
  "Chúc Bell & Renny luôn cười tươi 🌸",
  "Mãi hạnh phúc với con đường mình chọn nha 💕",
  "Sinh nhật thật đáng nhớ nhé 🎂",
  "Love you 💖",
  "Tuổi mới nhiều may mắn ✨",
  "Bạn thật tuyệt vời 😘"
];

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  const left = Math.random() * (window.innerWidth - 60);
  balloon.style.left = left + "px";
  balloon.style.setProperty('--color', `hsl(${Math.random() * 360}, 80%, 70%)`);

  document.body.appendChild(balloon);

  let posY = 0; // Bắt đầu translateY từ 0 (dưới cùng)
  const speed = 0.5 + Math.random() * 1.5;
  const drift = (Math.random() - 0.5) * 1.5;

  function rise() {
    posY -= speed;
    const translateX = Math.sin(posY / 20) * 10 + drift * posY / 50;
    balloon.style.transform = `translateY(${posY}px) translateX(${translateX}px)`;

    if (posY < -window.innerHeight - 100) {
      balloon.remove();
    } else {
      requestAnimationFrame(rise);
    }
  }
  rise();

  // Click hiện lời chúc
  balloon.addEventListener("click", () => {
    const wish = document.createElement("div");
    wish.className = "wish";
    wish.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    document.body.appendChild(wish);

    // Đặt vị trí lời chúc theo chính xác vị trí của balloon
    const balloonRect = balloon.getBoundingClientRect();
    wish.style.left = (balloonRect.left + balloonRect.width / 2) + "px";
    wish.style.top = (balloonRect.top + balloonRect.height / 2) + "px";

    setTimeout(() => wish.remove(), 2000);

    balloon.style.transform += " scale(0)";
    balloon.style.opacity = "0";
    setTimeout(() => balloon.remove(), 300);
  });
}

// Tạo bong bóng liên tục, giãn mật độ để chạy mượt
setInterval(createBalloon, 1000);
