(function () {
  window.addEventListener("load", function () {
    if (document.getElementById("bb-wa-widget")) return;

    const phone = "66819629874";
    const business = "BABOU SAMUI";

    const whatsappBase = `https://wa.me/${phone}`;

    /* ================= STYLE ================= */
    const style = document.createElement("style");
    style.textContent = `
      #bb-wa-widget{
        position:fixed;
        right:18px;
        bottom:18px;
        z-index:999999999;
        font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }

      #bb-wa-widget *{box-sizing:border-box;}

      /* BACKDROP (mobile UX fix) */
      .bb-backdrop{
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.25);
        opacity:0;
        pointer-events:none;
        transition:.3s;
      }

      .bb-backdrop.active{
        opacity:1;
        pointer-events:auto;
      }

      /* CHAT BOX (mobile bottom sheet style) */
      .bb-box{
        width:360px;
        max-width:calc(100vw - 32px);
        border-radius:24px;
        background:#fff;
        box-shadow:0 25px 60px rgba(0,0,0,.2);

        position:fixed;
        right:18px;
        bottom:90px;

        opacity:0;
        transform:translateY(20px);
        pointer-events:none;
        transition:.3s;
      }

      .bb-box.active{
        opacity:1;
        transform:translateY(0);
        pointer-events:auto;
      }

      /* HEADER */
      .bb-header{
        background:#075e54;
        color:#fff;
        padding:16px;
        display:flex;
        justify-content:space-between;
        align-items:center;
      }

      .bb-title{font-weight:700;}
      .bb-close{
        background:none;
        border:none;
        color:#fff;
        font-size:20px;
        cursor:pointer;
      }

      /* BODY */
      .bb-body{
        padding:16px;
        background:#f5f5f5;
      }

      .bb-message{
        background:#fff;
        padding:12px;
        border-radius:12px;
        font-size:14px;
      }

      /* INPUT */
      .bb-input-area{
        padding:12px;
        background:#fff;
      }

      .bb-input{
        width:100%;
        padding:12px;
        border-radius:999px;
        border:none;
        background:#eee;
        outline:none;
      }

      /* FLOAT BUTTON */
      .bb-trigger{
        width:62px;
        height:62px;
        border-radius:50%;
        background:#25D366;
        border:none;
        color:#fff;
        cursor:pointer;
        position:relative;
        box-shadow:0 10px 30px rgba(0,0,0,.2);
      }

      .bb-pulse{
        position:absolute;
        inset:-6px;
        border-radius:50%;
        border:2px solid rgba(37,211,102,.4);
        animation:pulse 2s infinite;
      }

      .bb-badge{
        position:absolute;
        top:5px;
        right:5px;
        width:12px;
        height:12px;
        background:red;
        border-radius:50%;
        border:2px solid #fff;
      }

      @keyframes pulse{
        0%{transform:scale(1);opacity:1;}
        70%{transform:scale(1.5);opacity:0;}
        100%{opacity:0;}
      }

      /* MOBILE FIX */
      @media(max-width:768px){
        .bb-box{
          right:10px;
          left:10px;
          width:auto;
          bottom:85px;
        }
      }
    `;
    document.head.appendChild(style);

    /* ================= HTML ================= */
    const widget = document.createElement("div");
    widget.id = "bb-wa-widget";

    widget.innerHTML = `
      <div class="bb-backdrop" id="bbBackdrop"></div>

      <div class="bb-box" id="bbBox">
        <div class="bb-header">
          <div class="bb-title">${business}</div>
          <button class="bb-close" id="bbClose">×</button>
        </div>

        <div class="bb-body">
          <div class="bb-message">
            Welcome to ${business} ✨ How can we help you today?
          </div>
        </div>

        <div class="bb-input-area">
          <input id="bbInput" class="bb-input" placeholder="Type message..." />
        </div>
      </div>

      <button class="bb-trigger" id="bbTrigger">
        <span class="bb-pulse"></span>
        <span class="bb-badge"></span>
        💬
      </button>
    `;

    document.body.appendChild(widget);

    /* ================= LOGIC ================= */
    const box = document.getElementById("bbBox");
    const trigger = document.getElementById("bbTrigger");
    const close = document.getElementById("bbClose");
    const backdrop = document.getElementById("bbBackdrop");
    const input = document.getElementById("bbInput");

    let lock = false;

    function openChat() {
      box.classList.add("active");
      backdrop.classList.add("active");
    }

    function closeChat() {
      box.classList.remove("active");
      backdrop.classList.remove("active");
    }

    function send() {
      const msg =
        input.value.trim() ||
        `Hello ${business}, I'd like to make a reservation.`;

      if (lock) return;
      lock = true;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp",
        event_category: "Contact",
        event_action: "WhatsApp Click",
        event_label: business,
        whatsapp_message: msg,
      });

      window.open(`${whatsappBase}?text=${encodeURIComponent(msg)}`, "_blank");

      setTimeout(() => (lock = false), 2000);
    }

    trigger.onclick = openChat;
    close.onclick = closeChat;
    backdrop.onclick = closeChat;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        send();
      }
    });
  });
})();
