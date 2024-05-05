<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Film Visualizations</title>
  <script src="https://d3js.org/d3.v6.min.js"></script>
  <style>
    .chart-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .chart {
      margin: 20px;
    }
  </style>
</head>
<body>
  <div class="chart-container">
    <div class="chart" id="bar-chart"></div>
  </div>

  <script>
    // Sample data
    const data = [
      { Title: 'Film A', Length: 120, Popularity: 80 },
      { Title: 'Film B', Length: 90, Popularity: 60 },
      { Title: 'Film C', Length: 150, Popularity: 40 },
      { Title: 'Film D', Length: 100, Popularity: 20 },
      { Title: 'Film E', Length: 180, Popularity: 70 },
      { Title: 'Film F', Length: 110, Popularity: 50 }
    ];

    createBarChart(data);

    function createBarChart(data) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .range([height, 0]);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      x.domain(data.map(d => d.Title));
      y.domain([0, d3.max(data, d => d.Length)]);

      svg.append("g")
        .attr("class", "x-axis"
  