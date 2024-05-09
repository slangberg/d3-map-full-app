// import d3 from "d3";
import { zoomTransform, select, easeBounce } from "d3";

export default class Markers {
  constructor({
    markerGroup,
    svg,
    defs,
    markersData,
    toolTipBoundary,
    assets,
    tooltipHandler,
    eventDispatcher,
  }) {
    this.events = eventDispatcher;
    this.markerGroup = markerGroup;
    this.svg = svg;
    this.defs = defs;
    this.markersData = markersData;
    this.toolTipBoundary = toolTipBoundary;
    this.assets = assets;
    this.tooltipHandler = tooltipHandler;
  }

  getMarkerOffset = (assetId, plane) => {
    if (this.assets[assetId] && this.assets[assetId].offset) {
      const { k } = zoomTransform(this.svg.node());
      const index = plane === "x" ? 0 : 1;
      return this.assets[assetId].offset[index] / k;
    }
    return 0;
  };

  getMarkerSize = (assetId, prop) => {
    if (this.assets[assetId] && this.assets[assetId][prop]) {
      const { k } = zoomTransform(this.svg.node());
      return this.assets[assetId][prop] / k;
    }
  };

  draw() {
    this.markerGroup
      .selectAll(".marker")
      .data(this.markersData)
      .join("use")
      .attr("class", "marker")
      .attr("id", (d) => `marker-${d.id}`)
      .attr("href", (d) => `#${d.marker}`)
      .attr("width", (d) => this.getMarkerSize(d.marker, "width"))
      .attr("height", (d) => this.getMarkerSize(d.marker, "height"))
      .attr("x", (d) => d.x + this.getMarkerOffset(d.marker, "x"))
      .attr("y", (d) => d.y + this.getMarkerOffset(d.marker, "y"))
      .attr("transform-origin", (d) => `${d.x}px ${d.y}px`)
      .on("click", (event, d) => this.markerClicked(event, d));
  }

  getMarkerData = (markerId) => {
    const d = this.markersData.find(({ id }) => id === markerId);
    return {
      ...d,
      x: d.x + this.getMarkerOffset(d.marker, "x"),
      y: d.y + this.getMarkerOffset(d.marker, "y"),
      tooltipOffsetX: this.getTooltipOffset(d.marker, "x"),
      tooltipOffsetY: this.getTooltipOffset(d.marker, "y"),
      node: this.markerGroup.select(`#marker-${d.id}`).node(),
      domId: `#marker-${d.id}`,
    };
  };

  markerClicked(event, d) {
    event.stopPropagation();
    // const existingOverlayDiv = select(`#map-tooltip-${d.id}`);
    const marker = select(event.target);
    const markerData = this.getMarkerData(d.id);

    this.events.dispatch("onMarkerClick", markerData);

    marker
      .transition()
      .duration(200) // Duration for the first segment
      .ease(easeBounce)
      .attr("y", (d) => d.y + this.getMarkerOffset(d.marker, "y") - 20)
      .transition()
      .duration(100) // Duration for the second segment
      .ease(easeBounce)
      .attr("y", (d) => d.y + this.getMarkerOffset(d.marker, "y"));
  }
}
