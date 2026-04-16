(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
    typeof define === "function" && define.amd ? define(factory) :
    global.modal = factory();
})(this, function() {
  "use strict";
  
  /** Requires: Bootstrap v5.3.8 **/
  
  let i = 0;
  const store = Object.create(null);
  const Modal = function Modal(mode, title, body) {
    const el = getModal();
    const self = this;
    const dummy = document.createElement("div");
    const bsModal = bootstrap.Modal.getOrCreateInstance(el);
    const btnActions = el.querySelectorAll('button[data-btn="action"]');
    const dispatchEvent = type => {
      if (dispatchEvent.btnAction) delete dispatchEvent.btnAction;
      dummy.dispatchEvent(new Event(type));
    };
    
    btnActions.forEach(btnAction => btnAction.addEventListener("click", function(evt) {
      if (evt.isTrusted) {
        dispatchEvent.btnAction = this.dataset.action;
        bsModal.hide();
      }
    }));
    
    el.addEventListener("shown.bs.modal", function(evt) { dispatchEvent(evt.type); });
    el.addEventListener("hidden.bs.modal", function(evt) {
      if (dispatchEvent.btnAction) dispatchEvent(dispatchEvent.btnAction);
      else dispatchEvent(evt.type);
    });
    
    this.on = function on(ev, cb) { return dummy.addEventListener(ev, cb), self; };
    this.one = function one(ev, cb) { return dummy.addEventListener(ev, cb, { once: true }), self; };
    this.off = function off(ev, cb) { return dummy.removeEventListener(ev, cb), self; };
    this.show = function show() { return bsModal.show(), self; };
    this.hide = function hide() { return bsModal.hide(), self; };
    
    this.body = function body(value) {
      const query = el.querySelector(".modal-body");
      if (arguments.length) {
        if (strParse(value)) query.innerHTML = value.trim();
        return self;
      }
      
      else return query.innerHTML;
    };
    
    this.title = function title(value) {
      const query = el.querySelector(".modal-title");
      if (arguments.length) {
        if (strParse(value)) query.innerHTML = value.trim();
        return self;
      }
      
      else return query.innerHTML;
    };
    
    this.header = function header(value) {
      const query = el.querySelector(".modal-header");
      if (arguments.length) {
        if (value === false) el.removeAttribute("aria-labelledby"), query.remove();
        if (strParse(value)) query.innerHTML = value.trim();
        return self;
      }
      
      else return query.innerHTML;
    };
    
    this.footer = function footer(value) {
      const query = el.querySelector(".modal-footer");
      if (arguments.length) {
        if (value === false) query.remove();
        if (strParse(value)) query.innerHTML = value.trim();
        return self;
      }
      
      else return query.innerHTML;
    };
    
    this.dismiss = function dismiss(value) {
      if (value === false) el.querySelector('button[name="dismiss"]').remove();
      return self;
    };
    
    this.destroy = function destroy() { bsModal.dispose(), el.remove(), dispatchEvent("destroy.bs.modal"); };
    
    this.addClass = function addClass(classes) {
      classes = strParse(classes);
      
      if (classes) {
        classes.trim().split(" ").forEach(className => {
          className.startsWith("modal-") && el.querySelector(".modal-dialog").classList.add(className);
        });
      }
      
      return self;
    };
    
    this.setTheme = function setTheme(str) {
      str = strParse(str);
      
      if (str) el.setAttribute("data-bs-theme", str);
      return self;
    };
    
    this.setBgColor = function setBgColor(classes) {
      classes = strParse(classes);
      
      if (classes) {
        classes.trim().split(" ").forEach(className => {
          /^(text-)?bg-/g.test(className) && el.querySelector(".modal-content").classList.add(className);
        });
      }
      
      return self;
    };
    
    if (arguments.length) this.title(title);
    if (arguments.length > 1) this.body(body);
    
    if (strParse(this.btnOkLabel)) el.querySelector('button[name="confirm"]').innerText = stripHtml(this.btnOkLabel);
    if (strParse(this.btnCancelLabel)) el.querySelector('button[name="cancel"]').innerText = stripHtml(this.btnCancelLabel);
    if (strParse(this.btnDismissLabel)) el.querySelector('button[name="dismiss"]').setAttribute("aria-label", stripHtml(this.btnDismissLabel));
    
    if (mode === "dialog") this.footer(false);
    else if (mode === "confirm") {
      el.querySelector('button[name="cancel"]').innerText = stripHtml(strParse(this.btnNoLabel) || "No");
      el.querySelector('button[name="confirm"]').innerText = stripHtml(strParse(this.btnYesLabel) || "Yes");
    }
    
    else el.querySelector('button[name="cancel"]').remove();
  };
  
  const getModal = function() {
    let x = ++i;
    let el = document.createElement("div");
    const html = (
      `<!-- modal.js -->
      <div class="modal fade" id="bsModal${x}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalTitleLabel${x}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-0 shadow-sm">
              <h1 class="modal-title fs-5" id="modalTitleLabel${x}">Hello</h1>
              <button type="button" name="dismiss" class="btn-close" aria-label="Dismiss" data-btn="action" data-action="dismiss.btn.modal"></button>
            </div>
        
            <div class="modal-body shadow-sm">
              Glad to have you here!
            </div>
        
            <div class="modal-footer border-0">
              <button type="button" name="cancel" class="btn btn-secondary" data-btn="action" data-action="cancel.btn.modal">Cancel</button>
              <button type="button" name="confirm" class="btn btn-secondary" data-btn="action" data-action="confirm.btn.modal">OK</button>
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
  
  const strParse = str => typeof str === "string" && str.trim();
  const stripHtml = html => {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.textContent || el.innerText || "";
  };
  
  Object.defineProperty(Modal.prototype, "alert", {
    value: function ModalAlert(title, content) {
      if (this instanceof ModalAlert) Object.assign(this, new Modal("alert", title, content));
      else return new ModalAlert(title, content);
    }
  });
  
  Object.defineProperty(Modal.prototype, "dialog", {
    value: function ModalDialog(title, content) {
      if (this instanceof ModalDialog) Object.assign(this, new Modal("dialog", title, content));
      else return new ModalDialog(title, content);
    }
  });
  
  Object.defineProperty(Modal.prototype, "confirm", {
    value: function ModalConfirm(title, content) {
      if (this instanceof ModalConfirm) Object.assign(this, new Modal("confirm", title, content));
      else return new ModalConfirm(title, content);
    }
  });
  
  return Modal.prototype;
});