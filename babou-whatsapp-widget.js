#bb-wa-widget{
  position:fixed;
  right:24px;
  bottom:24px;
  z-index:999999;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  pointer-events:none;
}

#bb-wa-widget *{
  box-sizing:border-box;
}

#bb-wa-widget .bb-active,
#bb-wa-trigger,
.bb-tooltip{
  pointer-events:auto;
}

#bb-wa-box{
  width:360px;
  overflow:hidden;
  border-radius:26px;
  background:#fff;
  box-shadow:0 30px 60px rgba(0,0,0,.18),0 10px 25px rgba(0,0,0,.12);
  opacity:0;
  visibility:hidden;
  transform:translateY(20px) scale(.92);
  transition:all .35s ease;
  margin-bottom:16px;
}

#bb-wa-box.active{
  opacity:1;
  visibility:visible;
  transform:translateY(0) scale(1);
}

.bb-header{
  background:linear-gradient(135deg,#075e54,#0b7b6d);
  color:#fff;
  padding:20px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.bb-agent{
  display:flex;
  align-items:center;
  gap:14px;
}

.bb-avatar{
  width:56px;
  height:56px;
  border-radius:50%;
  overflow:hidden;
  background:#fff;
  padding:8px;
  position:relative;
}

.bb-avatar img{
  width:100%;
  height:100%;
  object-fit:contain;
}

.bb-online{
  position:absolute;
  bottom:2px;
  right:2px;
  width:12px;
  height:12px;
  border-radius:50%;
  background:#4dff88;
  border:2px solid #075e54;
}

.bb-name{
  font-size:17px;
  font-weight:700;
}

.bb-status{
  font-size:12px;
  color:rgba(255,255,255,.8);
  margin-top:4px;
}

.bb-close{
  width:38px;
  height:38px;
  border:none;
  border-radius:50%;
  background:rgba(255,255,255,.08);
  color:#fff;
  cursor:pointer;
  font-size:20px;
}

.bb-body{
  background:#efeae2;
  padding:22px;
}

.bb-message{
  background:#fff;
  padding:14px;
  border-radius:14px;
  border-top-left-radius:4px;
  font-size:14px;
  line-height:1.7;
}

.bb-security{
  margin-top:14px;
  background:#e7f3ff;
  border:1px solid #cfe5ff;
  color:#17558f;
  font-size:12px;
  padding:12px;
  border-radius:12px;
}

.bb-footer{
  padding:18px;
  background:#fff;
}

.bb-input-wrap{
  position:relative;
}

.bb-input{
  width:100%;
  border:none;
  outline:none;
  background:#f4f4f4;
  border-radius:999px;
  padding:15px 58px 15px 18px;
  font-size:14px;
}

.bb-send{
  position:absolute;
  top:50%;
  right:8px;
  transform:translateY(-50%);
  width:42px;
  height:42px;
  border:none;
  border-radius:50%;
  background:#25D366;
  color:#fff;
  cursor:pointer;
}

.bb-trigger-wrap{
  position:relative;
  display:flex;
  justify-content:flex-end;
}

.bb-tooltip{
  position:absolute;
  right:80px;
  top:50%;
  transform:translateY(-50%);
  background:#111;
  color:#fff;
  padding:10px 14px;
  border-radius:12px;
  font-size:12px;
  font-weight:600;
  white-space:nowrap;
  opacity:0;
  visibility:hidden;
  transition:.3s ease;
}

.bb-trigger-wrap:hover .bb-tooltip{
  opacity:1;
  visibility:visible;
}

#bb-wa-trigger{
  width:68px;
  height:68px;
  border:none;
  border-radius:50%;
  background:#25D366;
  color:#fff;
  cursor:pointer;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 15px 35px rgba(37,211,102,.35);
}

#bb-wa-trigger svg{
  width:32px;
  height:32px;
}

.bb-ping{
  position:absolute;
  top:-6px;
  left:-6px;
  right:-6px;
  bottom:-6px;
  border-radius:50%;
  border:2px solid rgba(37,211,102,.35);
  animation:bbPulse 2s infinite;
}

.bb-badge{
  position:absolute;
  top:3px;
  right:3px;
  width:16px;
  height:16px;
  border-radius:50%;
  background:#ff3b30;
  border:2px solid #fff;
}

@keyframes bbPulse{
  0%{transform:scale(1);opacity:1;}
  70%{transform:scale(1.5);opacity:0;}
  100%{opacity:0;}
}

@media(max-width:768px){
  #bb-wa-widget{
    right:18px;
    bottom:18px;
  }

  #bb-wa-box{
    width:calc(100vw - 36px);
  }

  .bb-tooltip{
    display:none;
  }
}
