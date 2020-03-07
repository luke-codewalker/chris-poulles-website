export default class HistoryManager {
  constructor() {
    this.subscribers = [];
    window.addEventListener('popstate', (e) => {
      this.notifySubscribers({ type: 'popstate', event: e });
    });
  }

  notifySubscribers(newVal) {
    this.subscribers.map((s) => s.callback(newVal));
  }

  pushState(...args) {
    window.history.pushState(...args);
    this.notifySubscribers({ type: 'pushstate', event: { toUrl: args[2] } });
  }

  replaceState(...args) {
    window.history.replaceState(...args);
    this.notifySubscribers({ type: 'replacestate', event: { } });
  }

  subscribe(callback) {
    const id = (Math.round(Math.random() * 99999)).toString().padStart(5, '0');
    this.subscribers.push({
      id,
      callback,
    });

    return {
      unsubscribe: () => this.unsubscribe(id),
    };
  }

  unsubscribe(id) {
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
  }
}
