/* ==============================================================================
   AFM — Landing Page Interactive Engine & Multi-Language System
   Author: ardith666 (https://github.com/ardith666)
   ============================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Translations Dictionary (EN Default / ID)
  const translations = {
    en: {
      announcement: "100% Native Apple Foundation Model on Apple Silicon Neural Engine. Port 2727.",
      viewChangelog: "View Changelog ➔",
      navFeatures: "Features",
      navPlayground: "Playground",
      navDashboard: "Dashboard",
      navIntegrations: "Integrations",
      navInstall: "Install",
      navAbout: "About",
      heroTitle: 'Turn Built-in macOS 27 LLMs into an <span class="highlight-cyan">OpenAI-Compatible</span> Engine.',
      heroDesc: "Stop paying cloud API bills for coding agents. AFM bridges on-device Apple Foundation Models into a blazing-fast HTTP REST & SSE server on port <strong>2727</strong>. Drop straight into Cursor, Claude Code, Cline, or Python.",
      btnDownloadDmg: "Download Latest DMG",
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
      announcement: "100% Native Apple Foundation Model di Apple Silicon Neural Engine. Port 2727.",
      viewChangelog: "Lihat Changelog ➔",
      navFeatures: "Fitur",
      navPlayground: "Playground",
      navDashboard: "Dashboard",
      navIntegrations: "Integrasi",
      navInstall: "Instalasi",
      navAbout: "Tentang",
      heroTitle: 'Ubah LLM Bawaan macOS 27 Menjadi Engine <span class="highlight-cyan">OpenAI-Compatible</span>.',
      heroDesc: "Hemat tagihan cloud API untuk coding agent Anda. AFM menjembatani Apple Foundation Model on-device menjadi server HTTP REST & SSE berkecepatan tinggi di port <strong>2727</strong>. Langsung gunakan di Cursor, Claude Code, Cline, atau Python.",
      btnDownloadDmg: "Unduh DMG Terbaru",
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
    return (str || "")
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

  // 5. Automated GitHub Releases Synchronizer
  // Automatically discovers and populates the latest release, direct DMG download links,
  // badges, and the changelog list without manual hardcoding!
  async function syncGitHubReleases() {
    const changelogList = document.getElementById("changelogList");
    const heroDownloadBtn = document.getElementById("heroDownloadBtn");
    const heroDownloadLabel = document.getElementById("heroDownloadLabel");
    const dmgDownloadLink = document.getElementById("dmgDownloadLink");
    const dmgDownloadLabel = document.getElementById("dmgDownloadLabel");
    const dmgMockupTitle = document.getElementById("dmgMockupTitle");
    const announcementBadge = document.getElementById("announcementBadge");
    const checkUpdateBtn = document.getElementById("checkUpdateBtn");

    try {
      const res = await fetch("https://api.github.com/repos/ardith666/afm/releases");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const releases = await res.json();
      if (!Array.isArray(releases) || releases.length === 0) return;

      const latest = releases[0];
      const latestTag = latest.tag_name || "Latest";
      const dmgAsset = (latest.assets || []).find(a => a.name && a.name.endsWith(".dmg"));
      const directDownloadUrl = dmgAsset
        ? dmgAsset.browser_download_url
        : `https://github.com/ardith666/afm/releases/tag/${latestTag}`;

      // Dynamically update download buttons and labels
      if (heroDownloadBtn) heroDownloadBtn.href = directDownloadUrl;
      if (dmgDownloadLink) dmgDownloadLink.href = directDownloadUrl;
      if (heroDownloadLabel) heroDownloadLabel.textContent = `Download DMG (${latestTag})`;
      if (dmgDownloadLabel) dmgDownloadLabel.textContent = `Download ${dmgAsset ? dmgAsset.name : 'Latest DMG'} ➔`;
      if (dmgMockupTitle && dmgAsset) dmgMockupTitle.textContent = dmgAsset.name;
      if (announcementBadge) announcementBadge.textContent = latestTag;

      // Render Changelog automatically from release notes
      if (changelogList) {
        changelogList.innerHTML = "";
        releases.forEach((rel, index) => {
          const item = document.createElement("div");
          item.className = "release-item";
          if (index > 0) {
            item.style.opacity = "0.78";
            item.style.marginTop = "20px";
          }

          const pubDate = rel.published_at
            ? new Date(rel.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric", day: "numeric" })
            : "Recent";
          const isLatest = index === 0;

          // Extract bullet points from markdown release body
          const rawLines = (rel.body || "").split("\n");
          const bullets = [];
          for (const line of rawLines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
              bullets.push(trimmed.replace(/^[-*•]\s+/, ""));
            }
          }

          let listContent = "";
          if (bullets.length > 0) {
            listContent = `<ul class="release-list">${bullets.slice(0, 6).map(b => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`;
          } else {
            const shortDesc = rel.name || `Release ${rel.tag_name}`;
            listContent = `<p style="font-size:0.92rem; color:var(--text-secondary); margin-top:6px;">${escapeHtml(shortDesc)}</p>`;
          }

          item.innerHTML = `
            <div class="release-meta">
              <span class="release-ver">${escapeHtml(rel.tag_name || "")}</span>
              <span class="release-date">${pubDate}</span>
              ${isLatest ? '<span class="badge badge-yellow">LATEST</span>' : ''}
            </div>
            ${listContent}
          `;
          changelogList.appendChild(item);
        });
      }

      if (checkUpdateBtn) {
        checkUpdateBtn.textContent = "Synced ✓";
        setTimeout(() => { checkUpdateBtn.textContent = "Refresh ⟳"; }, 3000);
      }
    } catch (err) {
      console.warn("Could not sync GitHub releases dynamically:", err);
      // Fallback display if offline or API rate-limited
      if (changelogList && changelogList.children.length === 0) {
        changelogList.innerHTML = `
          <div class="release-item">
            <div class="release-meta">
              <span class="release-ver">Latest Release</span>
              <span class="badge badge-yellow">LATEST</span>
            </div>
            <p style="font-size: 0.92rem; color: var(--text-secondary); margin-top: 6px;">
              View all release notes and binary assets directly on 
              <a href="https://github.com/ardith666/afm/releases/latest" target="_blank" rel="noopener" style="color:var(--text-primary); font-weight:700;">GitHub Releases ➔</a>
            </p>
          </div>
        `;
      }
      if (checkUpdateBtn) checkUpdateBtn.textContent = "Refresh ⟳";
    }
  }

  // Automatically execute on load
  syncGitHubReleases();

  const checkUpdateBtn = document.getElementById("checkUpdateBtn");
  if (checkUpdateBtn) {
    checkUpdateBtn.addEventListener("click", () => {
      checkUpdateBtn.textContent = "Syncing...";
      syncGitHubReleases();
    });
  }
});
