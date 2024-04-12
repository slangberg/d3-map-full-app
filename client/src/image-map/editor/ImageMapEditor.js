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
    this.drawSpaces();
    this.layer = this.svg
      .append("g")
      .attr("id", "spaces-editor-layer")
      .attr("class", "transform-layer");
  }

  addMarker = () => {
    this.interactionType = "marker";
    console.log("add marker");
    this.eventDispatcher.register("onSvgClick", this.insertMarker);
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

  insertMarker = (event) => {
    console.log(event);
    const transform = zoomTransform(this.svg.node());
    const point = pointer(event);

    // Apply the inverse of the current transformation to get actual SVG content coordinates
    const [x, y] = transform.invert(point);
    const count = this.markersData.length;
    this.markersData.push({
      x,
      y,
      marker: "base",
      name: `Marker ${count}`,
      id: count,
      color: "red",
    });
    this.markers.draw();
    // console.log(JSON.stringify(this.markersData));
  };
}
