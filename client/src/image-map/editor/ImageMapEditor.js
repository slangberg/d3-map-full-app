import { zoomTransform, pointer } from "d3";
import ImageMap from "../ImageMap";
import SpaceEditor from "./SpaceEditor";
import PolySpaceEditor from "./PolySpaceEditor";
export default class ImageMapEditor extends ImageMap {
  constructor(config) {
    super(config);
    this.spacesEditors = [];
    this.interactionType = "marker";
    this.eventDispatcher.registerListeners({
      undoSpaceChange: () => this.setEditMode(!this.editMode),
      addSpace: this.addNewSpace,
      addMarker: this.addMarker,
      // onSpaceChange: console.log,
      // onSvgClick: console.log,
    });
    this.eventDispatcher.updateState("editMode", true);
    this.drawSpaces();
    this.layer = this.svg
      .append("g")
      .attr("id", "spaces-editor-layer")
      .attr("class", "transform-layer");
  }

  addMarker = () => {
    console.log("hit");
    this.interactionType = "marker";
    this.eventDispatcher.updateState("cursorState", "crosshair");
    this.svg.style("cursor", "crosshair");
    this.eventDispatcher.register("onSvgClick", ({ x, y }) => {
      this.svg.style("cursor", "grab");
      this.insertMarker(x, y);
    });
  };

  setEditMode = (inEditMode) => {
    this.editMode = inEditMode;
    // this.drawSpacesChild();
    // this.drawSpaces();
    // console.log("editMode enabled");
  };

  addNewSpace = (type, newID) => {
    this.interactionType = "space";
    if (type === "poly") {
      this.eventDispatcher.dispatch("onAddSpace", {
        newID,
        type: "poly",
      });
      this.spacesEditors.push(
        new PolySpaceEditor({
          id: newID,
          svg: this.svg,
          layer: this.layer,
          svgWrapper: this.svgWrapper,
          eventDispatcher: this.eventDispatcher,
          drawMode: true,
        })
      );
    }
  };

  /**
   * Initialize the map and draws the markers with additional click logging.
   */
  drawSpaces = () => {
    if (this.editMode && this.interactionType === "space") {
      this.spacesData.forEach((space) => {
        if (space.type === "poly") {
          this.spacesEditors.push(
            new PolySpaceEditor({
              id: space.id,
              data: space,
              svg: this.svg,
              layer: this.layer,
              eventDispatcher: this.eventDispatcher,
            })
          );
        }

        if (space.type === "rect") {
          this.spacesEditors.push(
            new SpaceEditor({
              id: space.id,
              data: space,
              svg: this.svg,
              layer: this.layer,
              eventDispatcher: this.eventDispatcher,
              ...space,
            })
          );
        }
      });
    } else if (this.layer && this.layer.node()) {
      this.spacesEditors = [];
      this.layer.selectAll("*").remove();
    }
  };

  insertMarker = (x, y) => {
    const count = this.markersData.length;
    this.markersData.push({
      x,
      y,
      marker: "marker-placeholder",
      name: `Temp Marker ${count}`,
      id: count,
      color: "red",
    });
    this.markers.draw();
  };
}
