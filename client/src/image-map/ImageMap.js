import * as d3 from "d3";
import { zoomTransform, pointer } from "d3";
import Markers from "./Markers";
import AssetLoader from "./AssetLoader";
import Tooltip from "./Tooltips";
import DisplaySpaces from "./DisplaySpaces";
import EventDispatcher from "./EventDispatcher";
import Layers from "./layers.json";
export default class ImageMap {
  /**
   * Create an Image Map.
   * @param {Object} config - The configuration object.
   * @param {string} config.containerId - The ID of the container element.
   * @param {Object} config.imageData - The image data object.
   * @param {Array} config.markersData - The markers data array.
   * @param {Array} config.markersData - The markers data array.
   * @param {Array} config.assets - The assets array.
   * @param {boolean} config.multiSelectionMode - The multi-selection mode flag.
   */
  constructor(config) {
    const {
      containerId,
      imageData,
      markersData,
      assets,
      multiSelectionMode,
      spacesData,
    } = config;
    this.containerId = containerId;
    this.imageData = imageData;
    this.markersData = markersData;
    this.spacesData = spacesData;
    this.toolTipBoundary = 10;
    this.imageLoaded = false;
    this.assets = assets;
    this.loadedState = { image: false, assets: false };
    this.eventDispatcher = new EventDispatcher();
    this.multiSelection = multiSelectionMode;
    this.locked = false;

    this.init();
  }

  /**
   * Set the load state of various process such as assets, image load.
   * @param {string} type - The type of the load state.
   * @param {boolean} value - The value of the load state.
   */
  setLoadState = (type, value) => {
    this.loadedState[type] = value;
    const isNotLoad = Object.values(this.loadedState).some((value) => !value);
    if (!isNotLoad) {
      this.image.style("opacity", "1");
      this.markers.draw();
    }
  };

  /**
   * Initialize the map and draws the markers
   */
  init = () => {
    const { cursor } = this.eventDispatcher.state;
    this.svg = d3
      .select(`#${this.containerId}`)
      .attr("viewBox", `0 0 ${this.imageData.width} ${this.imageData.height}`)
      .style("cursor", this.locked ? "pointer" : cursor)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .on("pointerup", () => this.svg.style("cursor", cursor))
      .on("assetsLoaded", () => this.setLoadState("assets", true))
      .on("imageLoaded", () => this.setLoadState("image", true))
      .on("click", (event) => {
        const transform = zoomTransform(this.svg.node());
        const point = pointer(event);
        const [x, y] = transform.invert(point);
        this.eventDispatcher.dispatch("onSvgClick", { event, x, y });
      });

    this.defs = this.svg.append("defs");

    this.imageGroup = this.svg
      .append("g")
      .attr("id", "image-layer")
      .attr("class", "transform-layer");

    this.spacesGroup = this.svg
      .append("g")
      .attr("id", "spaces-layer")
      .attr("class", "transform-layer");
    this.markerGroup = this.svg
      .append("g")
      .attr("id", "markers-layer")
      .attr("class", "transform-layer");
    this.zoom = d3
      .zoom()
      .scaleExtent([0.5, 4])
      .on("zoom", (event) => this.zoomed(event));

    this.svg.call(this.zoom);

    this.image = this.imageGroup
      .append("image")
      .attr("id", "mapImage")
      .attr("href", this.imageData.path)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("opacity", "0")
      .on("load", () => this.setLoadState("image", true));

    this.generateLayers();
    const {
      markerGroup,
      svg,
      defs,
      markersData,
      toolTipBoundary,
      assets,
      multiSelection,
      eventDispatcher,
      spacesGroup,
      spacesData,
    } = this;

    this.tooltipHandler = new Tooltip({
      svg,
      markerGroup,
      toolTipBoundary,
      multiSelection,
      eventDispatcher,
    });

    this.markers = new Markers({
      markerGroup,
      svg,
      defs,
      markersData,
      toolTipBoundary,
      assets,
      tooltipHandler: this.tooltipHandler,
      eventDispatcher: this.eventDispatcher,
    });

    this.spaces = new DisplaySpaces({
      spacesData,
      layer: spacesGroup,
      svg,
      eventDispatcher: this.eventDispatcher,
    });

    this.assetLoader = new AssetLoader({ container: defs, assets, svg });

    this.eventDispatcher.registerListeners({
      zoomToPosition: this.panAndZoom,
      zoomToMarker: this.zoomToMarker,
      centerMap: this.centerMap,
      zoomToContainElement: (id) => this.zoomToContainElement(id),
      hideTooltip: (id) => this.tooltipHandler.removeTooltip(id),
      showTooltip: (id) => this.markers.showTooltip(id),
      onMarkerClick: ({ id }) => this.markers.showTooltip(id),
      setData: (data) => this.setData(data),
      setZoomLock: (locked) => this.setZoomLock(locked),
      onSvgClick: () => this.tooltipHandler.removeExistingTooltips(),
      onSpaceClick: ({ id }) => this.zoomToContainElement(id),
      onToggleLayer: this.toggleLayer,
      addAsset: (asset) => this.assetLoader.insertAsset(asset),
    });

    this.handleResize(); // Call handleResize initially

    this.drawSpacesChild();
  };

