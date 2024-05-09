import { xml, select } from "d3";
/**
 * Class that will parse the asset config for the ImageMap and convert assets to symbols in the SVG defs.
 */
export default class AssetLoader {
  /**
   * Create an Asset Loader.
   * @param {Object} config - The configuration object.
   * @param {Object} config.container - The container object.
   * @param {Array} config.assets - The assets array.
   * @param {Object} config.svg - The SVG object.
   */
  constructor({ container, assets, svg }) {
    this.container = container;
    this.reservedAssets = ["marker-placeholder"];
    this.svg = svg;
    const providedAssets = Object.entries(assets).map(([key, value]) => ({
      symbolKey: key,
      ...value,
    }));
    this.assets = [...providedAssets];
    this.loadAssets();
  }

  loadSvgContent(url) {
    return new Promise((resolve, reject) => {
      xml(url)
        .then((svgData) => {
          resolve(svgData);
        })
        .catch((error) => {
          console.error(`Failed to load SVG from ${url}`, error);
          reject(error);
        });
    });
  }

  insertAsset(asset) {
    const placeHolderSize = 16;
    this.container
      .append("symbol")
      .attr("id", "marker-placeholder")
      .attr("viewBox", `0 0 ${placeHolderSize} ${placeHolderSize}`)
      .attr("width", placeHolderSize)
      .attr("height", placeHolderSize)
      .attr("transform-origin", "left center")
      .append("circle")
      .attr("cx", placeHolderSize / 2)
      .attr("cy", placeHolderSize / 2)
      .attr("r", placeHolderSize / 2)
      .attr("fill", "red");

    this.loadSvgContent(asset.url)
      .then((svgData) => {
        // Get the root SVG element
        const rootSvg = select(svgData).select("svg");
        // Create a symbol and set the viewBox attribute
        const symbol = this.container
          .append("symbol")
          .attr("id", asset.symbolKey)
          .attr("viewBox", rootSvg.attr("viewBox"))
          .attr("width", rootSvg.attr("width"))
          .attr("height", rootSvg.attr("height"))
          .attr("transform-origin", "center center");

        symbol
          .append("rect")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("fill", "none")
          .attr("stroke", "none")
          .attr("pointer-events", "all");

        // Append the children elements to the symbol
        rootSvg.selectAll("*").each(function () {
          symbol.node().appendChild(this.cloneNode(true));
        });
      })
      .catch((error) => {
        console.error("Failed to load SVG asset:", error);
      });
  }

  loadAssets() {
    Promise.all(
      this.assets
        .filter(({ id }) => !this.reservedAssets.includes(id))
        .map((asset) => this.insertAsset(asset))
    ).then(() => this.svg.dispatch("assetsLoaded"));
  }
}
