// ======================================
// Birthday Celebration Script
// Part 1 - Initialization
// ======================================

// العناصر الأساسية
const btn = document.getElementById("startBtn");
const music = document.getElementById("music");
const confettiContainer = document.getElementById("confetti");
const body = document.body;

const title = document.querySelector(".title");
const message = document.querySelector(".message");

// حفظ الرسالة الأصلية
const originalMessage = message.innerHTML;

// مسح الرسالة لكتابتها فيما بعد
message.innerHTML = "";

// متغيرات التحكم
let started = false;
let fireworksInterval = null;
let heartsInterval = null;
let lightsInterval = null;
let confettiInterval = null;

// ==============================
// عند الضغط على زر البداية
// ==============================

btn.addEventListener("click", () => {

    if (started) return;

    started = true;

    // إخفاء الزر
    btn.style.display = "none";

    // تغيير العنوان
    title.innerHTML = "🎉 Happy Birthday 🎉";

    // تشغيل الموسيقى
    if (music) {
        music.play().catch(() => {
            console.log("Autoplay blocked.");
        });
    }

    // كتابة الرسالة
    typeWriter(originalMessage);

    // تشغيل المؤثرات
    startConfetti();
    startHearts();
    startLights();

    // تشغيل الألعاب النارية باستمرار
    fireworksInterval = setInterval(() => {
        createFirework();
    }, 1200);

});

// ==============================
// كتابة الرسالة حرفًا حرفًا
// ==============================

function typeWriter(text) {

    message.innerHTML = "";

    let i = 0;

    const timer = setInterval(() => {

        message.innerHTML += text.charAt(i);

        i++;

        if (i >= text.length) {
            clearInterval(timer);
        }

    }, 35);

}

// ==============================
// ألوان عشوائية
// ==============================

function randomColor() {

    const colors = [

        "#ff1744",
        "#ff9100",
        "#ffd600",
        "#00e676",
        "#00b0ff",
        "#d500f9",
        "#ffffff"

    ];

    return colors[Math.floor(Math.random() * colors.length)];

}
// ======================================
// Part 2 - Confetti + Hearts
// ======================================

// ==============================
// الكونفيتي
// ==============================

function startConfetti() {

    confettiInterval = setInterval(() => {

        for (let i = 0; i < 12; i++) {

            const piece = document.createElement("div");

            piece.className = "confetti";

            piece.style.left = Math.random() * window.innerWidth + "px";
            piece.style.top = "-20px";

            piece.style.background = randomColor();

            piece.style.width = (6 + Math.random() * 8) + "px";
            piece.style.height = (6 + Math.random() * 8) + "px";

            piece.style.animationDuration =
                (2 + Math.random() * 3) + "s";

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(piece);

            setTimeout(() => {
                piece.remove();
            }, 5000);

        }

    }, 250);

}

// ==============================
// القلوب المتحركة
// ==============================

function startHearts() {

    heartsInterval = setInterval(() => {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤️";

        heart.style.left =
            Math.random() * window.innerWidth + "px";

        heart.style.bottom = "-40px";

        heart.style.fontSize =
            (18 + Math.random() * 20) + "px";

        body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);

    }, 400);

}
// ======================================
// Part 3 - Fireworks
// ======================================

// ==============================
// إنشاء لعبة نارية
// ==============================

function createFirework() {

    const x = Math.random() * window.innerWidth;
    const y = 80 + Math.random() * (window.innerHeight * 0.5);

    createExplosion(x, y);

}

// ==============================
// انفجار اللعبة النارية
// ==============================

function createExplosion(x, y) {

    const particles = 30;

    for (let i = 0; i < particles; i++) {

        const particle = document.createElement("div");

        particle.className = "firework";

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.background = randomColor();

        body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particles;
        const distance = 80 + Math.random() * 70;

        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        particle.animate(
            [
                {
                    transform: "translate(0px,0px) scale(1)",
                    opacity: 1
                },
                {
                    transform: `translate(${endX}px, ${endY}px) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 1200,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(() => {
            particle.remove();
        }, 1200);

    }

}
// ======================================
// Part 4 - Floating Lights & Stars
// ======================================

// ==============================
// الإضاءات المتحركة
// ==============================

function startLights() {

    lightsInterval = setInterval(() => {

        const light = document.createElement("div");

        light.className = "light";

        light.style.left = Math.random() * window.innerWidth + "px";
        light.style.bottom = "-20px";

        light.style.animationDuration =
            (6 + Math.random() * 4) + "s";

        body.appendChild(light);

        setTimeout(() => {
            light.remove();
        }, 10000);

    }, 250);

}

// ==============================
// النجوم اللامعة
// ==============================

setInterval(() => {

    const star = document.createElement("div");

    star.innerHTML = "✨";

    star.style.position = "fixed";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    star.style.fontSize = (12 + Math.random() * 18) + "px";

    star.style.pointerEvents = "none";

    star.style.opacity = "1";

    star.style.transition = "opacity 2s";

    star.style.zIndex = "999";

    body.appendChild(star);

    setTimeout(() => {

        star.style.opacity = "0";

    }, 100);

    setTimeout(() => {

        star.remove();

    }, 2000);

}, 500);

// ==============================
// تغيير لون العنوان
// ==============================

const titleColors = [

    "#FFD700",
    "#FF4081",
    "#00E5FF",
    "#76FF03",
    "#FF9100",
    "#FFFFFF"

];

setInterval(() => {

    if (!started) return;

    title.style.color =
        titleColors[
            Math.floor(Math.random() * titleColors.length)
        ];

}, 700);
// ======================================
// Part 5 - Final Touches
// ======================================

// رسالة في Console
console.log("🎉 Happy Birthday!");

// تأثير تكبير الصور عند الضغط
const photos = document.querySelectorAll(".photos img");

photos.forEach((photo) => {

    photo.addEventListener("click", () => {

        photo.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.2)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 500
            }
        );

    });

});

// تشغيل لعبة نارية عند الضغط في أي مكان
document.addEventListener("click", (e) => {

    if (!started) return;

    createExplosion(e.clientX, e.clientY);

});

// رسالة تهنئة بعد 5 ثوانٍ من بدء الاحتفال
btn.addEventListener("click", () => {

    setTimeout(() => {

        const msg = document.createElement("div");

        msg.innerHTML = "🎂 كل سنة وأنت طيب 🎉";

        msg.style.position = "fixed";
        msg.style.top = "50%";
        msg.style.left = "50%";
        msg.style.transform = "translate(-50%, -50%)";

        msg.style.background = "rgba(0,0,0,.7)";
        msg.style.color = "#fff";
        msg.style.padding = "20px 40px";
        msg.style.borderRadius = "15px";
        msg.style.fontSize = "28px";
        msg.style.zIndex = "99999";

        body.appendChild(msg);

        setTimeout(() => {
            msg.remove();
        }, 3000);

    }, 5000);

});

// عند تغيير حجم الشاشة
window.addEventListener("resize", () => {

    console.log("Screen resized");

});

console.log("✅ Birthday Script Loaded Successfully");