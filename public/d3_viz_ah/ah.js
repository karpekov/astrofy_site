const config = {
  csv_path: "aware_home__5min.csv",
  city_name: 'Aware Home',
  date: '2024-02-29',
  house_map_path: "floorplan2_labeled.png",

  timeStampDuration: 1000,
  transitionDuration: 1100,
  minCircleSize: 20,
  maxCircleSize: 100,
  margin: { top: 80, right: 50, bottom: 50, left: 80 },
  width: 800,
  height: 800,
  labelColors_milan: {
    'Sleep': '#2F6397',
    'Bed_To_Toilet': "#4B68C9",
    'Use_Bathroom': "#4B68C9",

    'Eating': '#EF8636',
    'Meal_Preparation': '#fdae61',

    'Work': '#C53A32',
    'Desk_Activity': '#de77ae',
    'Relax': '#ae017e',

    'Leave_Home': '#519E3E',
    'Enter_Home': '#b8e186',

    'no_activity': '#878787',
    'no_sensor_readings': '#bababa'
  },
  labelPadding_milan: [2, 4, 7, 9]

  // labelColors_milan: {
  //   'Sleep': '#2F6397',
  //   'Master_Bedroom_Activity': '#3B75AF',
  //   'Master_Bathroom': "#4B68C9",
  //   'Bed_to_Toilet': "#4B68C9",
  //   'Guest_Bathroom': "#0570b0",

  //   'Kitchen_Activity': '#EF8636',
  //   'Dining_Rm_Activity': '#fdae61',

  //   'Read': '#C53A32',
  //   'Desk_Activity': '#de77ae',
  //   'Watch_TV': '#ae017e',

  //   'Leave_Home': '#519E3E',
  //   'Meditate': '#b8e186',
  //   'Chores': '#7fbc41',

  //   'Morning_Meds': '#F9DA56',
  //   'Eve_Meds': '#F9DA56',

  //   'no_activity': '#878787',
  //   'no_sensor_readings': '#bababa'
  // },
  // labelPadding_milan: [4, 6, 9, 12, 14]
};

document.addEventListener("DOMContentLoaded", async function() {
  try {
    const data = await loadData(config.csv_path);
    main(data);
  } catch (error) {
    console.error('Error loading the CSV file:', error.message);
  }
});

function main(data) {
  const titleText = generateTitle(data);
  d3.select('h2').text(titleText);
  const maxTime = setupSlider(data);
  const svg = setupSVG();
  addHouseMap(svg, config.mapPath);
  const timestampDisplay = setupTimestampDisplay(svg);
  const { x, y, size } = getScales(data);
  drawFixedCircles(svg, data, x, y);

  initializeChart(svg, data, x, y, size, timestampDisplay, maxTime);
  initializeLabels();

  const control = setupControls(svg, data, x, y, size, timestampDisplay);
  attachEventListeners(control);

  // Repeat initialization, otherwise the first timestamp circles
  // are persisted throughout the session.
  initializeChart(svg, data, x, y, size, timestampDisplay, maxTime);
}

async function loadData(filePath) {
  const data = await d3.csv(filePath, function(d) {
    d.timestamp_round = parseTime(d.timestamp_round);
    d.label_list = JSON.parse(d.label_list.replace(/'/g, '"'));
    d.x = +d.x;
    d.y = +d.y;
    d.value = +d.value;
    d.time = +d.time;
    return d;
  });
  return data;
}

function generateTitle(data) {
  min_time = formatDate(d3.min(data, d => d.timestamp_round), get_time_only=true);
  max_time = formatDate(d3.max(data, d => d.timestamp_round), get_time_only=true);

  city = config.city_name;
  date = config.date;

  title = `${city} on ${date}: Sensor Readings from ${min_time} to ${max_time}`;
  return title;
}

function setupSVG() {
  let svg = d3.select("#chartContainer").select("svg");
  if (svg.empty()) {
    svg = d3.select("#chartContainer")
      .append("svg")
      .attr("width", config.width + config.margin.left + config.margin.right)
      .attr("height", config.height + config.margin.top + config.margin.bottom)
      .append("g")
      .attr("transform", `translate(${config.margin.left}, ${config.margin.top})`);
  }
  return svg;
}

function setupSlider(data) {
  const maxTime = d3.max(data, d => +d.time);
  const slider = document.getElementById("time-slider");
  slider.max = maxTime;
  slider.value = 1;

  return maxTime;
}

function setupTimestampDisplay(svg) {
  const timestampDisplay = svg.append("text")
    .attr("x", config.width/2)  // Center of the SVG element
    .attr("y", -40)   // Somewhat at the top
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .text("Timestamp will appear here");

  return timestampDisplay;
}

function addHouseMap(svg) {
  svg.append("image")
    .attr("xlink:href", config.house_map_path)
    .attr("width", config.width+100)
    .attr("height", config.height+150)
    .attr("x", -40)
    .attr("y", -50)
    .attr("opacity", 0.5)
    .attr("preserveAspectRatio", "none");

  return svg;
}

function getScales(data) {
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x))
    .range([0, config.width]);

  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .range([config.height, 0]);

  const size = d3.scaleSqrt()
    .domain([1, d3.max(data, d => d.value)])
    .range([config.minCircleSize, config.maxCircleSize]);

  return { x, y, size };
}

