(function () {
  var C = window.DRINKUP || {};
  var TEXT = window.DRINKUP_TEXT || {};
  var ev = C.nextEvent || {};
  var $ = function (id) { return document.getElementById(id); };
  var lang = "en", T = TEXT.en;

  // ---- String lights ----
  var bulbs = $("bulbs");
  if (bulbs) {
    var n = Math.max(10, Math.round(window.innerWidth / 70));
    for (var i = 0; i <= n; i++) {
      var x = i / n;
      // follows the SVG wire: Q 25 12 50 3, then T 100 0 (control 75 -6); 56px tall for viewBox height 10
      var y = x <= 0.5 ? quad(0, 12, 3, x * 2) : quad(3, -6, 0, (x - 0.5) * 2);
      var b = document.createElement("span");
      b.className = "bulb";
      b.style.left = (x * 100) + "%";
      b.style.top = (y * 5.6 + 2) + "px";
      b.style.animationDelay = (-(i * 1.37) % 3.2) + "s";
      bulbs.appendChild(b);
    }
  }
  function quad(p0, p1, p2, t) { return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2; }

  // ---- Event basics ----
  var start = ev.start ? new Date(ev.start) : null;
  if (start && isNaN(start)) start = null;
  var end = ev.end ? new Date(ev.end) : (start ? new Date(start.getTime() + 4 * 3600e3) : null);
  // "Tonight" only from 06:00 on the event day, in the event's own timezone
  var tonightFrom = start ? new Date(ev.start.slice(0, 11) + "06:00:00" + ev.start.slice(19)) : null;

  var cal = $("ev-cal");
  if (start) {
    var z = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
    cal.href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent("Gamedev Drinkup TLV") +
      "&dates=" + z(start) + "/" + z(end) +
      "&location=" + encodeURIComponent([ev.venue, ev.address].filter(Boolean).join(", ")) +
      "&details=" + encodeURIComponent("https://www.gamedevdrinkuptlv.com");
  } else cal.hidden = true;
  if (ev.mapUrl) $("ev-where").href = ev.mapUrl; else $("ev-where").removeAttribute("href");
  var wa = (C.community || {}).whatsapp;
  if (wa) $("ev-wa").href = wa; else $("ev-wa").hidden = true;
  var dc = (C.community || {}).discord;
  if (dc) $("ev-dc").href = dc; else $("ev-dc").hidden = true;

  var icons = {
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3Z"/></svg>',
    discord: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 5.3A16.6 16.6 0 0 0 15.5 4l-.5 1a15.4 15.4 0 0 0-6 0l-.5-1a16.5 16.5 0 0 0-4.1 1.3C1.8 9.2 1.1 13 1.4 16.7a16.7 16.7 0 0 0 5 2.6l1.1-1.7-1.8-.9.4-.3a11.9 11.9 0 0 0 11.8 0l.4.3-1.8.9 1.1 1.7a16.6 16.6 0 0 0 5-2.6c.4-4.3-.7-8-3-11.4ZM8.5 14.4c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4a22 22 0 0 0-2.5-.1c-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z"/></svg>',
    luma: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm-2 7h14v11H5V9Zm2 2v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Zm-8 4v2h2v-2H7Zm4 0v2h2v-2h-2Z"/></svg>',
    meetup: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 13c-3 0-6 1.5-6 3.5V19h12v-2.5C14 14.5 11 13 8 13Zm8 0c-.5 0-1 0-1.5.1 1 .8 1.5 2 1.5 3.4V19h6v-2.5c0-2-3-3.5-6-3.5Z"/></svg>'
  };
  var linkColors = { whatsapp: "var(--green)", discord: "var(--blue)", facebook: "var(--cyan)", luma: "var(--orange)", meetup: "var(--pink)" };

  // ---- Render all language-dependent parts ----
  function render() {
    var he = lang === "he";
    document.documentElement.lang = lang;
    document.documentElement.dir = he ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = T[el.getAttribute("data-i18n")];
      if (typeof v === "string") el.innerHTML = v;
    });
    var sw = $("lang");
    sw.textContent = T.switchTo;
    sw.lang = he ? "en" : "he";
    $("cover").alt = T.coverAlt;

    // date + place
    if (start) {
      var loc = he ? "he-IL" : "en-GB";
      var fd = new Intl.DateTimeFormat(loc, { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Jerusalem" });
      var ft = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jerusalem" });
      $("ev-when").textContent = fd.format(start) + " · " + ft.format(start);
    } else $("ev-when").textContent = T.dateSoon;
    $("ev-where").textContent = (he && ev.venueHe) || ev.venue || "";
    var addr = (he && ev.addressHe) || ev.address;
    $("ev-addr").textContent = addr ? "· " + addr : "";

    // RSVP buttons
    var rsvpBox = $("rsvp"), rsvp = ev.rsvp || {}, first = true;
    rsvpBox.innerHTML = "";
    [["facebook", T.rsvpFacebook], ["luma", T.rsvpLuma], ["meetup", T.rsvpMeetup]].forEach(function (r) {
      var a = document.createElement(rsvp[r[0]] ? "a" : "span");
      a.textContent = r[1];
      if (!rsvp[r[0]]) {
        // no link yet: show a disabled button so all three RSVP options stay visible
        a.className = "btn off"; a.title = T.rsvpSoon;
        rsvpBox.appendChild(a);
        return;
      }
      a.className = "btn" + (first ? " primary" : "");
      a.href = rsvp[r[0]]; a.target = "_blank"; a.rel = "noopener";
      rsvpBox.appendChild(a);
      first = false;
    });

    // roles
    var roles = $("roles");
    roles.innerHTML = "";
    (T.roles || []).forEach(function (r) { var li = document.createElement("li"); li.textContent = r; roles.appendChild(li); });

    // community links
    var list = $("links"), comm = C.community || {};
    list.innerHTML = "";
    ["whatsapp", "discord", "facebook", "luma", "meetup"].forEach(function (k) {
      if (!(k in comm)) return;
      var url = comm[k], txt = T.links[k];
      var li = document.createElement("li");
      if (k === "whatsapp" || k === "discord") li.className = "featured feat-" + k;
      var el = document.createElement(url ? "a" : "div");
      el.className = "link" + (url ? "" : " soon");
      if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener"; }
      el.innerHTML = '<span class="ic" style="background:' + linkColors[k] + '">' + icons[k] + '</span>' +
        '<span class="link-txt"><span class="link-name"></span><span class="link-desc"></span></span>' +
        '<span class="go" aria-hidden="true"></span>';
      el.querySelector(".link-name").textContent = txt[0];
      el.querySelector(".link-desc").textContent = txt[1];
      el.querySelector(".go").textContent = url ? (he ? "←" : "→") : T.soon;
      li.appendChild(el);
      list.appendChild(li);
    });

    tick();
  }

  // ---- Countdown ----
  var status = $("ev-status");
  var pad = function (v) { return String(v).padStart(2, "0"); };
  function set(d, h, m, s) { $("t-d").textContent = d; $("t-h").textContent = h; $("t-m").textContent = m; $("t-s").textContent = s; }
  function tick() {
    status.classList.remove("live");
    if (!start) { status.textContent = T.stSoon; return; }
    var now = Date.now(), diff = start - now;
    if (diff <= 0) {
      set("00", "00", "00", "00");
      if (now < end) { status.textContent = T.stLive; status.classList.add("live"); }
      else status.textContent = T.stNext;
      return;
    }
    var s = Math.floor(diff / 1000);
    set(pad(Math.floor(s / 86400)), pad(Math.floor(s / 3600) % 24), pad(Math.floor(s / 60) % 60), pad(s % 60));
    if (now >= tonightFrom) { status.textContent = T.stTonight; status.classList.add("live"); }
    else status.textContent = "";
  }

  // ---- Language choice: ?lang=he / #he, then saved choice, then browser language ----
  function pick() {
    var q = (location.search.match(/[?&]lang=(he|en)/) || [])[1];
    if (q) return q;
    if (location.hash === "#he" || location.hash === "#en") return location.hash.slice(1);
    try { var s = localStorage.getItem("drinkup-lang"); if (s === "he" || s === "en") return s; } catch (e) {}
    return /^he|^iw/i.test(navigator.language || "") ? "he" : "en";
  }
  function setLang(l) { lang = TEXT[l] ? l : "en"; T = TEXT[lang]; render(); }
  $("lang").addEventListener("click", function () {
    var next = lang === "he" ? "en" : "he";
    try { localStorage.setItem("drinkup-lang", next); } catch (e) {}
    setLang(next);
  });

  setLang(pick());
  setInterval(tick, 1000);

  // ---- Photos: drop slots whose image file isn't uploaded; the grid adapts to how many are left ----
  var gallery = $("gallery");
  function layout() {
    var n = gallery.querySelectorAll(".ph").length;
    gallery.setAttribute("data-count", n);
    $("photos").hidden = n === 0;
  }
  gallery.querySelectorAll(".ph img").forEach(function (img) {
    var fig = img.closest(".ph");
    var miss = function () { fig.remove(); layout(); };
    var ok = function () { fig.classList.add("ok"); };
    if (img.complete) { if (img.naturalWidth === 0) miss(); else ok(); }
    img.addEventListener("error", miss);
    img.addEventListener("load", ok);
  });
  layout();
})();
