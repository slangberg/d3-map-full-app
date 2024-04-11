import { select, path, zoomTransform } from "d3";

export default class Space {
  constructor(config) {
    const { svg, layer, eventDispatcher, spacesData } = config;
    this.svg = svg;
    this.root = layer;
    this.events = eventDispatcher;
    this.data = spacesData;
  }

  draw = () => {
    const groups = this.root
      .selectAll(".space-item-group")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", `space-group`)
      .attr("id", ({ id }) => `${id}-space-group`);

    const self = this;
    groups.each(function (d, i) {
      var group = select(this);
      let item;
      if (d.type === "poly") {
        item = group.append("path").attr("d", self.genPolyPath(d));
      } else if (d.type === "rect") {
        item = group
          .append("rect")
          .attr("x", d.x)
          .attr("y", d.y)
          .attr("width", d.width)
          .attr("height", d.height);
      }

      item
        .attr("id", `space-item-${d.id}`)
        .attr("class", `space-item react-space`)
        .datum(d)
        .style("fill", (d) => d.color)
        .on("click", (event, d) => self.spaceClicked(event, d, i));
    });
  };

  spaceClicked = (event, d, index) => {
    event.stopPropagation();
    this.events.dispatch("onSpaceClick", this.getSpaceData(d.id, index));
  };

  getSpaceData = (id, index) => {
    const node = select(`#space-item-${id}`);
    const d = node.datum();
    const base = {
      ...d,
      index,
      domNode: node.node(),
      domId: `#${d.id}-space-item`,
    };

    if (d.type === "rect") {
      const [x, y] = this.getCurrentPoint([d.x, d.y]);
      return {
        ...base,
        x,
        y,
      };
    }

    return {
      ...base,
      vertices: d.vertices.map(this.getCurrentPoint),
    };
  };

  getCurrentPoint = (point) => {
    return zoomTransform(this.svg.node()).invert(point);
  };

  genPolyPath = ({ vertices = [], cutouts = [] }) => {
    const p = path();
    const transform = zoomTransform(this.svg.node());

    vertices.forEach((point, i) => {
      const truePoint = transform.invert(point);
      if (i === 0) p.moveTo(truePoint[0], truePoint[1]);
      else p.lineTo(truePoint[0], truePoint[1]);
    });
    p.closePath(); // Close the main polygon

    // Draw the cutouts
    cutouts.forEach((cutout) => {
      cutout.forEach((point, i) => {
        const truePoint = transform.invert(point);
        if (i === 0) p.moveTo(truePoint[0], truePoint[1]);
        else p.lineTo(truePoint[0], truePoint[1]);
      });
      p.closePath(); // Close the cutout
    });
    return p.toString();
  };

  clear = () => this.root.selectAll("*").remove();
}
