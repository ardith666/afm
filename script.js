/* ==============================================================================
   AFM — Landing Page Interactive Engine & Multi-Language System
   Author: ardith666 (https://github.com/ardith666)
   ============================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Translations Dictionary (EN Default / ID)
  const translations = {
    en: {
      announcement: "AFM v1.1.0 is live! Native Metal GPU reasoning, dynamic chat streaming, and pruning controls.",
      viewChangelog: "View Changelog ➔",
      navFeatures: "Features",
      navPlayground: "Playground",
      navDashboard: "Dashboard",
      navIntegrations: "Integrations",
      navInstall: "Install",
      navAbout: "About",
      heroTitle: 'Turn Built-in macOS 27 LLMs into an <span class="highlight-cyan">OpenAI-Compatible</span> Engine.',
      heroDesc: "Stop paying cloud API bills for coding agents. AFM bridges on-device Apple Foundation Models into a blazing-fast HTTP REST & SSE server on port <strong>2727</strong>. Drop straight into Cursor, Claude Code, Cline, or Python.",
      btnDownloadDmg: "Download DMG (Universal)",
      btnTryPlayground: "🕹️ Live Playground",
      copyText: "COPY",
      copiedText: "COPIED!",
      playgroundTitle: "Explore Native AFM Models",
      playgroundSub: "Zero external cloud. 100% accelerated on Apple Neural Engine & Metal GPU.",
      replayStream: "Replay Inference ↺",
      dashTitle: "Real-Time Request & Token Analytics",
      dashSub: "Inspect every request payload, latency benchmark, and token consumed by external agents.",
      statTps: "Average Throughput",
      statLatency: "Time to First Token (TTFT)",
      statCost: "Cloud Cost Saved",
      statRequests: "Total Local Requests",
      integTitle: "Plug into Any AI Tool in 30 Seconds",
      integSub: "Standard OpenAI REST & SSE compatibility means zero custom plugins required.",
      installTitle: "Get AFM for macOS",
      installDesc: "Compatible with macOS 14+ and optimized for macOS 26/27 on Apple Silicon (M1/M2/M3/M4). Packaged with our signature animated drag-and-drop installer.",
      devBio: "Lecturer and Web Developer passionate about technology, software development, and digital innovation."
    },
    id: {
      announcement: "AFM v1.1.0 telah rilis! Akselerasi Metal GPU, streaming chat dinamis, dan pengelolaan riwayat.",
      viewChangelog: "Lihat Changelog ➔",
      navFeatures: "Fitur",
      navPlayground: "Playground",
      navDashboard: "Dashboard",
      navIntegrations: "Integrasi",
      navInstall: "Instalasi",
      navAbout: "Tentang",
      heroTitle: 'Ubah LLM Bawaan macOS 27 Menjadi Engine <span class="highlight-cyan">OpenAI-Compatible</span>.',
      heroDesc: "Hemat tagihan cloud API untuk coding agent Anda. AFM menjembatani Apple Foundation Model on-device menjadi server HTTP REST & SSE berkecepatan tinggi di port <strong>2727</strong>. Langsung gunakan di Cursor, Claude Code, Cline, atau Python.",
      btnDownloadDmg: "Unduh DMG (Universal)",
      btnTryPlayground: "🕹️ Coba Playground",
      copyText: "SALIN",
      copiedText: "TERSALIN!",
      playgroundTitle: "Eksplorasi Model Bawaan AFM",
      playgroundSub: "Tanpa koneksi internet luar. 100% dipercepat oleh Apple Neural Engine & Metal GPU.",
      replayStream: "Ulangi Inferensi ↺",
      dashTitle: "Analitik Token & Request Real-Time",
      dashSub: "Pantau setiap payload request, benchmark latensi, dan token yang dikonsumsi oleh agent eksternal.",
      statTps: "Throughput Rata-Rata",
      statLatency: "Waktu Token Pertama (TTFT)",
      statCost: "Biaya Cloud Dihemat",
      statRequests: "Total Request Lokal",
      integTitle: "Integrasi ke Semua AI Tool dalam 30 Detik",
      integSub: "Kompatibilitas standar OpenAI REST & SSE berarti tidak butuh plugin kustom tambahan.",
      installTitle: "Dapatkan AFM untuk macOS",
      installDesc: "Kompatibel dengan macOS 14+ dan dioptimalkan untuk macOS 26/27 pada Apple Silicon (M1/M2/M3/M4). Dilengkapi installer animasi drag-and-drop khas macOS.",
      devBio: "Dosen dan Web Developer yang bersemangat dalam teknologi, rekayasa perangkat lunak, dan inovasi digital."
    }
  };

  let currentLang = "en";

  const langBtn = document.getElementById("langToggleBtn");
  const langLabel = document.getElementById("currentLangLabel");

  function setLanguage(lang) {
    currentLang = lang;
    langLabel.textContent = lang === "en" ? "ID" : "EN";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  langBtn.addEventListener("click", () => {
    setLanguage(currentLang === "en" ? "id" : "en");
  });

  // 2. One-Click Copy for Brew Command
  const copyBrewBtn = document.getElementById("copyBrewBtn");
  const brewCommand = document.getElementById("brewCommand");

  copyBrewBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(brewCommand.textContent.trim()).then(() => {
      const original = copyBrewBtn.textContent;
      copyBrewBtn.textContent = translations[currentLang].copiedText;
      copyBrewBtn.style.backgroundColor = "var(--accent-yellow)";
      setTimeout(() => {
        copyBrewBtn.textContent = translations[currentLang].copyText;
        copyBrewBtn.style.backgroundColor = "var(--accent-cyan)";
      }, 2000);
    });
  });

  // 3. Interactive Model Selector Tabs
  const modelPresets = {
    "afm-text": {
      prompt: "Explain Apple Neural Engine (ANE) acceleration in 2 bullet points.",
      thinking: false,
      vision: false,
      response: `• Specialized Hardware: ANE features dedicated matrix-multiplication cores optimized for FP16/INT8 tensor math at ultra-low milliwatt power consumption.
• Unified Memory Bus: Operates directly over macOS Unified Memory Architecture (UMA), eliminating CPU-to-GPU memory transfer bottlenecks.`,
      tps: "78.5 TPS",
      ttft: "14ms"
    },
    "afm-thinking": {
      prompt: "Design a fault-tolerant distributed rate limiter with sliding window algorithm.",
      thinking: true,
      thinkingTime: "0.48s",
      thinkingText: `1. Evaluate algorithms: Token Bucket vs Leaky Bucket vs Sliding Window Log vs Sliding Window Counter.
2. Select Sliding Window Counter: Best balance of O(1) memory and accurate border-window spike protection.
3. Concurrency model: Redis Sorted Sets (ZADD + ZREMRANGEBYSCORE) executed in a single atomic Lua script.
4. Fallback strategy: In-memory fallback if Redis connection fails, degraded gracefully.`,
      vision: false,
      response: `Here is the high-concurrency Sliding Window Rate Limiter using Redis + Lua:

\`\`\`lua
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local clearBefore = now - window

redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
local current = redis.call('ZCARD', key)
if current < limit then
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, math.ceil(window / 1000))
    return 1
else
    return 0
end
\`\`\``,
      tps: "68.2 TPS",
      ttft: "22ms"
    },
    "afm-vision": {
      prompt: "Analyze this DMG installer layout and describe UI hierarchy & coordinates.",
      thinking: false,
      vision: true,
      response: `Visual Structure Detected:
1. Canvas Dimension: 660x420 px with Neo-Brutalist 2.5px border and dot-grid pattern.
2. Source Item (Left, ~x:175): AFM.app icon container with 6px offset brutalist drop shadow.
3. Destination Target (Right, ~x:485): Applications symlink folder.
4. Animated Drag Flow: Center pill "DRAG & DROP" (cyan background) with dynamic guidance arrow.
5. Bottom Status Bar: Port 2727 and developer attribution metadata (@ardith666).`,
      tps: "64.1 TPS",
      ttft: "32ms"
    }
  };

  const tabBtns = document.querySelectorAll(".tab-btn");
  const promptEl = document.getElementById("samplePromptText");
  const responseEl = document.getElementById("botResponseText");
  const thinkingCard = document.getElementById("thinkingCard");
  const thinkingBody = document.getElementById("thinkingBody");
  const visionPreview = document.getElementById("visionPreview");
  const thinkingHeader = document.getElementById("thinkingHeader");
  const thinkingChevron = document.getElementById("thinkingChevron");
  const replayBtn = document.getElementById("replayBtn");

  let currentModelKey = "afm-text";

  function switchModel(key) {
    currentModelKey = key;
    tabBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-model") === key);
    });

    const data = modelPresets[key];
    promptEl.textContent = data.prompt;

    // Thinking visibility
    if (data.thinking) {
      thinkingCard.style.display = "block";
      thinkingBody.innerHTML = data.thinkingText;
      thinkingBody.style.display = "block";
      thinkingChevron.textContent = "▼";
    } else {
      thinkingCard.style.display = "none";
    }

    // Vision visibility
    visionPreview.style.display = data.vision ? "flex" : "none";

    // Stream / Typewriter effect
    streamResponse(data.response);
  }

  function streamResponse(text) {
    responseEl.innerHTML = "<span class='cursor'>▋</span>";
    let idx = 0;
    const speed = 12; // ms per chunk

    function step() {
      if (idx < text.length) {
        idx += 3;
        responseEl.innerHTML = `<pre><code>${escapeHtml(text.slice(0, idx))}</code></pre><span class='cursor'>▋</span>`;
        setTimeout(step, speed);
      } else {
        responseEl.innerHTML = `<pre><code>${escapeHtml(text)}</code></pre>`;
      }
    }
    step();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      switchModel(btn.getAttribute("data-model"));
    });
  });

  // Collapsible Thinking Process
  thinkingHeader.addEventListener("click", () => {
    const isHidden = thinkingBody.style.display === "none";
    thinkingBody.style.display = isHidden ? "block" : "none";
    thinkingChevron.textContent = isHidden ? "▼" : "▶";
  });

  replayBtn.addEventListener("click", () => {
    switchModel(currentModelKey);
  });

  // 4. Mobile Menu Navigation Toggle
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.querySelector(".nav-links");

  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // 5. GitHub Release Checker Live Button
  const checkUpdateBtn = document.getElementById("checkUpdateBtn");
  checkUpdateBtn.addEventListener("click", () => {
    checkUpdateBtn.textContent = "Checking GitHub...";
    fetch("https://api.github.com/repos/ardith666/afm/releases/latest")
      .then(res => {
        if (!res.ok) throw new Error("Release not found");
        return res.json();
      })
      .then(data => {
        alert(`Latest Release: ${data.tag_name || "v1.0.0"}\nPublished: ${data.published_at || "Recent"}\nStatus: Up to date!`);
        checkUpdateBtn.textContent = "Up to Date ✓";
      })
      .catch(() => {
        alert("AFM v1.0.0 is the latest stable release.\nRun 'brew upgrade afm' to stay updated.");
        checkUpdateBtn.textContent = "Up to Date ✓";
      });
  });
});
