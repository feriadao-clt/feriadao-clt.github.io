class EventEmitter {
  constructor() { this.events = Object.create(null); }
  
  // Subscribe to an event
  on(event, listener) {
    event = typeof event === "string" && event.trim();
    listener = typeof listener === "function" && listener;
    
    if (event && listener) {
      this.events[event] ? null : this.events[event] = [];
      this.events[event].push(listener);
    }
    
    return this;
  }
  
  // Subscribe once and then automatically remove
  one(event, listener) {
    const wrapper = (...args) => (this.off(event, wrapper), listener(...args));
    return this.on(event, wrapper);
  }
  
  // Remove a specific listener
  off(event, targetListener) {
    if (!arguments.length) this.events = Object.create(null);
    else if (arguments.length === 1 && this.events[event]) delete this.events[event];
    else if (this.events[event]) this.events[event] = this.events[event].filter(listener => listener !== targetListener);
    return this;
  }
  
  // Trigger an event with data
  emit(event, ...args) {
    this.events[event] && this.events[event].forEach(listener => listener(...args));
    return this;
  }
}