  generateLayers = () => {
    const layerData = Object.entries(Layers);
    this.svg
      .selectAll(".layer")
      .data(layerData)
      .join("g")
      .attr("class", ([_id, data]) =>
        data.transFormLayer ? "transform-layer layer" : "layer"
      )
      .attr("id", ([id]) => id);
  };

  drawSpacesChild = () => {
    // if (!this.editMode) {
    //   this.spaces.draw();
    // } else {
    //   this.spaces.clear();
    // }
    this.spaces.draw();
  };

  setZoomLock = (locked) => {
    this.locked = locked;
    this.svg.style("cursor", locked ? "pointer" : "grab");
  };

  toggleLayer = (layer, isShown) => {
    const style = isShown ? "block" : "none";
    switch (layer) {
      case "markers":
        this.markers.style("display", style);
        break;
      case "spaces":
        this.markers.style("display", style);
        break;
      default:
        break;
    }
  };

  /**
   * Get the event API.
   * @returns {EventDispatcher} The event dispatcher.
   */
  getEventApi = () => {
    return this.eventDispatcher;
  };

  setData = (data) => {
    this.markersData = data;
    this.markers.markersData = data;
    this.markers.draw();
  };

  /**
   * Handle native D3 pan and zoom event.
   * @param {Object} event - The event object.
   */
  zoomed(event) {
    const { transform } = event;
    if (!this.locked) {
      this.markerGroup.attr("transform", transform);
      this.svg.selectAll(".transform-layer").attr("transform", transform);
      this.markers.draw();
      this.markers.moveTooltip(); // move tooltips to track positions of markers
      this.handleCursorChange(event);
    }
  }

  /**
   * Set what the mouse cursor will be based on the zoom and pan event.
   * @param {Object} event - The event object.
   */
  handleCursorChange = (event) => {
    clearTimeout(this.zoomTimeout);
    if (event.sourceEvent && event.sourceEvent.type === "mousemove") {
      this.svg.style("cursor", "grabbing"); // Set cursor to "grabbing" when dragging starts
    } else if (event.sourceEvent && event.sourceEvent.type === "wheel") {
      this.zoomTimeout = setTimeout(() => this.svg.style("cursor", "grab"), 50);
      if (event.sourceEvent.deltaY < 0) {
        this.svg.style("cursor", "zoom-in");
      } else {
        this.svg.style("cursor", "zoom-out");
      }
    }
  };

  /**
   * Handles rerendering based on the SVG resize event
   */
  handleResize = () => {
    const observer = new ResizeObserver((entries) => {
      this.markers.moveTooltip();
    });

    observer.observe(this.svg.node());
  };

  /**
   * Pan and zoom to a specific position.
   * @param {Object} config - The configuration object.
   * @param {number} config.x - The x-coordinate.
   * @param {number} config.y - The y-coordinate.
   * @param {number} config.zoomLevel - The zoom level.
   */
  panAndZoom = ({ x, y, zoomLevel }) => {
    const svgNode = this.svg.node();
    const svgWidth = svgNode.clientWidth;
    const svgHeight = svgNode.clientHeight;

    const scaleX = svgWidth / 2 - zoomLevel * x;
    const scaleY = svgHeight / 2 - zoomLevel * y;

    this.svg
      .transition()
      .duration(500)
      .call(
        this.zoom.transform,
        d3.zoomIdentity.translate(scaleX, scaleY).scale(zoomLevel)
      );
  };

  /**
   * Zoom to a specific marker.
   * @param {string} id - The ID of the marker.
   */
  zoomToMarker = (id) => {
    const data = this.markers.getMarkerData(id);
    if (data) {
      const { x, y } = data;
      this.panAndZoom({ x, y, zoomLevel: 3 });
    }
  };

  /**
   * Zoom to contain a specific element.
   * @param {string} id - The ID of the element.
   */
  zoomToContainElement = (id) => {
    const data = this.spaces.getSpaceData(id);
    const svg = this.svg;

    if (data) {
      const { domNode } = data;
      // var bbox = domNode.getBoundingClientRect();

      // Get the dimensions of the SVG viewport
      var svgWidth = svg.node().clientWidth;
      var svgHeight = svg.node().clientHeight;

      // // Calculate the scale
      // var scaleX = svgWidth / bbox.width;
      // var scaleY = svgHeight / bbox.height;
      // var scale = Math.min(scaleX, scaleY); // Ensure the element fits both dimensions

      const pathNode = domNode;
      const pathBBox = pathNode.getBBox();

      const scaleX = svgWidth / pathBBox.width;
      const scaleY = svgHeight / pathBBox.height;
      const scale = Math.min(scaleX, scaleY); // To ensure the path fits within both dimensions.

      const translateX =
        (svgWidth - pathBBox.width * scale) * 2 - pathBBox.x * scale;
      const translateY =
        (svgHeight - pathBBox.height * scale) * 2 - pathBBox.y * scale;

      this.svg
        .transition()
        .duration(500)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(translateX, translateY).scale(scale)
        );
    }
  };

  /**
   * Center the map.
   */
  centerMap = () => {
    this.svg
      .transition()
      .duration(500)
      .call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
  };
}
