/* RONGHE demo archive — language switch, scroll reveal, single-player audio. */
(function () {
  "use strict";

  var root = document.documentElement;
  var TITLES = {
    en: "RONGHE 融合堂 — VR Demo Recordings",
    zh: "RONGHE 融合堂 — VR 演示录屏"
  };

  /* ── language ─────────────────────────────────────────── */

  function applyLang(lang) {
    var isZh = lang === "zh";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", isZh ? "zh-CN" : "en");

    var nodes = document.querySelectorAll("[data-en][data-zh]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var text = el.getAttribute(isZh ? "data-zh" : "data-en");
      if (text !== null) el.textContent = text;
    }

    document.title = isZh ? TITLES.zh : TITLES.en;

    var btn = document.getElementById("langswitch");
    if (btn) btn.setAttribute("aria-label", isZh ? "Switch to English" : "切换到中文");

    try { localStorage.setItem("ronghe.lang", lang); } catch (e) {}
  }

  function detectLang() {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    try {
      var saved = localStorage.getItem("ronghe.lang");
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) {}
    // default to English for review; Chinese browsers get Chinese
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  var current = detectLang();
  applyLang(current);

  var btn = document.getElementById("langswitch");
  if (btn) {
    btn.addEventListener("click", function () {
      current = current === "en" ? "zh" : "en";
      applyLang(current);
    });
  }

  /* ── only one video plays at a time ───────────────────── */

  var videos = Array.prototype.slice.call(document.querySelectorAll("video"));
  videos.forEach(function (v) {
    v.addEventListener("play", function () {
      videos.forEach(function (other) {
        if (other !== v && !other.paused) other.pause();
      });
    });
  });

  /* ── scroll reveal ────────────────────────────────────── */

  var items = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduce) {
    for (var j = 0; j < items.length; j++) items[j].classList.add("is-in");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.06 });

    for (var k = 0; k < items.length; k++) io.observe(items[k]);
  }
})();
