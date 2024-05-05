<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>D3.js Line Graph</title>
  <script src="https://d3js.org/d3.v6.min.js"></script>
  <style>
  
    body {
       width: 100vw;
       height: 100vh;
       background-color: #dee2e6;
       display: flex;
       justify-content: center;
       align-items: center;
    }

    #lineGraph {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    .axis text {
      font-size: 12px;
    }
    .axis path,
    .axis line {
      fill: none;
      stroke: #000;
      shape-rendering: crispEdges;
    }
    .axis .tick line {
      stroke: #ccc;
    }
    .text-anchor-middle {
      text-anchor: middle;
    }
    .axis-label {
      font-size: 14px;
      font-weight: bold;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="lineGraph"></div>

  <script>
    // Sample data
    const jsonData = [
      { year: 2010, value: 10 },
      { year: 2011, value: 20 },
      { year: 2012, value: 30 },
      { year: 2013, value: 25 },
      { year: 2014, value: 35 },
      { year: 2015, value: 45 }
    ];

    // Set up SVG dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create an SVG element
    const svg = d3.select('#lineGraph')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(jsonData, d => d.year))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(jsonData, d => d.value)])
      .nice()
      .range([innerHeight, 0]);

    // Generate line path
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.value));

    // Draw line
    svg.append('path')
      .datum(jsonData)
      .attr('class', 'line')
      .attr('d', line);

    // Draw x-axis
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.format('d')));

    // Draw y-axis
    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(yScale));

    // Add a title
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', innerWidth / 2)
      .attr('y', -10)
      .text('Sample Line Graph');

    // Add x-axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom)
      .text('Year');

    // Add y-axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -margin.left + 15)
      .text('Value');
  </script>
</body>
</html>
