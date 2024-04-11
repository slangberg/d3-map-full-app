import { dispatch } from "d3";

/**
 * The API Event Dispatcher for the ImageMap allows for simple event dispatching and listeners to exist outside of ImageMap
 */
export default class EventDispatcher {
  constructor(initialState) {
    this.state = { ...initialState };
    this.events = [
      "onImageLoad",
      "onAssetLoad",
      "onLoad",
      "onMarkerClick",
      "onPanZoom",
      "onTooltipShow",
      "onTooltipHide",
      "onSvgClick",
      "onSpaceChange",
      "onMarkerAdd",
      "onSpaceClick",
      "onAddSpace",
      "onToggleLayer",
      "onFinishSpaceAdd",
    ];

    this.actions = [
      "zoomToMarker",
      "zoomToContainElement",
      "zoomToPosition",
      "centerMap",
      "hideTooltip",
      "showTooltip",
      "setData",
      "setZoomLock",
      "undoAction",
      "undoSpaceChange",
      "toggleEditMode",
      "addSpace",
      "addMarker",
      "startDrawMode",
      "finishSpaceAdd",
      "toggleLayer",
    ];

    this.eventTypes = [...this.events, ...this.actions];

    this.listeners = {};

    this.dispatcher = dispatch(...this.eventTypes);
    this.buildApiMethods();
  }

  /**
   * Build API methods for each of the Event Dispatcher's events and actions.
   */
  buildApiMethods = () => {
    this.actions.forEach((methodName) => {
      this[methodName] = (data) => this.dispatch(methodName, data);
    });

    this.events.forEach((methodName) => {
      this[methodName] = (callback) => this.register(methodName, callback);
    });
  };

  /**
   * Register a group of listeners for the Event Dispatcher based of a dictatory object
   * @param {Object} listenerDictionary - The dictionary of listeners.
   */
  registerListeners = (listenerDictionary) => {
    const unsubscribes = {};
    const unsubscribeAll = () => {
      Object.values(unsubscribes).forEach((un) => un());
    };
    Object.entries(listenerDictionary).forEach(([id, callback]) => {
      unsubscribes[id] = this.register(id, callback);
    });
    return { ...unsubscribes, unsubscribeAll };
  };

  /**
   * Register a callback for a specific event type.
   * @param {string} eventType - The type of the event.
   * @param {Function} callback - The callback function.
   */
  register = (eventType, callback) => {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
    this.dispatcher.on(eventType, (...args) =>
      this.listeners[eventType].forEach((callback) => callback(...args))
    );
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  };

  /**
   * Clear all registered callbacks for a specific event type.
   * @param {string} eventType - The type of the event.
   */
  clearListeners = (eventType, functionRef) => {
    if (this.listeners[eventType] && !functionRef) {
      this.listeners[eventType] = [];
    } else {
      this.listeners[eventType] = this.listeners[eventType].filter(
        (func) => func !== functionRef
      );
    }
  };

  /**
   * Dispatch an event.
   * @param {string} eventType - The type of the event.
   * @param {Object} data - The data to be passed to the event.
   */
  dispatch = (eventType, data) => {
    if (this.eventTypes.includes(eventType)) {
      return this.dispatcher.call(eventType, null, data);
    } else {
      console.error(`${eventType} is not a valid event`);
    }
  };

  /**
   * Update internal state based on event type and data.
   * @param {string} eventType - The type of the event.
   * @param {Object} data - The data to be passed to the event.
   */
  updateState = (eventType, data) => {
    // Example: Update state based on event type and data
    switch (eventType) {
      case "lock":
        this.state = { ...this.state, locked: data }; // Assuming data is an object to merge into state
        break;
      case "cursorState":
        this.state = { ...this.state, cursor: data }; // Assuming data is an object to merge into state
        break;
      // Add more cases as needed for other event types
      default:
        break;
    }
  };
}