function getUniqueSensorLocations(data) {
  groupedData = d3.group(data, d => d.sensor);
  rollupMap = d3.rollup(data,
    ([d]) => ({ x: d.x, y: d.y }),
    d => d.sensor
  );

  flatData = Array.from(rollupMap, ([sensor, value]) => ({
    sensor: sensor,
    x: value.x,
    y: value.y
  }));

  return flatData;
}

// Function to draw the all sensors and their values on the map as small black dots.
function drawFixedCircles(svg, data, x, y) {
  // Get unique sensor locations: [{sensor, x, y}, ...]
  locationData = getUniqueSensorLocations(data);
  // Initialize static black dots
  const staticDots = svg.append("g").attr("class", "static-dots");
  staticDots.selectAll("circle.static-dot")
    .data(locationData, d => d.sensor)
    .enter()
    .append("circle")
    .attr("class", "static-dot")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", 3)  // Small fixed radius
    .style("fill", "black");

  // Initialize static text labels
  const labels = svg.selectAll("text.label")
    .data(locationData, d => d.sensor)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.x) + 10)
    .attr("y", d => y(d.y))
    .text(d => d.sensor)
    .attr("alignment-baseline", "middle")
    .style("font-size", "12px")
    .style("fill", "black");
}

// Handle the Labels pane
function initializeLabels() {
  const label_names = Object.keys(config.labelColors_milan);
  d3.select('#labelsContainer')
    .selectAll('.label-box')
    .data(label_names)
    .enter()
    .append('div')
    .attr('class', 'label-box')
    .text(d => d)
    // Increase the padding between label box groups.
    .style('margin-bottom', function(d, i) {
        return config.labelPadding_milan.includes(i) ? '20px' : '5px';
    })
  }

// Function to update label highlights according to data
function updateLabelHighlights(currentData) {
  primary_label = currentData[0].label_first;
  secondary_labels = currentData[0].label_list;
  secondary_labels = secondary_labels.filter(element => element !== primary_label)
  // Reset all labels to default
  d3.select('#labelsContainer').selectAll('.label-box')
    .style('background-color', '#eee')
    .style('transform', 'scale(1)')
    .style('opacity', '0.8')
    .style('font-weight', '300')
    .style('color', '#474747');

  // Apply new highlights and transformations
  d3.select('#labelsContainer').selectAll('.label-box')
    .style('background-color', function(d) {
      const baseColor = config.labelColors_milan[d] || '#eeeeee';
      if (d === primary_label) {
          return hexToRGBA(baseColor, 1);
      } else if (secondary_labels.includes(d)) {
          return hexToRGBA(baseColor, 0.6);
      }
      return '#eee'; // Default color
    })
    .style('transform', function(d) {
      return d === primary_label ? 'scale(1.1)' : 'scale(1)';
    })
    .style('font-weight', function(d) {
      return d === primary_label ? '600' : '300';
    })
    .style('color', function(d) { // Conditional color setting
      return d === primary_label ? 'white' : '#474747'; // Primary label in black, others in grey
    })
    .style('opacity', function(d) {
      return secondary_labels.includes(d) ? '0.8' : '1';
    });
}

