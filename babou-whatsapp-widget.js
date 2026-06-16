(function () {
  if (document.getElementById("bb-wa-widget")) return;

  /* ================= CONFIG ================= */
  const phone = "66819629874";
  const business = "BABOU SAMUI";
  const whatsappBase = `https://wa.me/${phone}`;

  /* ================= STYLE ================= */
  const style = document.createElement("style");
  style.textContent = `
    #bb-wa-widget{
      position:fixed;
      right:24px;
      bottom:24px;
      z-index:999999;
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    }

    #bb-wa-widget *{box-sizing:border-box;}

    /* CHAT BOX */
    .bb-box{
      width:360px;
      border-radius:26px;
      background:#fff;
      box-shadow:0 30px 60px rgba(0,0,0,.18),0 10px 25px rgba(0,0,0,.12);
      overflow:hidden;

      opacity:0;
      visibility:hidden;
      transform:translateY(20px) scale(.92);
      transition:all .35s ease;
      pointer-events:none;
    }

    .bb-box.active{
      opacity:1;
      visibility:visible;
      transform:translateY(0) scale(1);
      pointer-events:auto;
    }

    /* HEADER */
    .bb-header{
      background:linear-gradient(135deg,#075e54,#0b7b6d);
      padding:20px;
      color:#fff;
      display:flex;
      justify-content:space-between;
      align-items:center;
    }

    .bb-info{
      display:flex;
      align-items:center;
      gap:14px;
    }

    .bb-avatar{
      width:56px;
      height:56px;
      border-radius:50%;
      background:#fff;
      padding:8px;
      display:flex;
      align-items:center;
      justify-content:center;
    }

    .bb-avatar img{
      width:100%;
      height:100%;
      object-fit:contain;
    }

    .bb-name{font-size:17px;font-weight:700;}
    .bb-status{font-size:12px;opacity:.8;margin-top:4px;}

    .bb-close{
      width:38px;
      height:38px;
      border:none;
      border-radius:50%;
      background:rgba(255,255,255,.08);
      color:#fff;
      cursor:pointer;
    }

    /* BODY */
    .bb-body{
      background:#efeae2;
      padding:22px;
      min-height:200px;
    }

    .bb-message{
      background:#fff;
      padding:14px;
      border-radius:14px;
      border-top-left-radius:4px;
      width:85%;
      animation:bbFade .4s ease;
    }

    .bb-message-title{
      font-size:13px;
      font-weight:700;
      color:#075e54;
      margin-bottom:6px;
    }

    .bb-message-text{
      font-size:14px;
      line-height:1.6;
      color:#222;
    }

    /* INPUT */
    .bb-input-area{
      background:#fff;
      padding:16px;
    }

    .bb-input{
      width:100%;
      border:none;
      outline:none;
      background:#f4f4f4;
      border-radius:999px;
      padding:15px;
      font-size:14px;
    }

    /* TRIGGER */
    .bb-trigger-wrap{
      display:flex;
      justify-content:flex-end;
      margin-top:16px;
    }

    .bb-trigger{
      width:68px;
      height:68px;
      border:none;
      border-radius:50%;
      background:#25D366;
      color:#fff;
      cursor:pointer;
      box-shadow:0 15px 35px rgba(37,211,102,.35);
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
      animation:bbBounce 2.5s infinite;
      transition:.25s ease;
    }

    .bb-trigger:hover{
      transform:translateY(-4px) scale(1.05);
    }

    /* PULSE EFFECT */
    .bb-pulse{
      position:absolute;
      inset:-6px;
      border-radius:50%;
      border:2px solid rgba(37,211,102,.35);
      animation:bbPulse 2s infinite;
    }

    /* NOTIFICATION BADGE */
    .bb-badge{
      position:absolute;
      top:6px;
      right:6px;
      width:14px;
      height:14px;
      background:#ff3b30;
      border-radius:50%;
      border:2px solid #fff;
    }

    /* ANIMATIONS */
    @keyframes bbPulse{
      0%{transform:scale(1);opacity:1;}
      70%{transform:scale(1.5);opacity:0;}
      100%{opacity:0;}
    }

    @keyframes bbBounce{
      0%,100%{transform:translateY(0);}
      50%{transform:translateY(-5px);}
    }

    @keyframes bbFade{
      from{opacity:0;transform:translateY(8px);}
      to{opacity:1;transform:translateY(0);}
    }

    @media(max-width:768px){
      #bb-wa-widget{right:18px;bottom:18px;}
      .bb-box{width:calc(100vw - 36px);}
    }
  `;
  document.head.appendChild(style);

  /* ================= HTML ================= */
  const widget = document.createElement("div");
  widget.id = "bb-wa-widget";

  widget.innerHTML = `
    <div id="bbBox" class="bb-box">
      <div class="bb-header">
        <div class="bb-info">
          <div class="bb-avatar">
            <img src="/favicon.ico" alt="${business}">
          </div>
          <div>
            <div class="bb-name">${business}</div>
            <div class="bb-status">Typically replies within minutes</div>
          </div>
        </div>
        <button id="bbClose" class="bb-close">×</button>
      </div>

      <div class="bb-body">
        <div class="bb-message">
          <div class="bb-message-title">${business}</div>
          <div class="bb-message-text">
            Welcome to ${business} ✨ We're here to assist with reservations, dining experiences, and special occasions.
          </div>
        </div>
      </div>

      <div class="bb-input-area">
        <input id="bbInput" class="bb-input" placeholder="Type your message..." />
      </div>
    </div>

    <div class="bb-trigger-wrap">
      <button id="bbTrigger" class="bb-trigger">
        <span class="bb-pulse"></span>
        <span class="bb-badge"></span>
        💬
      </button>
    </div>
  `;

  document.body.appendChild(widget);

  /* ================= LOGIC ================= */
  const box = document.getElementById("bbBox");
  const trigger = document.getElementById("bbTrigger");
  const close = document.getElementById("bbClose");
  const input = document.getElementById("bbInput");

  let lock = false;

  function sendWhatsApp() {
    const message =
      input.value.trim() ||
      `Hello ${business}, I'd like to make a reservation.`;

    if (lock) return;
    lock = true;

    /* GTM EVENT */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp",
      event_category: "Contact",
      event_action: "WhatsApp Click",
      event_label: business,
      whatsapp_message: message,
    });

    window.open(
      `${whatsappBase}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setTimeout(() => {
      lock = false;
    }, 2000);
  }

  trigger.addEventListener("click", () => {
    box.classList.toggle("active");
  });

  close.addEventListener("click", () => {
    box.classList.remove("active");
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendWhatsApp();
    }
  });

  /* OPTIONAL: show badge later (feels like "new message") */
  setTimeout(() => {
    const badge = document.querySelector(".bb-badge");
    if (badge) badge.style.opacity = "1";
  }, 3000);
})();
