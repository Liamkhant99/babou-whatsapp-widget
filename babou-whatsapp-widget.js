(function () {
  if (document.getElementById("bb-wa-widget")) return;

  const phone = "66819629874";
  const business = "BABOU SAMUI";
  const favicon = "https://babousamui.com/favicon.ico";

  const style = document.createElement("style");
  style.textContent = `
    #bb-wa-widget{
      position:fixed;
      right:24px;
      bottom:24px;
      z-index:999999;
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    }

    #bb-wa-trigger{
      width:64px;
      height:64px;
      border:none;
      border-radius:50%;
      background:#25D366;
      color:#fff;
      cursor:pointer;
      box-shadow:0 15px 35px rgba(37,211,102,.35);
      display:flex;
      align-items:center;
      justify-content:center;
    }

    #bb-wa-trigger svg{
      width:30px;
      height:30px;
    }

    #bb-wa-box{
      display:none;
      width:340px;
      margin-bottom:16px;
      background:#fff;
      border-radius:24px;
      overflow:hidden;
      box-shadow:0 20px 50px rgba(0,0,0,.18);
    }

    #bb-wa-box.active{
      display:block;
    }

    .bb-header{
      background:#075e54;
      color:#fff;
      padding:18px;
      display:flex;
      align-items:center;
      gap:12px;
    }

    .bb-header img{
      width:48px;
      height:48px;
      border-radius:50%;
      background:#fff;
      padding:6px;
    }

    .bb-name{
      font-weight:700;
      font-size:16px;
    }

    .bb-status{
      font-size:12px;
      opacity:.8;
    }

    .bb-body{
      padding:20px;
      background:#efeae2;
    }

    .bb-message{
      background:#fff;
      padding:14px;
      border-radius:14px;
      font-size:14px;
      line-height:1.6;
    }

    .bb-footer{
      padding:16px;
      background:#fff;
    }

    .bb-input{
      width:100%;
      padding:14px;
      border:none;
      border-radius:999px;
      background:#f4f4f4;
      outline:none;
      box-sizing:border-box;
    }

    @media (max-width:768px){
      #bb-wa-widget{
        right:18px;
        bottom:18px;
      }

      #bb-wa-box{
        width:calc(100vw - 36px);
      }
    }
  `;

  document.head.appendChild(style);

  const widget = document.createElement("div");
  widget.id = "bb-wa-widget";

  widget.innerHTML = `
    <div id="bb-wa-box">
      <div class="bb-header">
        <img src="${favicon}" alt="${business}">
        <div>
          <div class="bb-name">${business}</div>
          <div class="bb-status">Typically replies within minutes</div>
        </div>
      </div>

      <div class="bb-body">
        <div class="bb-message">
          Welcome to ${business} ✨ We're here to assist with reservations, dining experiences, and special occasions.
        </div>
      </div>

      <div class="bb-footer">
        <input
          id="bb-wa-input"
          class="bb-input"
          type="text"
          placeholder="Type your message..."
        >
      </div>
    </div>

    <button id="bb-wa-trigger" aria-label="Open WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"></path>
      </svg>
    </button>
  `;

  document.body.appendChild(widget);

  const box = document.getElementById("bb-wa-box");
  const trigger = document.getElementById("bb-wa-trigger");
  const input = document.getElementById("bb-wa-input");

  function openWhatsApp() {
    const message =
      input.value.trim() ||
      "Hello BABOU SAMUI, I'd like to make a reservation.";

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp",
      event_category: "Contact",
      event_action: "WhatsApp Click",
      event_label: business,
      whatsapp_message: message
    });

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  trigger.addEventListener("click", function () {
    box.classList.toggle("active");
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      openWhatsApp();
    }
  });
})();