function updateCircles(svg, currentData, x, y, size) {
  const currentLabel = currentData[0].label_first;
  const color = config.labelColors_milan[currentLabel] || 'grey';

  const circles = svg.selectAll("circle:not(.static-dot)")
    .data(currentData, d => d.sensor);

  // Initiate the circles at the coordiantes first.
  circles.enter()
    .append("circle")
    .merge(circles)
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))

  // Add transitions to the new sizes.
  circles.enter()
    .append("circle")
    .merge(circles)
    .transition()
    .duration(config.transitionDuration)
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", d => d.value === 0 ? 3 : size(d.value))
    .style("fill", color)
    // .style("fill", d => d.value === 0 ? 'black' : 'lightSalmon')
    .style('opacity', 0.5);

  circles.exit()
  .transition()
  .ease(d3.easeLinear)
  .duration(config.transitionDuration)
}

function updateCounterText(currentData, timestampDisplay) {
  const currentTimeStamp = currentData[0]?.timestamp_round;
  total_sensor_readings = d3.sum(currentData, d => d.value)
  timestampDisplay.text(`Time: ${formatDate(currentTimeStamp)} | Total Sensor Readings: ${total_sensor_readings}`);

}

function updateSliderText(currentData, currentTimeStep, maxTime) {
  const timestampValueSpan = document.getElementById("timestampValue");
  const currentTimeStamp = currentData[0]?.timestamp_round;
  slider_display_value = `${currentTimeStep} / ${maxTime} | ${formatDate(currentTimeStamp, get_time_only=true)}`
  timestampValueSpan.textContent = slider_display_value

}

function updateChart(svg, data, currentTimeStep, x, y, size, timestampDisplay, maxTime) {
  // Filter the data to only include the current time step.
  const currentData = data.filter(d => d.time === currentTimeStep);
  // Update circle sizes and colors.
  updateCircles(svg, currentData, x, y, size);
  // Update primary and secondary labels.
  updateLabelHighlights(currentData);
  // Update the timestamp and sensor readings counter.
  updateCounterText(currentData, timestampDisplay);
  // Update the slider text.
  updateSliderText(currentData, currentTimeStep, maxTime);
}

function initializeChart(svg, data, x, y, size, timestampDisplay, maxTime) {
  updateChart(svg, data, 1, x, y, size, timestampDisplay, maxTime); // Initial timestamp
}

function setupControls(svg, data, x, y, size, timestampDisplay) {
  let currentInterval = null;
  // const { x, y, size } = scales;

  function moveStep(step) {
    let currentTimeStep = +document.getElementById("time-slider").value;
    currentTimeStep += step;
    const maxTime = +document.getElementById("time-slider").max;
    const minTime = 1;

    if (currentTimeStep > maxTime) currentTimeStep = minTime;
    if (currentTimeStep < minTime) currentTimeStep = maxTime;

    document.getElementById("time-slider").value = currentTimeStep;
    updateChart(svg, data, currentTimeStep, x, y, size, timestampDisplay, maxTime);
    console.log("Moved to timestamp:", currentTimeStep);
  }

  function stepForward() {
    moveStep(1);
  }

  function stepBack() {
    moveStep(-1);
  }

  return {
    play: () => {
        if (!currentInterval) {
            currentInterval = setInterval(stepForward, config.timeStampDuration);
        }
    },
    pause: () => {
        clearInterval(currentInterval);
        currentInterval = null;
        console.log("Autoplay paused.");
    },
    stepForward: stepForward,
    stepBack: stepBack,
    currentInterval
  };
}

function attachEventListeners(control) {
  document.getElementById("stepButton").addEventListener("click", control.stepForward);
  document.getElementById("stepBackButton").addEventListener("click", control.stepBack);
  document.getElementById("pauseButton").addEventListener("click", function() {
    this.classList.add('active');
    document.getElementById("playButton").classList.remove('active');
    control.pause();
  });
  document.getElementById("playButton").addEventListener("click", function() {
    document.getElementById("pauseButton").classList.remove('active');
    this.classList.add('active');
    control.play();
  });

  control.play(); // Start autoplay on load
}

// Helper functions
function parseTime(dateString) {
  const parser = d3.timeParse("%Y-%m-%d %H:%M:%S");
  return parser(dateString);
}

// Define a function to convert hex to RGBA, which allows us to set opacity.
function hexToRGBA(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatDate(timestamp, get_time_only = false) {
  const month = timestamp.getMonth() + 1;  // getMonth() is zero-indexed, so add 1 to make it 1-indexed
  const day = timestamp.getDate();
  const hour = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  // Format numbers to ensure two digits (e.g., 05, 09)
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (get_time_only) {
    return `${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMonth}/${formattedDay} ${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
}