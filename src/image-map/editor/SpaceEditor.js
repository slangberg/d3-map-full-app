import { drag, select } from "d3";

export default class SpaceEditor {
  constructor({ svg, x, y, width, height, layer, id, eventDispatcher, data }) {
    this.svg = svg;
    this.x = x;
    this.y = y;
    this.width = width;
    this.id = id;
    this.data = data;
    this.root = layer;
    this.height = height;
    this.selectedHandle = null;
    this.events = eventDispatcher;

    this.spaceGroup = this.root.append("g").attr("id", `${id}-space-group`);
    this.rectangle = this.spaceGroup
      .append("rect")
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("id", `space-item-${this.id}`)
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", this.data?.color || "rgba(5, 240, 200, 0.7)")
      .style("cursor", "move")
      .call(this.dragRectangle());

    this.handles = this.spaceGroup
      .selectAll(`.space-rect-handle-${this.id}`)
      .data([
        { dx: 0, dy: 0 },
        { dx: this.width, dy: 0 },
        { dx: this.width, dy: this.height },
        { dx: 0, dy: this.height },
      ])
      .enter()
      .append("circle")
      .attr("class", `space-rect-handle-${this.id}`)
      .attr("cx", (d) => this.x + d.dx)
      .attr("cy", (d) => this.y + d.dy)
      .attr("r", 7)
      .style("fill", "white")
      .style("stroke", "black")
      .style("cursor", (d, i) => (i % 2 === 0 ? "nwse-resize" : "nesw-resize"))
      .call(this.dragHandle());
  }

  dragRectangle() {
    const self = this;

    function dragged(event) {
      self.x += event.dx;
      self.y += event.dy;

      self.rectangle.attr("x", self.x).attr("y", self.y);

      self.handles
        .attr("cx", (d) => self.x + d.dx)
        .attr("cy", (d) => self.y + d.dy);
    }

    return drag().on("drag", dragged).on("end", self.onSpaceChange);
  }

  destroy = () => {
    this.spaceGroup.remove();
  };

  onSpaceChange = () => {
    this.events.dispatch("onSpaceChange", {
      id: this.id,
      x: this.x,
      y: this.y,
      type: "rect",
      width: this.width,
      height: this.height,
    });
  };

  dragHandle() {
    const self = this;

    function dragstarted(event, d) {
      self.selectedHandle = select(this);
      self.selectedHandle.raise().classed("active", true);
    }

    function dragged(event, d) {
      const newX = event.x - self.x;
      const newY = event.y - self.y;
      const selectedHandle = select(this);

      const handleIndex = self.handles.nodes().indexOf(selectedHandle.node());
      const handleData = self.handles.data()[handleIndex];

      let tempX = self.x;
      let tempWidth = self.width;
      let tempY = self.y;
      let tempHeight = self.height;

      if (handleData === self.handles.data()[0]) {
        tempX += newX;
        tempY += newY;
        tempWidth -= newX;
        tempHeight -= newY;
      } else if (handleData === self.handles.data()[1]) {
        tempWidth = newX;
        tempY += newY;
        tempHeight -= newY;
      } else if (handleData === self.handles.data()[2]) {
        tempWidth = newX;
        tempHeight = newY;
      } else if (handleData === self.handles.data()[3]) {
        tempX += newX;
        tempWidth -= newX;
        tempHeight = newY;
      }

      if (tempWidth < 0) {
        self.x = tempX + tempWidth;
        self.width = Math.abs(tempWidth);
      } else {
        self.x = tempX;
        self.width = tempWidth;
      }

      if (tempHeight < 0) {
        self.y = tempY + tempHeight;
        self.height = Math.abs(tempHeight);
      } else {
        self.y = tempY;
        self.height = tempHeight;
      }

      self.rectangle
        .attr("x", self.x)
        .attr("y", self.y)
        .attr("width", self.width)
        .attr("height", self.height);

      self.handles
        .data([
          { dx: 0, dy: 0 },
          { dx: self.width, dy: 0 },
          { dx: self.width, dy: self.height },
          { dx: 0, dy: self.height },
        ])
        .attr("cx", (d) => self.x + d.dx)
        .attr("cy", (d) => self.y + d.dy);
    }

    function dragended(event, d) {
      self.selectedHandle.classed("active", false);
      self.selectedHandle = null;
      self.onSpaceChange();
    }

    return drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
}
