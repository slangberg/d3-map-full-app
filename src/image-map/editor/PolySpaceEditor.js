import {
  drag,
  pointer,
  select,
  zoomTransform,
  path as d3Path,
  selectAll,
} from "d3";

export default class PolySpaceEditor {
  constructor({
    svg,
    id,
    layer,
    eventDispatcher,
    data,
    drawMode,
    vertices,
    svgWrapper,
  }) {
    this.svg = svg;
    this.id = id;

    this.cutouts = [];
    this.root = layer;
    this.data = data || {};
    this.vertices = vertices || [];
    this.events = eventDispatcher;
    this.states = [];
    this.drawMode = !!drawMode;
    this.svgWrapper = svgWrapper;

    this.events.registerListeners({
      toggleEditMode: () => this.setEditMode(!this.editMode),
      // onSpaceChange: console.log,
      // onSvgClick: console.log,
    });
    if (this.drawMode) {
      this.svg.style("cursor", "cross-hairs");
    }
    this.pathOGroup = this.root.append("g").attr("id", `${id}-space-item`);

    this.pathObj = this.pathOGroup
      .append("path")
      .attr("id", `${id}-space-path`)
      .attr("class", `space-path`)
      .style("fill", this.data?.color || "rgba(5, 240, 200, 0.3)")
      .style("stroke-width", 1)
      .style("stroke", "#000000");

    this.clickClear = this.events.register("onSvgClick", this.addVertex);
    this.updatePath();

    this.vertices.forEach((point, index) => this.addHandle(point, index));

    this.pathObj.call(this.dragPath());
  }

  endCreation = () => {
    this.clickClear();
  };

  dragPath = () => {
    let dragStart = null;

    const dragStarted = (event) => {
      dragStart = pointer(event, this.svg.node());
    };

    const dragged = (event) => {
      const currentPoint = pointer(event, this.svg.node());
      const dx = currentPoint[0] - dragStart[0];
      const dy = currentPoint[1] - dragStart[1];

      // Update all vertices based on drag delta
      this.vertices = this.vertices.map(([x, y]) => [x + dx, y + dy]);

      // Re-bind updated vertices data to handles, preserving the index
      this.pathOGroup
        .selectAll(".vertex-handle")
        .data(
          this.vertices.map((v, i) => ({ position: v, index: i })),
          (d) => d.index
        )
        .attr("cx", (d) => d.position[0])
        .attr("cy", (d) => d.position[1]);

      this.updatePath(); // Redraw the path with updated vertices
      dragStart = currentPoint;
    };

    const dragEnded = () => {
      this.onSpaceChange(); // Update any necessary state after dragging ends
    };

    return drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
  };

  addState = (vertexes) => {
    this.states.push([...vertexes]);
  };

  undoVertex = () => {
    if (!this.states.length) {
      throw new Error("No more history to undo");
    }
    this.vertices = this.states.pop();
    this.updatePath();
  };

  onSpaceChange = () => {
    const { vertices } = this;
    this.events.dispatch("onSpaceChange", {
      ...this.data,
      vertices,
      type: "polygon",
    });
  };

  dragVertex = () => {
    const self = this;

    function dragStarted(event, d) {
      event.sourceEvent.stopPropagation();
      select(this).raise().classed("active", true);
    }

    function dragged(event, d) {
      const point = pointer(event, self.svg.node());
      d.position = point;
      self.vertices[d.index] = d.position;

      select(this).attr("cx", d.position[0]).attr("cy", d.position[1]);

      self.updatePath();
    }

    function dragEnded(event, d) {
      event.sourceEvent.stopPropagation();
      select(this).classed("active", false);
      self.onSpaceChange();
    }

    return drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
  };

  addVertex(event) {
    const point = pointer(event, this.svg.node());
    this.vertices.push(point);
    this.addState(this.vertices);
    this.addHandle(point, this.vertices.length - 1);
    this.updatePath();
    this.onSpaceChange();
  }

  addHandle = (point, index) => {
    // console.log("addHandle called");
    this.pathOGroup
      .append("circle")

      .attr("class", `vertex-handle-${this.id} vertex-handle`)
      .attr("cx", point[0])
      .attr("cy", point[1])
      .attr("r", 7)
      .datum({ position: point, index }) // Bind object with position and index
      .style("stroke", (d) => (index === 0 ? "white" : "black"))
      .style("fill", (d) =>
        index === 0 ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.4)"
      )
      .on("click", (event) => this.handleFirstClick(event, index))
      .call(this.dragVertex()); // Add drag behavior to handles

    select(selectAll(`.vertex-handle-${this.id}`).nodes()[0]).style(
      "cursor",
      "move"
    );
  };

  setDrawMode = (state) => {
    this.drawMode = state;
    if (!this.drawMode) {
      selectAll(`.vertex-handle-${this.id}`).style("cursor", "move");
    }
  };

  handleFirstClick = (event, index) => {
    event.sourceEvent.stopPropagation();
    if (index === 0) {
      if (this.drawMode && this.vertices.length) {
        this.setDrawMode(false);
      }
    }
  };

  getCurrentPoint = (point) => {
    return zoomTransform(this.svg.node()).invert(point);
  };

  addCutout(points) {
    this.cutouts.push(points);
    this.updatePath();
  }

  updatePath() {
    const p = d3Path();
    this.vertices.forEach((point, i) => {
      if (i === 0) p.moveTo(point[0], point[1]);
      else p.lineTo(point[0], point[1]);
    });
    p.closePath();
    this.pathObj.attr("d", p.toString());
  }
}
