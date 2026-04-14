(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
    typeof define === "function" && define.amd ? define(factory) :
    global.modal = factory()
})(this, function() {
  "use strict";
  
  /** Requires: Bootstrap v5.3.8 **/
  
  let i = 0;
  const modal = Object.create(null);
  const Modal = function Modal(el, dummy) {
    const M = bootstrap.Modal.getOrCreateInstance(el);
    const self = this;
    const btns = el.querySelectorAll("button[data-action]");
    const dispatchEvent = event => dummy.dispatchEvent(new Event(event));
    
    btns.forEach(btn => btn.addEventListener("click", function(evt) { btns.event = this.dataset.action, self.close(); }));
    el.addEventListener("shown.bs.modal", function(evt) { dispatchEvent("open.modal"); });
    el.addEventListener("hidden.bs.modal", function(evt) {
      if (btns.event) dispatchEvent(btns.event), delete btns.event;
      else dispatchEvent("close.modal");
    });
    
    this.on = function on(ev, cb) { return dummy.addEventListener(ev, cb), self; };
    this.one = function one(ev, cb) { return dummy.addEventListener(ev, cb, { once: true }), self; };
    this.off = function off(ev, cb) { return dummy.removeEventListener(ev, cb), self; }
    this.open = function open() { return M.show(), self; };
    this.close = function close() { return M.hide(), self; };
    this.destroy = function destroy() { M.dispose(), el.remove(), dispatchEvent("destroy.modal"); };
    
    this.addClass = function addClass(classes) {
      classes = strParse(classes);
      
      if (classes) {
        classes.trim().split(" ").forEach(className => {
          className.startsWith("modal-") && self.getElement(".modal-dialog").classList.add(className);
        });
      }
      
      return self;
    };
    
    this.getButton = function removeButton(btnName) { return self.getElement(`button[name="${btnName}"]`); };
    this.getElement = function getElement(sel) { return el.querySelector(sel); };
    this.getElements = function getElements(sel) { return el.querySelectorAll(sel); };
    
    this.setTheme = function setTheme(str) {
      str = strParse(str);
      
      if (str) el.setAttribute("data-bs-theme", str);
      return self;
    };
    
    this.setBody = function setBody(str) {
      str = strParse(str);
      
      if (str) self.getElement(".modal-body").innerHTML = str;
      return self;
    };
    
    this.setTitle = function setTitle(str) {
      str = strParse(str);
      
      if (str) self.getElement(".modal-title").innerHTML = str;
      return self;
    };
    
    this.setBgColor = function bg(classes) {
      classes = strParse(classes);
      
      if (classes) {
        classes.trim().split(" ").forEach(className => {
          /^(text-)?bg-/g.test(className) && self.getElement(".modal-content").classList.add(className);
        });
      }
      
      return self;
    };
    
    this.removeFooter = function removeFooter() { return self.getElement(".modal-footer").remove(), self; };
    this.removeHeader = function removeHeader() {
      el.removeAttribute("aria-labelledby");
      self.getElement(".modal-header").remove();
      return self;
    };
  };
  
  const getModal = function() {
    let x = ++i;
    let div = document.createElement("div");
    const btn = document.createElement("button");
    const html = `<!-- modal.js -->
    <div class="modal fade" id="bsModal${x}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalTitleLabel${x}" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header border-0 shadow-sm">
            <h1 class="modal-title fs-5" id="modalTitleLabel${x}">Hello</h1>
            <button type="button" name="dismiss" class="btn-close" aria-label="${stripHtml(strParse(modal.btnDismissLabel)||"Dismiss")}" data-action="dismiss.btn.modal"></button>
          </div>
        
          <div class="modal-body">
            Glad to have you here!
          </div>
        
          <div class="modal-footer border-0">
            <button type="button" name="cancel" class="btn btn-secondary" data-action="cancel.btn.modal">${stripHtml(strParse(modal.btnCancelLabel)||"Cancel")}</button>
            <button type="button" name="confirm" class="btn btn-secondary" data-action="confirm.btn.modal">${stripHtml(strParse(modal.btnConfirmLabel)||"OK")}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /modal.js -->`;
    
    div.innerHTML = html;
    div = div.children[0];
    
    document.body.append(div);
    return Object.assign(btn, new Modal(div, btn));
  };
  
  const strParse = str => typeof str === "string" && str.trim() || null;
  const stripHtml = html => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  
  modal.btnNoLabel = "No";
  modal.btnYesLabel = "Yes";
  modal.btnCancelLabel = "Cancel";
  modal.btnConfirmLabel = "OK";
  modal.btnDismissLabel = "Dismiss";
  
  Object.defineProperty(modal, "alert", {
    value: function modalAlert(dismiss, title, content) {
      const el = getModal();
      
      if (dismiss === false) el.getButton("dismiss").remove();
      else if (strParse(dismiss)) content = title, title = dismiss;
      
      el.getButton("cancel").remove();
      el.setTitle(title).setBody(content);
      
      return el;
    }
  });
  
  Object.defineProperty(modal, "dialog", {
    value: function modalDialog(dismiss, title, content) {
      const el = getModal();
      
      if (dismiss === false) el.getButton("dismiss").remove();
      else if (strParse(dismiss)) content = title, title = dismiss;
      
      el.setTitle(title).setBody(content);
      el.removeFooter();
      
      return el;
    }
  });
  
  Object.defineProperty(modal, "confirm", {
    value: function modalConfirm(dismiss, title, content) {
      const el = getModal();
      
      if (dismiss === false) el.getButton("dismiss").remove();
      else if (strParse(dismiss)) content = title, title = dismiss;
      
      el.getButton("cancel").innerText = stripHtml(strParse(modal.btnNoLabel) || "No");
      el.getButton("confirm").innerText = stripHtml(strParse(modal.btnYesLabel) || "Yes");
      el.setTitle(title).setBody(content);
      
      return el;
    }
  });
  
  Object.defineProperty(modal, "infinite", {
    value: function modalInfinite(title, content) {
      const el = getModal();
      
      el.getButton("dismiss").remove();
      
      if (arguments.length > 1) el.setTitle(title);
      else content = title, el.removeHeader();
      el.setBody(content), el.removeFooter();
      
      return el;
    }
  });
  
  return modal;
});