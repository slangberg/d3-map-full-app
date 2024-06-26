import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./MarkerEditor.css";
import { useEditor } from "./MarkerEditorContext";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const MarkerEditor = ({ fill = "green", onOffsetChange }) => {
  const [popoverContent, setPopoverContent] = useState("No Selection");
  const { registerApi, setHighlighted, setSelectedNode } = useEditor();
  const svgRef = useRef();
  const fillableTags = [
    "path",
    "circle",
    "rect",
    "ellipse",
    "polygon",
    "polyline",
    "text",
  ];

  const handlePopoverOpen = (event) => {
    const target = event.currentTarget;
    const fill = target.getAttribute("fill") || "none";
    const classes = target.getAttribute("class") || "none";
    const content = `Tag: ${target.tagName}, Fill: ${fill}, Class: ${classes}`;
    setPopoverContent(content);
  };

  const handlePopoverClose = () => {
    setPopoverContent("No Selection");
  };

  const handleElementClick = (event) => {
    const target = event.currentTarget;
    const attributeList = [...target.attributes].map((attr) => ({
      name: attr.name,
      value: attr.value,
    }));
    console.log({
      tag: target.tagName,
      node: target,
      attributes: attributeList,
    });
  };

  const initEditor = (svgContent) => {
    const svgContainer = d3.select(svgRef.current);
    // Clear previous SVG contents if any
    svgContainer.selectAll("*").remove();

    // Parse and append the new SVG content
    const parser = new DOMParser();
    const newSvgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const importedNode = document.importNode(newSvgDoc.documentElement, true);

    // Remove any width and height attributes to make the SVG responsive
    importedNode.removeAttribute("width");
    importedNode.removeAttribute("height");
    importedNode.removeAttribute("fill");

    svgContainer.node().appendChild(importedNode);
    // Append the imported node to the SVG container
    svgContainer.node().appendChild(importedNode);

    svgContainer
      .select("svg")
      .attr("id", "source-marker")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .selectAll("*")
      .on("mouseenter", handlePopoverOpen)
      .on("mouseleave", handlePopoverClose)
      .on("click", handleElementClick);
    // Set the SVG to auto-scale
    svgContainer
      .attr("viewBox", importedNode.getAttribute("viewBox"))
      .attr("fill", fill)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Extract viewBox details for calculations
    const viewBox = importedNode
      .getAttribute("viewBox")
      ?.split(" ")
      .map(Number);

    const [minX, minY, width, height] = viewBox || [0, 0, 300, 300];

    const centerX = minX + width / 2;
    const centerY = minY + height / 2;
    const smallerDimension = Math.min(width, height);
    const circleRadius = smallerDimension / 30; // Circle radius as a proportion of the smaller dimension

    const offsetAnchor = d3
      .select(svgRef.current)
      .append("circle")
      .classed("offset-anchor", true)
      .classed("no-fill-parse", true)
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", circleRadius)
      .style("cursor", "all-scroll");

    onOffsetChange(0, 0);

    // Setup D3 drag behavior
    const drag = d3
      .drag()
      .on("start", function () {
        d3.select(this).raise().classed("active", true);
      })
      .on("drag", function (event) {
        d3.select(this).attr("cx", event.x).attr("cy", event.y);
      })
      .on("end", function () {
        const cx = d3.select(this).attr("cx");
        const cy = d3.select(this).attr("cy");
        const offsetX = Number(cx - centerX);
        const offsetY = Number(centerY - cy);

        const offX = offsetX / width; // Normalize offset by width
        const offY = offsetY / height;
        console.log({ offX: offX.toFixed(7), offY: offY.toFixed(7) });
        onOffsetChange(offsetX.toFixed(7), offsetY.toFixed(7));
      });

    offsetAnchor.call(drag);
  };

  const setOffset = (offsetX, offsetY) => {
    const viewBox = svgRef.current
      .getAttribute("viewBox")
      .split(" ")
      .map(Number);
    const [minX, minY, width, height] = viewBox;
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;

    const cx = centerX + Number(offsetX);
    const cy = centerY - Number(offsetY);

    d3.select(svgRef.current).select("circle").attr("cx", cx).attr("cy", cy);
  };

  const highlightExplicitFill = () => {
    fillableTags.forEach((tag) => {
      d3.select(svgRef.current)
        .selectAll(tag)
        .filter(function () {
          const hasInlineFill = this.getAttribute("fill");
          const isExcluded = d3.select(this).classed("no-fill-parse");
          return (
            hasInlineFill !== null && hasInlineFill !== "none" && !isExcluded
          );
        })
        .classed("error-highlight", true);
    });
    setHighlighted(true);
  };

  const removeExplicitFill = () => {
    fillableTags.forEach((tag) => {
      d3.select(svgRef.current)
        .selectAll(tag)
        .filter(function () {
          const hasInlineFill = this.getAttribute("fill");
          const isExcluded = d3.select(this).classed("no-fill-parse");
          return (
            hasInlineFill !== null && hasInlineFill !== "none" && !isExcluded
          );
        })
        .attr("fill", null);
    });
    setHighlighted(false);
  };

  const resetMarker = () => initEditor();

  const removeExplicitFillHighlight = () => {
    fillableTags.forEach((tag) => {
      d3.select(svgRef.current)
        .selectAll(tag + ".error-highlight")
        .classed("error-highlight", false); // Remove the 'error-highlight' class
    });
    setHighlighted(false);
  };

  const clearEditor = () => {
    d3.select(svgRef.current).selectAll("*").remove();
  };

  const resetOffset = () => {
    const viewBox = svgRef.current
      .getAttribute("viewBox")
      .split(" ")
      .map(Number);
    const [minX, minY, width, height] = viewBox;
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;

    d3.select(svgRef.current)
      .select("circle")
      .attr("cx", centerX)
      .attr("cy", centerY);

    onOffsetChange(centerX, centerY);
  };

  const exportCurrentSvg = () => {
    const currentMarker = d3
      .select(svgRef.current)
      .select("#source-marker")
      .node();
    const serializer = new XMLSerializer();
    const string = serializer.serializeToString(currentMarker);
    const blob = new Blob([string], { type: "image/svg+xml" });
    return blob;
  };

  const reduceDimensions = (factor) => {
    const marker = d3.select(svgRef.current).select("#source-marker");
    const bbox = marker.node().getBBox();
    const newWidth = bbox.width * factor;
    const newHeight = bbox.height * factor;
    const newX = bbox.x + (bbox.width - newWidth) / 2;
    const newY = bbox.y + (bbox.height - newHeight) / 2;
    marker
      .attr("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
  };

  const editorApi = {
    initEditor,
    highlightExplicitFill,
    exportCurrentSvg,
    resetOffset,
    setOffset,
    removeExplicitFillHighlight,
    removeExplicitFill,
    resetMarker,
    clearEditor,
    reduceDimensions,
  };

  useEffect(() => {
    registerApi(editorApi);
    return () => {
      // d3.select(svgRef.current).selectAll("*").remove(); // Cleanup SVG contents
    };
  }, []);

  return (
    <Paper variant="outlined">
      <svg ref={svgRef} width="400" height="400" />
      <Typography>{popoverContent}</Typography>
    </Paper>
  );
};

export default MarkerEditor;
