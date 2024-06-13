import * as d3 from 'd3';

export function generateGraph(elementId: string, data: Array<{date: Date, value: number}>) {
    // Set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 50, left: 40},
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Append the svg object to the div with id=elementId
    const svg = d3.select(`#${elementId}`)
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // Define the line
    const valueline = d3.line<{date: Date, value: number}>()
                        .x(d => x(d.date))
                        .y(d => y(d.value));

    // Scale the range of the data
    x.domain(d3.extent(data, d => d.date) as [Date, Date]);
    y.domain([0, d3.max(data, d => d.value) as number]);

    // Add the valueline path
    svg.append("path")
       .data([data])
       .attr("class", "line")
       .attr("d", valueline)
       .attr("stroke", "steelblue")
       .attr("stroke-width", 2)
       .attr("fill", "none");

    // Add the scatterplot
    svg.selectAll("dot")
       .data(data)
       .enter().append("circle")
       .attr("r", 5)
       .attr("cx", d => x(d.date))
       .attr("cy", d => y(d.value))
       .attr("fill", "steelblue")
       .on("mouseover", function(event, d) {
           d3.select(this).attr("r", 8).attr("fill", "orange");
           tooltip.transition()
                  .duration(200)
                  .style("opacity", .9);
           tooltip.html(`Date: ${d3.timeFormat("%Y-%m-%d")(d.date)}<br/>Value: ${d.value}`)
                  .style("left", (event.pageX + 5) + "px")
                  .style("top", (event.pageY - 28) + "px");
       })
       .on("mouseout", function() {
           d3.select(this).attr("r", 5).attr("fill", "steelblue");
           tooltip.transition()
                  .duration(500)
                  .style("opacity", 0);
       });

    // Add the X Axis
    svg.append("g")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x).tickFormat(d => d3.timeFormat("%Y-%m-%d")(d as Date)))
       .selectAll("text")
       .attr("transform", "rotate(-45)")
       .style("text-anchor", "end");

    // Add the Y Axis
    svg.append("g")
       .call(d3.axisLeft(y));

    // Add a tooltip div. Hidden by default:
    const tooltip = d3.select("body").append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0)
                      .style("position", "absolute")
                      .style("background-color", "white")
                      .style("border", "solid")
                      .style("border-width", "1px")
                      .style("border-radius", "5px")
                      .style("padding", "10px")
                      .style("pointer-events", "none");
}
