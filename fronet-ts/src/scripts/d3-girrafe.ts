import * as d3 from 'd3';

// Function to generate the graph
export function generateGraph(elementId: string, data: number[]) {
  // Select the HTML element where the graph will be appended
  const svg = d3.select(`#${elementId}`)
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  // Create the bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 100)
    .attr("y", (d, i) => 500 - d)
    .attr("width", 50)
    .attr("height", (d) => d)
    .attr("fill", "blue");
}
