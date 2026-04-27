(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
    typeof define === "function" && define.amd ? define(factory) :
    global.modal = factory();
})(this, function() {
  "use strict";
  
  /** Requires: Bootstrap v5.3.8 **/
  
  let i = 0;
  const store = Object.create(null);
  
  class Modal extends Comment {
    constructor(modalType, title, content) {
      super("modal.bs.js");
      
      let bsmodal;
      let options = Object.create(null);
      let defaults = Object.assign(Object.create(null), modal.defaults);
      
      modalType = strParse(modalType).toLowerCase();
      
      if (!["alert", "dialog", "confirm"].includes(modalType)) modalType = "alert";
      
      const el = getModal(modalType);
      const ctx = this;
      
      const BtnClose = el.querySelector('button[name="close"]');
      const BtnCancel = el.querySelector('button[name="cancel"]');
      const ModalBody = el.querySelector(".modal-body");
      const BtnConfirm = el.querySelector('button[name="confirm"]');
      const ModalTitle = el.querySelector(".modal-title");
      const ModalDialog = el.querySelector(".modal-dialog");
      const ModalHeader = el.querySelector(".modal-header");
      const ModalFooter = el.querySelector(".modal-footer");
      const ModalContent = el.querySelector(".modal-content");
      
      const btnActions = el.querySelectorAll('button[data-btn="action"]');
      const modalConfig = Object.create(null);
      const createModal = () => bsmodal = bootstrap.Modal.getOrCreateInstance(el, modalConfig);
      const qispatchEvent = (event, config) => ctx.dispatchEvent(new Event(event, config));
      
      const createModalAlert = () => {
        el.dataset.modalType = modalType;
        BtnConfirm.name = "okay";
        BtnConfirm.textContent = "OK";
        BtnConfirm.dataset.action = "okay.btn.click";
        BtnClose.remove(), BtnCancel.remove();
      };
      
      const createModalDialog = () => {
        el.dataset.modalType = modalType;
        BtnClose.dataset.action = "close.btn.click";
        ModalFooter.remove();
      };
      
      const createModalConfirm = () => {
        el.dataset.modalType = modalType;
        BtnCancel.dataset.action = "cancel.btn.click";
        BtnConfirm.dataset.action = "confirm.btn.click";
        BtnClose.remove();
      };
      
      modalConfig.focus = true;
      modalConfig.backdrop = "static";
      modalConfig.keyboard = false;
      
      ctx.on = function on(event, callback) { return ctx.addEventListener(event, callback), ctx; };
      ctx.one = function one(event, callback) { return ctx.addEventListener(event, callback, { once: true }), ctx; };
      ctx.off = function off(event, callback) { return ctx.removeEventListener(event, callback), ctx; };
      ctx.show = function show() { return bsmodal.show(), ctx; };
      ctx.hide = function hide() { return bsmodal.hide(), ctx; };
      ctx.dispose = function dispose() { bsmodal.dispose(), el.remove(), qispatchEvent("dispose.bs.modal"), ctx.remove(); };
      
      ctx.btn = function getButton() {
        let btns = Array.from(btnActions);
        const proto = Object.create(null);
        const btnNames = Array.from(arguments);
        const setBtnDisabled = state => btns.forEach(btn => state !== btn.matches(":disabled") ? btn.disabled = state : null);
        
        btnNames.forEach((btnName, idx) => btnNames[idx] = strParse(btnName).toLowerCase());
        
        arguments.length ? btns = btns.filter(btn => btnNames.includes(btn.name)) : null;
        proto.enable = function enable() { setBtnDisabled(false); };
        proto.disable = function disable() { setBtnDisabled(true); };
        
        return proto;
      };
      
      ctx.icon = function setIcon(value) {
        let $;
        const icon = Object.assign(Object.create(null), value);
        const iconame = stripHtml(strParse(icon.name)).toLowerCase().replace(/\s+/g, "");
        const breakpoint = stripHtml(strParse(icon.color)).toLowerCase().replace(/\s+/g, "");
        const breakpoints = ["dark", "info", "light", "danger", "success", "primary", "warning", "secondary"];
        
        if (iconame) {
          $ = ModalTitle.querySelector("i") || (ModalTitle.prepend(document.createElement("i")), ModalTitle.querySelector("i"));
          $.className = `bi bi-${iconame}${breakpoints.includes(breakpoint) ? ` text-${breakpoint}` : ""}`;
          $.setAttribute("aria-label", "icon: " + iconame.split("-").join(" "));
        }
        
        return ctx;
      };
      
      ctx.theme = function setTheme(value) {
        switch (strParse(value).toLowerCase()) {
          case "dark":
            el.dataset.bsTheme = value;
            Array.from(btnActions).forEach(btn => btn.name !== "close" && btn.classList.add("btn-light"));
            break;
            
          case "info":
            el.dataset.bsTheme = value;
            
            ModalHeader.classList.add("text-bg-info");
            ModalContent.classList.add("text-bg-light");
            Array.from(btnActions).forEach(btn => btn.name === "close" ? btn.dataset.bsTheme = "light" : btn.classList.add("btn-info"));
            break;
            
          case "danger":
            el.dataset.bsTheme = value;
            
            ModalHeader.classList.add("text-bg-danger");
            ModalContent.classList.add("text-bg-light");
            Array.from(btnActions).forEach(btn => btn.name !== "close" && btn.classList.add("btn-danger"));
            break;
            
          case "success":
            el.dataset.bsTheme = value;
            
            ModalHeader.classList.add("text-bg-success");
            ModalContent.classList.add("text-bg-light");
            Array.from(btnActions).forEach(btn => btn.name !== "close" && btn.classList.add("btn-success"));
            break;
            
          case "primary":
            el.dataset.bsTheme = value;
            
            ModalHeader.classList.add("text-bg-primary");
            ModalContent.classList.add("text-bg-light");
            Array.from(btnActions).forEach(btn => btn.name !== "close" && btn.classList.add("btn-primary"));
            break;
            
          case "warning":
            el.dataset.bsTheme = value;
            
            ModalHeader.classList.add("text-bg-warning");
            ModalContent.classList.add("text-bg-dark");
            Array.from(btnActions).forEach(btn => btn.name === "close" ? btn.dataset.bsTheme = "light" : btn.classList.add("btn-warning"));
            break;
            
          case "secondary":
            el.dataset.bsTheme = value;
            
            ModalHeader.classList.add("text-bg-secondary");
            ModalContent.classList.add("text-bg-light");
            Array.from(btnActions).forEach(btn => btn.name !== "close" && btn.classList.add("btn-secondary"));
            break;
            
          default: // => "light"
            el.dataset.bsTheme = "light";
            Array.from(btnActions).forEach(btn => btn.name !== "close" && btn.classList.add("btn-dark"));
        }
        
        return ctx;
      };
      
      ctx.title = function setTitle(value) {
        value = stripHtml(strParse(value));
        
        if (value) ModalTitle.querySelector("span").textContent = value;
        return ctx;
      };
      
      ctx.content = function content(value) {
        if (!arguments.length) return ModalBody;
        
        const html = strParse(value);
        
        if (html) ModalBody.innerHTML = html;
        else if (value instanceof HTMLElement) ModalBody.innerHTML = "", ModalBody.append(value);
        return ctx;
      };
      
      ctx.btnLabels = function setBtnLabels(value) {
        const btnLabels = Object.assign(Object.create(null), value);
        
        Object.keys(btnLabels).forEach(btnName => {
          const btn = Array.from(btnActions).find(btn => btn.name === strParse(btnName).toLowerCase());
          const btnLabel = stripHtml(strParse(btnLabels[btnName]));
          
          if (!btn || !btnLabel) return;
          if (btn.name !== "close") btn.textContent = btnLabel;
          else btn.setAttribute("aria-label", btnLabel);
        });
      }
      
      if (arguments.length > 2) options.title = title, options.content = content;
      else if (Object.prototype.toString.call(title) === "[object Object]") options = Object.assign(options, title);
      else options.content = title;
      
      options = Object.assign(defaults, options);
      options.icon = Object.assign(Object.create(null), options.icon);
      options.btnLabel = Object.assign(Object.create(null), options.btnLabel);
      
      if ("size" in options) {
        const size = ["modal"];
        const breakpoint = strParse(options.size).toLowerCase();
        const breakpoints = ["sm", "lg", "xl"];
        breakpoints.includes(breakpoint) && size.push(breakpoint) && ModalDialog.classList.add(size.join("-"));
      }
      
      if (options.btnClose === false) BtnClose.remove();
      if (options.centered !== false) ModalDialog.classList.add("modal-dialog-centered");
      if (options.scrollable !== false) ModalDialog.classList.add("modal-dialog-scrollable");
      
      if ("fullscreen" in options) {
        const fullscreen = ["modal-fullscreen"];
        const breakpoint = strParse(options.fullscreen).toLowerCase();
        const breakpoints = ["sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
        
        if (options.fullscreen === true) ModalDialog.classList.add(fullscreen[0]);
        else if (breakpoints.includes(breakpoint)) fullscreen.push(breakpoint), ModalDialog.classList.add(fullscreen.join("-"));
      }
      
      if (options.dismissible === true) {
        modalConfig.focus = false;
        modalConfig.backdrop = true;
        modalConfig.keyboard = true;
      }
      
      if (modalType === "alert") createModalAlert();
      else if (modalType === "dialog") createModalDialog();
      else if (modalType === "confirm") createModalConfirm();
      
      el.addEventListener("show.bs.modal", function(evt) { if (!qispatchEvent(evt.type, { cancelable: true })) evt.preventDefault(); });
      el.addEventListener("hide.bs.modal", function(evt) { if (!qispatchEvent(evt.type, { cancelable: true })) evt.preventDefault(); });
      el.addEventListener("shown.bs.modal", function(evt) { qispatchEvent(evt.type); });
      el.addEventListener("hidden.bs.modal", function(evt) { qispatchEvent(evt.type); });
      
      btnActions.forEach(btn => {
        btn.addEventListener("click", function(evt) {
          (evt.isTrusted && qispatchEvent(this.dataset.action, { cancelable: true }) && bsmodal.hide());
        })
      });
      
      ctx
        .theme(options.theme)
        .icon(options.icon)
        .title(options.title).content(options.content)
        .btnLabels(options.btnLabels)
      
      createModal();
    }
  }
  
  const getModal = function(modalType) {
    let x = ++i;
    let el = document.createElement("div");
    const html = `
    <div class="modal fade" id="${modalType}Modal${x}" tabindex="-1" aria-labelledby="${modalType}ModalLabel${x}" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header border-bottom border-dark border-opacity-10 shadow-sm">
            <h1 class="modal-title d-flex align-items-center fs-5 fw-bold gap-0 column-gap-2" id="${modalType}ModalLabel${x}">
              <span>Hello</span>
            </h1>
            
            <button type="button" name="close" class="btn-close" aria-label="Close" data-btn="action"></button>
          </div>
        
          <div class="modal-body shadow-sm">
            <!--div class="position-relative w-100 h-100"-->
              <div class="d-table w-100 py-3" style="min-height: 75%;">
                <div class="d-table-cell align-middle">
                  <div class="text-center">
                    <h5>Hello!</h5>
                    <h3>Welcome to modal.bs.js</h3>
                    <p class="m-0">view <a href="#">documentation</a></p>
                  </div>
                </div>
              </div>
            <!--/div-->
          </div>
        
          <div class="modal-footer border-top border-dark border-opacity-10">
            <div class="w-100">
              <div class="row gx-3 justify-content-end align-items-center">
                <div class="col-6 col-sm-auto">
                  <button type="button" name="cancel" class="btn text-truncate fw-bold shadow-sm w-100" data-btn="action">Cancel</button>
                </div>
                      
                <div class="col-6 col-sm-auto">
                  <button type="button" name="confirm" class="btn text-truncate fw-bold shadow-sm w-100" data-btn="action">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    
    el.innerHTML = html;
    el = el.children[0];
    
    return el;
  };
  
  const strParse = value => typeof value === "string" ? value.trim() : "";
  const stripHtml = html => {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.textContent || el.innerText || "";
  };
  
  Object.defineProperty(store, Symbol.toStringTag, { value: "Modal" });
  Object.defineProperty(store, "alert", {
    value: function ModalAlert() {
      if (this instanceof ModalAlert) Object.assign(this, new Modal("alert", ...arguments));
      else return new ModalAlert(...arguments);
    }
  });
  
  Object.defineProperty(store, "dialog", {
    value: function ModalDialog() {
      if (this instanceof ModalDialog) Object.assign(this, new Modal("dialog", ...arguments));
      else return new ModalDialog(...arguments);
    }
  });
  
  Object.defineProperty(store, "confirm", {
    value: function ModalConfirm() {
      if (this instanceof ModalConfirm) Object.assign(this, new Modal("confirm", ...arguments));
      else return new ModalConfirm(...arguments);
    }
  });
  
  return store;
});