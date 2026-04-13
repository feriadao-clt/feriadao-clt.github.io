(function(global, factory) {
  global.modal = factory()
})(this, function() {
  "use strict";
  
  let i = 0;
  const modal = Object.create(null);
  const Modal = function Modal(el, dummy) {
    const M = bootstrap.Modal.getOrCreateInstance(el);
    const self = this;
    const btns = el.querySelectorAll("button[data-action]");
    const dispatchEvent = event => dummy.dispatchEvent(new Event(event));
    
    btns.forEach(btn => {
      btn.addEventListener("click", function(evt) {
        btns.event = this.dataset.action, self.close();
      });
    });
    
    el.addEventListener("shown.bs.modal", function(evt) {
      dispatchEvent("open.modal");
    });
    
    el.addEventListener("hidden.bs.modal", function(evt) {
      if (btns.event) dispatchEvent(btns.event), delete btns.event;
      else dispatchEvent("close.modal");
    });
    
    this.open = function open() {
      return M.show(), self;
    };
    
    this.close = function close() {
      return M.hide(), self;
    };
    
    this.destroy = function destroy() {
      M.dispose(), el.remove(), dispatchEvent("destroy.modal");
    };
    
    this.addClass = function addClass(classes) {
      if (typeof classes === "string") {
        classes.trim().split(" ").forEach(className => {
          className.startsWith("modal-") && self.getElement(".modal-dialog").classList.add(className);
        });
      }
      
      return self;
    };
    
    this.getElement = function getElement(sel) { return el.querySelector(sel); };
    this.getElements = function getElements(sel) { return el.querySelectorAll(sel); };
    
    this.setTheme = function setTheme(str) {
      str = typeof str === "string" && str.trim();
      if (str) el.setAttribute("data-bs-theme", str);
      return self;
    };
    
    this.setBgColor = function bg(classes) {
      if (typeof classes === "string") {
        classes.trim().split(" ").forEach(className => {
          /^(text-)?bg-/g.test(className) && self.getElement(".modal-content").classList.add(className);
        });
      }
      
      return self;
    };
    
    this.setBody = function setBody(str) {
      str = typeof str === "string" && str.trim();
      
      if (str) self.getElement(".modal-body").innerHTML = str;
      return self;
    };
    
    this.setTitle = function setTitle(str) {
      str = typeof str === "string" && str.trim();
      
      if (str) self.getElement(".modal-title").innerHTML = str;
      return self;
    };
    
    this.removeHeader = function removeHeader() {
      el.removeAttribute("aria-labelledby");
      self.getElement(".modal-header").remove();
      return self;
    };
    
    this.removeFooter = function removeFooter() {
      self.getElement(".modal-footer").remove();
      return self;
    };
    
    this.removeButton = function removeButton(btnName) {
      if (arguments.length) {
        const btn = self.getElement(`button[name="${btnName}"]`);
        if (btn) btn.remove();
      }
      
      return self;
    };
    
    this.on = function on(ev, cb) {
      return dummy.addEventListener(ev, cb), this;
    };
    
    this.one = function one(ev, cb) {
      return dummy.addEventListener(ev, cb, { once: true }), this;
    };
    
    this.off = function off(ev, cb) {
      return dummy.removeEventListener(ev, cb), this;
    }
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
            <button type="button" name="dismiss" class="btn-close" aria-label="${stripHtml(modal.btnDismissLabel)}" data-action="dismiss.btn.modal"></button>
          </div>
        
          <div class="modal-body">
            Glad to have you here!
          </div>
        
          <div class="modal-footer border-0">
            <button type="button" name="cancel" class="btn btn-secondary" data-action="cancel.btn.modal">${stripHtml(modal.btnCancelLabel)}</button>
            <button type="button" name="confirm" class="btn btn-secondary" data-action="confirm.btn.modal">${stripHtml(modal.btnConfirmLabel)}</button>
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
      
      if (arguments.length < 3) content = title, title = dismiss;
      if (dismiss === false) el.getElement('button[name="dismiss"]').remove();
      
      el.getElement('button[name="cancel"]').remove();
      el.setTitle(title).setBody(content);
      
      return el;
    }
  });
  
  Object.defineProperty(modal, "dialog", {
    value: function modalDialog(dismiss, title, content) {
      const el = getModal();
      
      if (arguments.length < 3) content = title, title = dismiss;
      if (dismiss === false) el.getElement('button[name="dismiss"]').remove();
      
      el.removeFooter();
      el.setTitle(title).setBody(content);
      
      return el;
    }
  });
  
  Object.defineProperty(modal, "confirm", {
    value: function modalConfirm(dismiss, title, content) {
      const el = getModal();
      
      if (arguments.length < 3) content = title, title = dismiss;
      if (dismiss === false) el.getElement('button[name="dismiss"]').remove();
      
      el.setTitle(title).setBody(content);
      el.getElement('button[name="cancel"]').innerText = stripHtml(modal.btnNoLabel);
      el.getElement('button[name="confirm"]').innerText = stripHtml(modal.btnYesLabel);
      
      return el;
    }
  });
  
  Object.defineProperty(modal, "infinite", {
    value: function modalInfinite(content) {
      const el = getModal();
      
      el.removeHeader().removeFooter();
      el.setBody(content);
      
      return el;
    }
  });
  
  return modal;
});

/*var m = modal.confirm();
m.open();
m.setTheme("light");
m.addClass("modal-fullscreen modal-dialog-scrollable modal-dialog-centered");

m.on("open.modal", function(evt) {
  console.log(evt.type)
  setTimeout(() => this.destroy(), 10000);
});

m.on("destroy.modal", function(evt) {
  console.log(evt.type);
})*/