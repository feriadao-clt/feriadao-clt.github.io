(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
    typeof define === "function" && define.amd ? define(factory) :
    global.modal = factory();
})(this, function() {
  "use strict";
  
  /** Requires: Bootstrap v5.3.8 **/
  
  let i = 0;
  const store = Object.create(null);
  const Modal = function Modal(modalType, title, body) {
    const el = getModal(modalType);
    const fn = Object.create(null);
    const self = this;
    const dummy = document.createElement("div");
    const modal = bootstrap.Modal.getOrCreateInstance(el);
    const ModalBody = el.querySelector(".modal-body");
    const BtnCancel = el.querySelector('button[name="cancel"]');
    const BtnConfirm = el.querySelector('button[name="confirm"]');
    const BtnDismiss = el.querySelector('button[name="dismiss"]');
    const btnActions = el.querySelectorAll('button[data-btn="action"]');
    const ModalTitle = el.querySelector(".modal-title");
    const ModalDialog = el.querySelector(".modal-dialog");
    const ModalHeader = el.querySelector(".modal-header");
    const ModalFooter = el.querySelector(".modal-footer");
    const ModalContent = el.querySelector(".modal-content");
    const dispatchEvent = type => {
      if (dispatchEvent.btnAction) delete dispatchEvent.btnAction;
      dummy.dispatchEvent(new Event(type));
    };
    
    modalType = strParse(modalType).toLowerCase() || "alert";
    fn.createAlertModal = () => {
      BtnConfirm.dataset.action = "confirm.btn.modal";
      BtnDismiss.remove(), BtnCancel.remove();
      self.btnLabels({ confirm: "OK" });
    };
    
    fn.createDialogModal = () => {
      BtnDismiss.dataset.action = "dismiss.btn.modal";
      ModalFooter.remove();
      self.btnLabels({ dismiss: "Dismiss" });
    };
    
    fn.createConfirmModal = () => {
      BtnCancel.dataset.action = "cancel.btn.modal";
      BtnConfirm.dataset.action = "confirm.btn.modal";
      BtnDismiss.remove();
      self.btnLabels({ cancel: "Cancel", confirm: "Confirm" });
    };
    
    this.on = function on(ev, cb) { return dummy.addEventListener(ev, cb), self; };
    this.one = function one(ev, cb) { return dummy.addEventListener(ev, cb, { once: true }), self; };
    this.off = function off(ev, cb) { return dummy.removeEventListener(ev, cb), self; };
    this.show = function show() { return modal.show(), self; };
    this.hide = function hide() { return modal.hide(), self; };
    this.destroy = function destroy() { modal.dispose(), el.remove(), dispatchEvent("destroy.bs.modal"); };
    
    this.body = function body(str) {
      if (arguments.length && strParse(str)) ModalBody.innerHTML = str.trim();
      return self;
    };
    
    this.title = function title(str) {
      if (arguments.length && strParse(str)) ModalTitle.innerHTML = str.trim();
      return self;
    };
    
    this.header = function header(str) {
      if (arguments.length) {
        if (str === false) el.removeAttribute("aria-labelledby"), ModalHeader.remove();
        else if (strParse(str)) ModalHeader.innerHTML = str.trim();
      }
      
      return self;
    };
    
    this.footer = function footer(str) {
      if (arguments.length) {
        if (str === false) ModalFooter.remove();
        if (strParse(str)) ModalFooter.innerHTML = str.trim();
      }
      
      return self;
    };
    
    this.size = function fullscreen(opt) {
      opt = strParse(opt).toLowerCase();
      opt = ["sm", "lg", "xl"].find(val => opt === val);
      opt && ModalDialog.classList.add("modal-" + opt);
      
      return self;
    };
    
    this.centered = function centered(bool) {
      if (typeof bool === "boolean") bool ? ModalDialog.classList.add("modal-dialog-centered") : ModalDialog.classList.remove("modal-dialog-centered");
      return self;
    };
    
    this.dismissible = function dismissible(bool) {
      if (typeof bool === "boolean") {
        modal._config.focus = !bool;
        modal._config.keyboard = bool;
        modal._config.backdrop = bool;
      }
      
      return self;
    };
    
    this.btnLabels = function btnLabels(labels) {
      if (labels != null) Object.keys(labels).forEach(label => {
        if (label === "cancel") BtnCancel.textContent = strParse(labels[label]) || BtnCancel.textContent;
        else if (label === "dismiss") BtnDismiss.setAttribute("aria-label", strParse(labels[label]) || BtnDismiss.getAttribute("aria-label"));
        else if (label === "confirm") BtnConfirm.textContent = strParse(labels[label]) || BtnConfirm.textContent;
      });
      
      return self;
    };
    
    this.scrollable = function scrollable(bool) {
      if (typeof bool === "boolean") bool ? ModalDialog.classList.add("modal-dialog-scrollable") : ModalDialog.classList.remove("modal-dialog-scrollable");
      return self;
    };
    
    this.fullscreen = function fullscreen(opt) {
      opt = strParse(opt).toLowerCase();
      opt = ["sm-down", "md-down", "lg-down", "xl-down", "xxl-down"].find(val => opt === val);
      opt = `modal-fullscreen${opt?`-${opt}`:""}`;
      
      return ModalDialog.classList.add(opt), self;
    };
    
    this.theme = function theme(str) {
      switch (strParse(str).toLowerCase()) {
        case "dark":
          el.dataset.bsTheme = str;
          BtnCancel.classList.add("btn-outline-light");
          BtnConfirm.classList.add("btn-outline-light");
          break;
          
        case "info":
          el.dataset.bsTheme = str;
          BtnDismiss.dataset.bsTheme = "light";
          BtnCancel.classList.add("btn-outline-dark");
          BtnConfirm.classList.add("btn-outline-dark");
          ModalContent.classList.add("text-bg-light");
          ModalHeader.classList.add("text-bg-info");
          ModalFooter.classList.add("text-bg-info");
          break;
          
        case "danger":
          el.dataset.bsTheme = str;
          BtnCancel.classList.add("btn-outline-light");
          BtnConfirm.classList.add("btn-outline-light");
          ModalContent.classList.add("text-bg-light");
          ModalHeader.classList.add("text-bg-danger");
          ModalFooter.classList.add("text-bg-danger");
          break;
          
        case "success":
          el.dataset.bsTheme = str;
          BtnCancel.classList.add("btn-outline-light");
          BtnConfirm.classList.add("btn-outline-light");
          ModalContent.classList.add("text-bg-light");
          ModalHeader.classList.add("text-bg-success");
          ModalFooter.classList.add("text-bg-success");
          break;
          
        case "primary":
          el.dataset.bsTheme = str;
          BtnCancel.classList.add("btn-outline-light");
          BtnConfirm.classList.add("btn-outline-light");
          ModalContent.classList.add("text-bg-light");
          ModalHeader.classList.add("text-bg-primary");
          ModalFooter.classList.add("text-bg-primary");
          break;
          
        case "warning":
          el.dataset.bsTheme = str;
          BtnDismiss.dataset.bsTheme = "light";
          BtnCancel.classList.add("btn-outline-dark");
          BtnConfirm.classList.add("btn-outline-dark");
          ModalContent.classList.add("text-bg-light");
          ModalHeader.classList.add("text-bg-warning");
          ModalFooter.classList.add("text-bg-warning");
          break;
          
        case "secondary":
          el.dataset.bsTheme = str;
          BtnCancel.classList.add("btn-outline-light");
          BtnConfirm.classList.add("btn-outline-light");
          ModalContent.classList.add("text-bg-light");
          ModalHeader.classList.add("text-bg-secondary");
          ModalFooter.classList.add("text-bg-secondary");
          break;
          
        default: // => "light"
          el.dataset.bsTheme = "light";
          BtnCancel.classList.add("btn-outline-dark");
          BtnConfirm.classList.add("btn-outline-dark");
      }
      
      return self;
    };
    
    this.theme( /* default theme is "light" */ );
    
    btnActions.forEach(btnAction => btnAction.addEventListener("click", function(evt) {
      if (evt.isTrusted) {
        dispatchEvent.btnAction = this.dataset.action;
        modal.hide();
      }
    }));
    
    el.addEventListener("shown.bs.modal", function(evt) { dispatchEvent(evt.type); });
    el.addEventListener("hidden.bs.modal", function(evt) {
      if (dispatchEvent.btnAction) dispatchEvent(dispatchEvent.btnAction);
      else dispatchEvent(evt.type);
    });
    
    if (arguments.length > 1) this.title(title);
    if (arguments.length > 2) this.body(body);
    
    if (modalType === "dialog") fn.createDialogModal();
    else if (modalType === "confirm") fn.createConfirmModal();
    else fn.createAlertModal();
  };
  
  const getModal = function(modalType) {
    let x = ++i;
    let el = document.createElement("div");
    const html = (
      `<!-- modal.js -->
      <div class="modal fade" id="${modalType}Modal${x}" tabindex="-1" aria-labelledby="${modalType}ModalLabel${x}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-bottom border-dark border-opacity-10 shadow">
              <h1 class="modal-title fs-5 fw-bold" id="${modalType}ModalLabel${x}">Hello</h1>
              <button type="button" name="dismiss" class="btn-close" aria-label="{{dismiss}}" data-btn="action"></button>
            </div>
        
            <div class="modal-body">
              Glad to have you here!
            </div>
        
            <div class="modal-footer border-top border-dark border-opacity-10">
              <div class="w-100">
                <div class="row gx-3 justify-content-end align-items-center">
                  <div class="col-6 col-sm-auto">
                    <button type="button" name="cancel" class="btn fw-bold shadow w-100" data-btn="action">{{cancel}}</button>
                  </div>
                      
                  <div class="col-6 col-sm-auto">
                    <button type="button" name="confirm" class="btn fw-bold shadow w-100" data-btn="action">{{confirm}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /modal.js -->`
    );
    
    el.innerHTML = html;
    el = el.children[0];
    
    return el;
  };
  
  const strParse = str => typeof str === "string" ? str.trim() : "";
  const stripHtml = html => {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.textContent || el.innerText || "";
  };
  
  Object.defineProperty(Modal.prototype, "alert", {
    value: function AlertModal(title, content) {
      if (this instanceof AlertModal) Object.assign(this, new Modal("alert", title, content));
      else return new AlertModal(title, content);
    }
  });
  
  Object.defineProperty(Modal.prototype, "dialog", {
    value: function DialogModal(title, content) {
      if (this instanceof DialogModal) Object.assign(this, new Modal("dialog", title, content));
      else return new DialogModal(title, content);
    }
  });
  
  Object.defineProperty(Modal.prototype, "confirm", {
    value: function ConfirmModal(title, content) {
      if (this instanceof ConfirmModal) Object.assign(this, new Modal("confirm", title, content));
      else return new ConfirmModal(title, content);
    }
  });
  
  if ("__proto__" in Modal.prototype) Modal.prototype.__proto__ = null;
  return Modal.prototype;
});