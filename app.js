/* Dawen landing — i18n, theme, reveals, parallax */
(function () {
  "use strict";

  var EN = {
    skip: "Skip to content",
    appName: "Dawen",
    "nav.aria": "Main navigation",
    "nav.features": "Features",
    "nav.why": "Why Dawen?",
    "nav.download": "Download",
    "nav.cta": "Get it now",
    "nav.theme": "Toggle theme",
    "nav.scroll": "Scroll down",
    "hero.eyebrow": "Desktop & Android app",
    "hero.tagline": "Your personal productivity hub",
    "hero.sub": "Your tasks, notes, expenses and habits in one place — local, private, and ad-free.",
    "hero.ctaAndroid": "Download for Android",
    "hero.ctaWindows": "For Windows",
    "hero.trust": "Free · No ads · Works offline · Your data stays on your device",
    "mock.title": "Dawen — Today",
    "mock.greeting": "Good morning 👋",
    "mock.habits": "Habits",
    "mock.streak": "12-day streak",
    "mock.sync": "Synced",
    "ticker.1": "Daily tasks",
    "ticker.2": "Habit streaks",
    "ticker.3": "Monthly budget",
    "ticker.4": "Notes & threads",
    "ticker.5": "Smart reminders",
    "ticker.6": "Cloud sync",
    "features.kicker": "Everything you need",
    "features.title": "Dawen gathers your day in one place",
    "features.sub": "Six tools that fit together without the clutter — write, do, track, and reconnect.",
    "f1.t": "Daily tasks & lists",
    "f1.d": "Organize your day with tasks, lists and recurring items, and track your progress live with the hourly Daybook page.",
    "f2.t": "Habits & streaks",
    "f2.d": "Keep your daily chain alive and watch your weekly progress in simple, clear reports.",
    "f3.t": "Expenses & budget",
    "f3.d": "Log income and spending, set your budget, and read your charts at a glance.",
    "f4.t": "Reminders & notifications",
    "f4.new": "New",
    "f4.d": "Alerts for overdue tasks, habit times and goals — plus an evening review of what you missed. Control each type separately.",
    "f4.goal": "A goal worth today",
    "f5.t": "Sync across devices",
    "f5.d": "One account takes your data with you between desktop and phone — whenever you want.",
    "f6.t": "Notes & threads",
    "f6.d": "Capture ideas and link them in connected threads, with an AI assistant inside the app.",
    "f7.t": "Ready to start?",
    "f7.d": "Dawen is completely free — get it now and start in a minute.",
    "f7.cta": "Go to download",
    "why.kicker": "The Dawen philosophy",
    "why.title": "Your data is yours — no ads, no subscriptions",
    "why.sub": "Everything stays on your device by default. Cloud sync is entirely optional, and the app keeps working offline.",
    "why.p1": "No ads, no trackers",
    "why.p2": "Fully works without internet",
    "why.p3": "Backup and restore with a single file",
    "why.p4": "Arabic & English with eye-friendly UI",
    "why.stat1n": "0",
    "why.stat1l": "Ads",
    "why.stat2n": "100%",
    "why.stat2l": "Works offline",
    "why.stat3l": "Platforms: Windows & Android",
    "dl.kicker": "Start now",
    "dl.title": "Download Dawen in a minute",
    "dl.sub": "Pick your device, grab the file, and start writing. Updates arrive inside the app.",
    "dl.androidT": "Android",
    "dl.androidD": "A direct APK file — install once and it updates itself afterwards.",
    "dl.getApk": "Get the APK",
    "dl.windowsT": "Windows",
    "dl.windowsD": "A lightweight 7 MB installer with signed auto-updates.",
    "dl.getExe": "Releases page",
    "dl.s1": "Pick your device from the cards",
    "dl.s2": "Download the file and find it in Downloads",
    "dl.s3": "Open Dawen and start — no forced sign-up",
    "footer.aria": "Footer links",
    "footer.releases": "Releases",
    "footer.copy": "© 2026 Dawen — crafted with care.",
  };

  var TITLES = {
    ar: "دَوِن — مركزك الشخصي للإنتاجية",
    en: "Dawen — Your personal productivity hub",
  };
  var DESCRIPTIONS = {
    ar: "دَوِن: مهامك وملاحظاتك ومصاريفك وعاداتك في مكان واحد. محلي، خاص، وبلا إعلانات. لسطح المكتب وأندرويد.",
    en: "Dawen: tasks, notes, expenses and habits in one place. Local, private, and ad-free. For desktop and Android.",
  };

  var LANG_KEY = "dawen-lang";
  var THEME_KEY = "dawen-theme";

  var html = document.documentElement;
  var textNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var attrNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-attr]"));

  // Snapshot Arabic originals once (they live in the markup).
  var arText = textNodes.map(function (n) { return n.textContent; });
  var arAttrs = attrNodes.map(function (n) {
    var out = {};
    n.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
      var kv = pair.split(":");
      out[kv[0].trim()] = n.getAttribute(kv[0].trim()) || "";
    });
    return out;
  });

  var langBtn = document.getElementById("langToggle");
  var themeBtn = document.getElementById("themeToggle");
  var metaDesc = document.querySelector('meta[name="description"]');

  function setLang(lang) {
    var en = lang === "en";
    html.lang = en ? "en" : "ar";
    html.dir = en ? "ltr" : "rtl";
    document.title = en ? TITLES.en : TITLES.ar;
    if (metaDesc) metaDesc.setAttribute("content", en ? DESCRIPTIONS.en : DESCRIPTIONS.ar);

    textNodes.forEach(function (n, i) {
      var key = n.getAttribute("data-i18n");
      n.textContent = en && EN[key] != null ? EN[key] : arText[i];
    });

    attrNodes.forEach(function (n, i) {
      n.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var attr = pair.split(":")[0].trim();
        var key = pair.split(":")[1].trim();
        n.setAttribute(attr, en && EN[key] != null ? EN[key] : arAttrs[i][attr]);
      });
    });

    if (langBtn) {
      langBtn.textContent = en ? "عربي" : "EN";
      langBtn.setAttribute("aria-label", en ? "التبديل إلى العربية" : "Switch to English");
    }
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
  }

  function currentTheme() {
    var explicit = html.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#17140f" : "#f6f1e7");
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* private mode */ }
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      setLang(html.lang === "en" ? "ar" : "en");
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  // Initial state
  var savedLang = null;
  var savedTheme = null;
  try {
    savedLang = localStorage.getItem(LANG_KEY);
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) { /* private mode */ }

  try {
    if (savedLang === "en") setLang("en");
    if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);
  } catch (e) { /* keep default rendering */ }

  // Scroll reveals — always run, isolated from the rest
  try {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && "IntersectionObserver" in window) {
      html.classList.add("io");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });
    }
  } catch (e) { /* content stays visible via fallback animation */ }

  // Pointer parallax on hero blobs
  try {
    if (!reduceMotion && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
      var blobs = document.querySelectorAll("[data-parallax]");
      var hero = document.querySelector(".hero");
      if (hero && blobs.length) {
        hero.addEventListener("pointermove", function (e) {
          var rect = hero.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          blobs.forEach(function (b) {
            var f = parseFloat(b.getAttribute("data-parallax")) || 0.03;
            b.style.translate = x * f + "px " + y * f + "px";
          });
        });
        hero.addEventListener("pointerleave", function () {
          blobs.forEach(function (b) { b.style.translate = "0 0"; });
        });
      }
    }
  } catch (e) { /* parallax is decorative */ }
})();
