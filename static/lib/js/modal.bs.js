(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
    typeof define === "function" && define.amd ? define(factory) :
    global.modal = factory();
})(this, function() {
  "use strict";
  
  /** Requires: Bootstrap 5 **/
  
  // => Check browser supports…
  if (false !== document.createElement("script").noModule) throw new Error("[modal.bs.js] Browser not compatible. Update your browser to the latest version!");
  // => Check bootstrap supports…
  if (typeof bootstrap !== "object" || bootstrap === null) throw new Error('[modal.bs.js] "Bootstrap" is missing. Please fix this!');
  
  let count = 0;
  const store = Object.create(null);
  
  class Emitter {
    constructor() {
      const ctx = this;
      const events = new Map();
      const isEvents = value => (((value instanceof Event) || (value instanceof CustomEvent)) && value);
      const isString = value => ((typeof value === "string") && value.trim());
      const isFunction = value => ((typeof value === "function") && value);
      const eventStore = type => {
        const event = isString(type);
        const options = Object.create(null);
        
        options.addListener = listener => {
          isFunction(listener) && event && options.setListener(listener);
          return options;
        };
        
        options.setListener = listener => {
          events.set(event, options.getListeners().concat(listener));
          return options;
        };
        
        options.getListeners = () => events.has(event) ? events.get(event) : [];
        options.removeListener = (...args) => {
          events.has(event) ? (args.length ? isFunction(args[0]) && events.set(event, options.getListeners().filter(listener => listener !== args[0])) && !events.get(event).length && events.delete(event) : events.delete(event)) : null;
          return options;
        };
        
        return options;
      };
      
      ctx.on = function on(type, listener) {
        eventStore(type).addListener(listener);
        return ctx;
      };
      
      ctx.one = function one(type, listener) {
        const wrapper = function(...args) { return ctx.off(type, wrapper), listener.apply(this, args); };
        return ((isFunction(listener) && ctx.on(type, wrapper)), ctx);
      };
      
      ctx.off = function off(type, targetListener) {
        if (!arguments.length) events.clear();
        else eventStore(type).removeListener(...Array.from(arguments).slice(1));
        return ctx;
      };
      
      ctx.emit = function emit(type, ...args) {
        const event = isEvents(type) || ctx.createEvents(type);
        const listeners = eventStore(event.type).getListeners();
        
        event.destroy = function destroy() { return [!event.stopImmediatePropagation(), !event.preventDefault(), event.returnValue].pop(); };
        return args.unshift(event) && listeners.every(listener => false === listener.apply(this, args) ? event.destroy() : event.returnValue);
      };
      
      ctx.createEvents = function createEvents(type, options) {
        const event = isString(type) || "";
        const config = Object.assign(Object.create(null), options);
        const Events = "detail" in config ? CustomEvent : Event;
        return new Events(event, config);
      };
    }
  }
  
  class ModalBootstrap extends Emitter {
    constructor(modal_type, modal_title, modal_content) {
      super("modal");
      
      let modal;
      
      modal_type = strParse(modal_type).toLowerCase();
      
      if (!["alert", "dialog", "confirm"].includes(modal_type)) modal_type = "alert";
      
      const ctx = this;
      const emit = this.emit;
      const Modal = getModal(modal_type);
      const modal_config = Object.create(null);
      
      const destroyEvents = (evt, cancel) => (evt.stopImmediatePropagation(), ((cancel === true) && evt.preventDefault()), true);
      const modal_options = (() => {
        let size, options, fullscreen, breakpoint, breakpoints;
        const defaults = Object.assign(Object.create(null), store.defaults);
        const createModalAlert = () => {
          Modal.dataset.modalType = modal_type;
          Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name != "okay" && btn.remove());
        };
        
        const createModalDialog = () => {
          Modal.dataset.modalType = modal_type;
          Modal.querySelector(".modal-footer").remove();
        };
        
        const createModalConfirm = () => {
          Modal.dataset.modalType = modal_type;
          Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => ["okay", "dismiss"].includes(btn.name) && btn.remove());
        };
        
        options = Object.create(null);
        modal_config.focus = true;
        modal_config.backdrop = "static";
        modal_config.keyboard = false;
        
        if (arguments.length > 2) options.title = modal_title, options.content = modal_content;
        else if (Object.prototype.toString.call(modal_title) === "[object Object]") options = modal_title;
        else options.content = modal_title;
        
        Modal.querySelectorAll(".modal-dialog").forEach(ModalDialog => {
          if ("size" in options) {
            size = ["modal"];
            breakpoint = strParse(options.size).toLowerCase();
            breakpoints = ["sm", "lg", "xl"];
            breakpoints.includes(breakpoint) && size.push(breakpoint) && ModalDialog.classList.add(size.join("-"));
          }
          
          if (options.centered !== false) ModalDialog.classList.add("modal-dialog-centered");
          if (options.scrollable !== false) ModalDialog.classList.add("modal-dialog-scrollable");
          if (options.btnDismiss === false) Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name === "dismiss" && btn.remove());
          
          if ("fullscreen" in options) {
            fullscreen = ["modal-fullscreen"];
            breakpoint = strParse(options.fullscreen).toLowerCase();
            breakpoints = ["sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
            
            if (options.fullscreen === true) ModalDialog.classList.add(fullscreen[0]);
            else if (breakpoints.includes(breakpoint)) fullscreen.push(breakpoint), ModalDialog.classList.add(fullscreen.join("-"));
          }
        });
        
        if (options.dismissible === true) {
          modal_config.focus = false;
          modal_config.backdrop = true;
          modal_config.keyboard = true;
        }
        
        if (modal_type === "alert") createModalAlert();
        else if (modal_type === "dialog") createModalDialog();
        else if (modal_type === "confirm") createModalConfirm();
        
        return Object.assign(defaults, options);
      })();
      
      const setModalTheme = value => {
        switch (strParse(value).toLowerCase()) {
          case "auto":
            const listener = evt => setModalTheme(evt.matches ? "dark" : "light");
            const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
            
            darkModeQuery.addEventListener("change", listener);
            setModalTheme(darkModeQuery.matches ? "dark" : "light");
            ctx.one("dispose.bs.modal", () => darkModeQuery.removeEventListener("change", listener));
            break;
            
          case "dark":
            Modal.dataset.bsTheme = "dark";
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("bg-body-tertiary"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name !== "dismiss" && (btn.classList.remove("btn-dark"), btn.classList.add("btn-light")));
            break;
            
          case "info":
            Modal.dataset.bsTheme = "info";
            Modal.querySelectorAll(".modal-content").forEach(el => el.classList.add("text-bg-light"));
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("text-bg-info"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name === "dismiss" ? btn.dataset.bsTheme = "light" : btn.classList.add("btn-info"));
            break;
            
          case "light":
            Modal.dataset.bsTheme = "light";
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("bg-body-tertiary"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name !== "dismiss" && (btn.classList.remove("btn-light"), btn.classList.add("btn-dark")));
            break;
            
          case "danger":
            Modal.dataset.bsTheme = "danger";
            Modal.querySelectorAll(".modal-content").forEach(el => el.classList.add("text-bg-light"));
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("text-bg-danger"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name !== "dismiss" && btn.classList.add("btn-danger"));
            break;
            
          case "success":
            Modal.dataset.bsTheme = "success";
            Modal.querySelectorAll(".modal-content").forEach(el => el.classList.add("text-bg-light"));
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("text-bg-success"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name !== "dismiss" && btn.classList.add("btn-success"));
            break;
            
          case "primary":
            Modal.dataset.bsTheme = "primary";
            Modal.querySelectorAll(".modal-content").forEach(el => el.classList.add("text-bg-light"));
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("text-bg-primary"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name !== "dismiss" && btn.classList.add("btn-primary"));
            break;
            
          case "warning":
            Modal.dataset.bsTheme = "warning";
            Modal.querySelectorAll(".modal-content").forEach(el => el.classList.add("text-bg-dark"));
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("text-bg-warning"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name === "dismiss" ? btn.dataset.bsTheme = "light" : btn.classList.add("btn-warning"));
            break;
            
          case "secondary":
            Modal.dataset.bsTheme = "secondary";
            Modal.querySelectorAll(".modal-content").forEach(el => el.classList.add("text-bg-light"));
            Modal.querySelectorAll(".modal-header").forEach(el => el.classList.add("text-bg-secondary"));
            Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => btn.name !== "dismiss" && btn.classList.add("btn-secondary"));
            break;
            
          default:
            setModalTheme("auto");
        }
        
        return ctx;
      };
      
      // => modal controller
      ctx.show = function show() { return modal.show(), ctx; };
      ctx.hide = function hide() { return modal.hide(), ctx; };
      ctx.dispose = function dispose() { modal.dispose(), Modal.remove(), emit.call(ctx, "dispose.bs.modal"), ctx.off(); };
      
      ctx.buttonLabels = function buttonLabels(value) {
        const btnNames = Object.keys(Object.assign(Object.create(null), value));
        const btnActions = Array.from(Modal.querySelectorAll('button[data-btn="action"]'));
        
        btnActions.filter(btn => btnNames.includes(btn.name)).forEach(btn => {
          const label = stripHtml(strParse(value[btn.name]));
          label && btn.name !== "dismiss" ? btn.textContent = label : btn.setAttribute("aria-label", label);
        });
        
        return ctx;
      };
      
      ctx.disableButtons = function disableButtons(value) {
        const btnNames = Object.keys(Object.assign(Object.create(null), value));
        const btnActions = Array.from(Modal.querySelectorAll('button[data-btn="action"]'));
        
        if (!arguments.length) btnActions.forEach(btn => true !== btn.matches(":disabled") && (btn.disabled = true));
        else if (typeof value === "boolean") btnActions.forEach(btn => value !== btn.matches(":disabled") && (btn.disabled = value));
        else btnActions.filter(btn => btnNames.includes(btn.name)).forEach(btn => {
          const state = value[btn.name];
          typeof state === "boolean" && state !== btn.matches(":disabled") && (btn.disabled = state);
        });
        
        return ctx;
      };
      
      ctx.setIcon = function setIcon(value) {
        Modal.querySelectorAll(".modal-title").forEach(ModalTitle => {
          const icon = Object.assign(Object.create(null), value);
          const iconame = stripHtml(strParse(icon.name)).toLowerCase().split(/\s/).join("");
          const breakpoint = stripHtml(strParse(icon.color)).toLowerCase().split(/\s/).join("");
          const breakpoints = ["dark", "info", "light", "danger", "success", "primary", "warning", "secondary"];
          
          if (iconame) {
            ModalTitle = ModalTitle.querySelector("i") || (ModalTitle.prepend(document.createElement("i")), ModalTitle.querySelector("i"));
            ModalTitle.className = `bi bi-${iconame}${breakpoints.includes(breakpoint) ? ` text-${breakpoint}` : ""}`;
            ModalTitle.setAttribute("aria-label", "icon: " + iconame.split("-").join(" "));
          }
        });
        
        return ctx;
      };
      
      ctx.setTitle = function setTitle(value) {
        Modal.querySelectorAll(".modal-title").forEach(ModalTitle => {
          value = stripHtml(strParse(value));
          value && (ModalTitle.querySelector("span").textContent = value);
        });
        
        return ctx;
      };
      
      ctx.getContent = function getContent() { return Modal.querySelector(".modal-body"); };
      ctx.setContent = function setContent(value) {
        Modal.querySelectorAll(".modal-body").forEach(ModalBody => {
          if (typeof value === "string") ModalBody.innerHTML = value.trim();
          else if (value instanceof HTMLElement) {
            ModalBody.innerHTML = "";
            ModalBody.append(value);
          }
        });
        
        return ctx;
      };
      
      delete this.emit;
      
      Modal.addEventListener("show.bs.modal", function(evt) { destroyEvents(evt) && emit.call(ctx, evt); });
      Modal.addEventListener("hide.bs.modal", function(evt) { destroyEvents(evt) && emit.call(ctx, evt); });
      Modal.addEventListener("shown.bs.modal", function(evt) { destroyEvents(evt) && emit.call(ctx, evt); });
      Modal.addEventListener("hidden.bs.modal", function(evt) { destroyEvents(evt) && emit.call(ctx, evt); });
      
      Modal.querySelectorAll('button[data-btn="action"]').forEach(btn => {
        btn.addEventListener("click", function(realEvent) {
          const one = evt => {
            evt.realEvent = realEvent;
            destroyEvents(evt);
            Modal.removeEventListener(evt.type, one);
            emit.call(ctx, evt) && modal.hide();
          };
          
          const event = ctx.createEvents(btn.dataset.action, { cancelable: true });
          destroyEvents(realEvent, true);
          Modal.addEventListener(event.type, one), Modal.dispatchEvent(event);
        });
      });
      
      setModalTheme(modal_options.theme)
        .setIcon(modal_options.icon)
        .setTitle(modal_options.title).setContent(modal_options.content)
        .buttonLabels(modal_options.buttonLabels)
        .disableButtons(modal_options.disableButtons);
      
      modal = bootstrap.Modal.getOrCreateInstance(Modal, modal_config);
    }
  }
  
  const getModal = function(modal_type) {
    let x = ++count;
    let el = document.createElement("div");
    const html = `
    <div class="modal fade" id="modal-${modal_type}-${x}" tabindex="-1" aria-labelledby="modal-${modal_type}-label-${x}" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header shadow border-0">
            <h1 class="modal-title d-flex align-items-center fs-5 fw-bold gap-0 column-gap-2" id="modal-${modal_type}-label-${x}">
              <span>Hello</span>
            </h1>
            
            <button type="button" name="dismiss" class="btn-close" data-btn="action" data-action="dismiss.btn.modal" aria-label="Dismiss"></button>
          </div>
        
          <div class="modal-body">
            <div class="d-table w-100 py-3" style="min-height: 100%;">
              <div class="d-table-cell align-middle">
                <div class="text-center">
                  <h5>Hello!</h5>
                  <h3>Welcome to modal.bs.js</h3>
                  <p class="m-0">view <a href="#">documentation</a></p>
                </div>
              </div>
            </div>
          </div>
        
          <div class="modal-footer border-0">
            <div class="w-100">
              <div class="row gx-3 justify-content-end align-items-center">
                <div class="col-6 col-sm-auto">
                  <button type="button" name="cancel" class="btn text-truncate fw-bold shadow-sm w-100" data-btn="action" data-action="cancel.btn.modal">Cancel</button>
                </div>
                      
                <div class="col-6 col-sm-auto">
                  <button type="button" name="confirm" class="btn text-truncate fw-bold shadow-sm w-100" data-btn="action" data-action="confirm.btn.modal">Confirm</button>
                </div>
                
                <div class="col-6 col-sm-auto">
                  <button type="button" name="okay" class="btn text-truncate fw-bold shadow-sm w-100" data-btn="action" data-action="okay.btn.modal">OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    
    el.innerHTML = html;
    return el.children[0];
  };
  
  const strParse = value => typeof value === "string" ? value.trim() : "";
  const stripHtml = value => {
    const el = document.createElement("div");
    el.innerHTML = typeof value === "string" ? value.trim() : "";
    return el.textContent || el.innerText || "";
  };
  
  Object.defineProperty(store, Symbol.toStringTag, { value: "Modal" });
  Object.defineProperty(store, "alert", {
    value: function ModalAlert() {
      if (this instanceof ModalAlert) Object.assign(this, new ModalBootstrap("alert", ...arguments));
      else return new ModalAlert(...arguments);
    }
  });
  
  Object.defineProperty(store, "dialog", {
    value: function ModalDialog() {
      if (this instanceof ModalDialog) Object.assign(this, new ModalBootstrap("dialog", ...arguments));
      else return new ModalDialog(...arguments);
    }
  });
  
  Object.defineProperty(store, "confirm", {
    value: function ModalConfirm() {
      if (this instanceof ModalConfirm) Object.assign(this, new ModalBootstrap("confirm", ...arguments));
      else return new ModalConfirm(...arguments);
    }
  });
  
  return store;
});