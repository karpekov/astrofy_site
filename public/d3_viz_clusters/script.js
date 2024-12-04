const config = {

  csv_folder: "data",
  house_map_path: "house_maps",

  timeStampDuration: 600,
  transitionDuration: 600,
  minCircleSize: 10,
  maxCircleSize: 40,
  margin: { top: 80, right: 50, bottom: 50, left: 50 },
  width: 1000,
  height: 1000,

  area_sensor_map: {
    'aruba': ["M007", "M019", "M020", "M024", "M027"],
    'milan': ["M003", "M023", "M024", "M025", "M026", "M027", "M028"],
    'cairo': ["M001", "M004", "M005", "M023", "M024", "M025", "M026"]
  }
};

const csvFiles = [
  "cluster_0_ex0.csv",
  "cluster_0_ex1.csv",
  "cluster_0_ex2.csv",
  "cluster_0_ex3.csv",
  "cluster_0_ex4.csv",
  "cluster_1_ex0.csv",
  "cluster_1_ex1.csv",
  "cluster_1_ex2.csv",
  "cluster_1_ex3.csv",
  "cluster_1_ex4.csv",
  "cluster_2_ex0.csv",
  "cluster_2_ex1.csv",
  "cluster_2_ex2.csv",
  "cluster_2_ex3.csv",
  "cluster_2_ex4.csv",
  "cluster_3_ex0.csv",
  "cluster_3_ex1.csv",
  "cluster_3_ex2.csv",
  "cluster_3_ex3.csv",
  "cluster_3_ex4.csv",
  "cluster_4_ex0.csv",
  "cluster_4_ex1.csv",
  "cluster_4_ex2.csv",
  "cluster_4_ex3.csv",
  "cluster_4_ex4.csv",
  "cluster_5_ex0.csv",
  "cluster_5_ex1.csv",
  "cluster_5_ex2.csv",
  "cluster_5_ex3.csv",
  "cluster_5_ex4.csv",
  "cluster_6_ex0.csv",
  "cluster_6_ex1.csv",
  "cluster_6_ex2.csv",
  "cluster_6_ex3.csv",
  "cluster_6_ex4.csv",
  "cluster_7_ex0.csv",
  "cluster_7_ex1.csv",
  "cluster_7_ex2.csv",
  "cluster_7_ex3.csv",
  "cluster_7_ex4.csv",
  "cluster_8_ex0.csv",
  "cluster_8_ex1.csv",
  "cluster_8_ex2.csv",
  "cluster_8_ex3.csv",
  "cluster_8_ex4.csv",
  "cluster_9_ex0.csv",
  "cluster_9_ex1.csv",
  "cluster_9_ex2.csv",
  "cluster_9_ex3.csv",
  "cluster_9_ex4.csv",
  "cluster_10_ex0.csv",
  "cluster_10_ex1.csv",
  "cluster_10_ex2.csv",
  "cluster_10_ex3.csv",
  "cluster_10_ex4.csv",
  "cluster_11_ex0.csv",
  "cluster_11_ex1.csv",
  "cluster_11_ex2.csv",
  "cluster_11_ex3.csv",
  "cluster_11_ex4.csv",
  "cluster_12_ex0.csv",
  "cluster_12_ex1.csv",
  "cluster_12_ex2.csv",
  "cluster_12_ex3.csv",
  "cluster_12_ex4.csv",
  "cluster_13_ex0.csv",
  "cluster_13_ex1.csv",
  "cluster_13_ex2.csv",
  "cluster_13_ex3.csv",
  "cluster_13_ex4.csv",
  "cluster_14_ex0.csv",
  "cluster_14_ex1.csv",
  "cluster_14_ex2.csv",
  "cluster_14_ex3.csv",
  "cluster_14_ex4.csv",
  "cluster_15_ex0.csv",
  "cluster_15_ex1.csv",
  "cluster_15_ex2.csv",
  "cluster_15_ex3.csv",
  "cluster_15_ex4.csv",
  "cluster_16_ex0.csv",
  "cluster_16_ex1.csv",
  "cluster_16_ex2.csv",
  "cluster_16_ex3.csv",
  "cluster_16_ex4.csv",
  "cluster_17_ex0.csv",
  "cluster_17_ex1.csv",
  "cluster_17_ex2.csv",
  "cluster_17_ex3.csv",
  "cluster_17_ex4.csv",
  "cluster_18_ex0.csv",
  "cluster_18_ex1.csv",
  "cluster_18_ex2.csv",
  "cluster_18_ex3.csv",
  "cluster_18_ex4.csv",
  "cluster_19_ex0.csv",
  "cluster_19_ex1.csv",
  "cluster_19_ex2.csv",
  "cluster_19_ex3.csv",
  "cluster_19_ex4.csv",
];

const encoded_csv_files = [
  "a0.csv",
  "a1.csv",
  "a2.csv",
  "a3.csv",
  "a4.csv",
  "a5.csv",
  "a6.csv",
  "a7.csv",
  "a8.csv",
  "a9.csv",
  "a10.csv",
  "a11.csv",
  "a12.csv",
  "a13.csv",
  "a14.csv",
  "a15.csv",
  "a16.csv",
  "a17.csv",
  "a18.csv",
  "a19.csv",
  "b0.csv",
  "b1.csv",
  "b2.csv",
  "b3.csv",
  "b4.csv",
  "b5.csv",
  "b6.csv",
  "b7.csv",
  "b8.csv",
  "b9.csv",
  "b10.csv",
  "b11.csv",
  "b12.csv",
  "b13.csv",
  "b14.csv",
  "b15.csv",
  "b16.csv",
  "b17.csv",
  "b18.csv",
  "b19.csv",
  "c0.csv",
  "c1.csv",
  "c2.csv",
  "c3.csv",
  "c4.csv",
  "c5.csv",
  "c6.csv",
  "c7.csv",
  "c8.csv",
  "c9.csv",
  "c10.csv",
  "c11.csv",
  "c12.csv",
  "c13.csv",
  "c14.csv",
  "c15.csv",
  "c16.csv",
  "c17.csv",
  "c18.csv",
  "c19.csv",
  "d0.csv",
  "d1.csv",
  "d2.csv",
  "d3.csv",
  "d4.csv",
  "d5.csv",
  "d6.csv",
  "d7.csv",
  "d8.csv",
  "d9.csv",
  "d10.csv",
  "d11.csv",
  "d12.csv",
  "d13.csv",
  "d14.csv",
  "d15.csv",
  "d16.csv",
  "d17.csv",
  "d18.csv",
  "d19.csv",
  "e0.csv",
  "e1.csv",
  "e2.csv",
  "e3.csv",
  "e4.csv",
  "e5.csv",
  "e6.csv",
  "e7.csv",
  "e8.csv",
  "e9.csv",
  "e10.csv",
  "e11.csv",
  "e12.csv",
  "e13.csv",
  "e14.csv",
  "e15.csv",
  "e16.csv",
  "e17.csv",
  "e18.csv",
  "e19.csv",
];

let currentControl = null;

document.addEventListener("DOMContentLoaded", function() {
    const showButton = document.getElementById("show-button");
    const encodingSelect = document.getElementById("encoding-select");
    const citySelect = document.getElementById("city-select");
    const csvSelect = document.getElementById("csv-select");

    const encodings = ['original', 'encoded'];
    encodings.forEach(encoding => {
        const option = document.createElement('option');
        option.value = encoding;
        option.textContent = encoding;
        encodingSelect.appendChild(option);
    });

    const cities = ['aruba', 'milan', 'cairo'];
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    // Populate the dropdown based on the selected encoding
    encodingSelect.addEventListener("change", function() {
      const selectedEncoding = encodingSelect.value;
      csvSelect.innerHTML = ""; // Clear existing options

      const files = selectedEncoding === "original" ? csvFiles : encoded_csv_files;
      files.forEach(file => {
        const option = document.createElement('option');
        option.value = `${file}`;
        option.textContent = file;
        csvSelect.appendChild(option);
      });
    });

    // Trigger change event to populate initially
    encodingSelect.dispatchEvent(new Event("change"));

    // showButton.addEventListener("click", loadVisualization);
    csvSelect.addEventListener("change", loadVisualization);
});

async function loadVisualization() {
    const encodingSelect = document.getElementById("encoding-select");
    const csvSelect = document.getElementById("csv-select");
    const citySelect = document.getElementById("city-select");

    const selectedEncoding = encodingSelect.value;
    const selectedCity = citySelect.value;
    const selectedCsvPath = csvSelect.value;

    console.log("selectedCsvPath:", selectedCsvPath);

    config.city = selectedCity;

    if (selectedCsvPath) {
        // config.csv_path = selectedCsvPath;
        try {
            // Reset the visualization
            resetVisualization();

            const data = await loadData(selectedEncoding, selectedCity, selectedCsvPath);
            await updateConfigHeight(selectedCity);
            main(data, selectedCity);
        } catch (error) {
            console.error('Error loading the CSV file:', error.message);
        }
    } else {
        alert("Please select a CSV file first.");
    }
}

function resetVisualization() {
    // Stop any ongoing animation
    if (currentControl && currentControl.pause) {
        currentControl.pause();
    }

    // Clear the existing chart
    d3.select("#chartContainer").selectAll("*").remove();

    // Reset the slider
    const slider = document.getElementById("time-slider");
    slider.value = 1;

    // Clear timestamp display
    document.getElementById("timestampValue").textContent = "";

    // Reset title and subtitle
    d3.select('h2').text("");
}

async function main(data, selectedCity) {
    const titleText = generateTitle(data);
    d3.select('h2').text(titleText);
    const maxTime = setupSlider(data);
    const svg = setupSVG();
    addHouseMap(svg, selectedCity);
    const timestampDisplay = setupTimestampDisplay(svg);
    const { x, y, size } = getScales(data);
    drawFixedCircles(svg, data, x, y);

    initializeChart(svg, data, x, y, size, timestampDisplay, maxTime);

    currentControl = setupControls(svg, data, x, y, size, timestampDisplay);
    attachEventListeners(currentControl);

    // Repeat initialization
    initializeChart(svg, data, x, y, size, timestampDisplay, maxTime);
}

async function updateConfigHeight(city) {
  return new Promise((resolve, reject) => {
    const imagePath = `${config.house_map_path}/${city}.png`;
    const img = new Image();

    img.src = imagePath;

    img.onload = function() {
      const aspectRatio = img.width / img.height;
      const newHeight = config.width / aspectRatio;
      config.height = newHeight;
      resolve();

      config.original_img_height = img.height;
      config.original_img_width = img.width;

      console.log("Original img height:", config.original_img_height);
      console.log("Original img width:", config.original_img_width);
    };

    img.onerror = function() {
      reject(new Error('Failed to load image'));
    };
  });
}

async function loadData(encoding, city, fileName) {

  // Append city name to the filepath string
  const filePath = `${config.csv_folder}/${city}/${encoding}_samples/${fileName}`;
  console.log("Loading data from:", filePath);

  const data = await d3.csv(filePath, function(d) {
    d.timestamp_round = parseTime(d.datetime);
    d.activity_list = JSON.parse(d.activity_list.replace(/'/g, '"'));
    d.label_list = JSON.parse(d.label_list.replace(/'/g, '"'));
    d.x = +d.x;
    d.y = +d.y;
    d.value = +d.value;
    d.original_idx = +d.original_idx;
    d.time = +d.time;
    return d;
  });
  return data;
}

function generateTitle(data) {
  const min_time = formatDate(d3.min(data, d => d.timestamp_round), true);
  const max_time = formatDate(d3.max(data, d => d.timestamp_round), true);

  const city = config.city;
  const date = new Date(data[0].date).toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format

  const title = `${city} on ${date}: Sensor Readings from ${min_time} to ${max_time}`;
  return title;
}

function generateSubtitle() {
  const pathParts = config.csv_path.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const subtitle = fileName.replace('.csv', '');
  return subtitle;
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

async function addHouseMap(svg, city) {
  const img = new Image();
  img_path = `${config.house_map_path}/${city}.png`;
  img.src = img_path;

  img.onload = function() {
    const aspectRatio = img.width / img.height;
    const newHeight = config.width / aspectRatio;
    config.height = newHeight;

    console.log("New height:", newHeight);
    console.log("New height:", config.height);
    console.log("New width:", config.width);

    svg.attr("height", config.height + config.margin.top + config.margin.bottom);

    svg.append("image")
      .attr("xlink:href", img_path)
      .attr("width", config.width)
      .attr("height", config.height)
      .attr("x", 0)
      .attr("y", 0)
      .attr("opacity", 0.9)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .lower()
      ;
  };

  return svg;
}

function getScales(data) {
  const x = d3.scaleLinear()
    .domain([0, config.original_img_width])
    .range([0, config.width]);

  const y = d3.scaleLinear()
    .domain([0, config.original_img_height])
    .range([config.height, 0]);

  console.log("Width and height from getScales");
  console.log(config.width, config.height);

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
  const staticDots = svg.append("g").attr("class", "static-dots").raise();
  staticDots.selectAll("circle.static-dot")
    .data(locationData, d => d.sensor)
    .enter()
    .append("circle")
    .attr("class", "static-dot")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", 5)  // Small fixed radius
    // .style("fill", "green")
    .style("fill", d => d.sensor.startsWith('M') ? '#519E3E' : 'black')
    ;


  // Initialize static text labels
  const labels = svg.append("g").attr("class", "labels").raise();
  labels.selectAll("text.label")
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

function updateCircles(svg, currentData, x, y, size) {

  const circles = svg.selectAll("circle:not(.static-dot)")
    .data(currentData, d => d.sensor);

  // Enter new elements
  const enterCircles = circles.enter()
    .append("circle")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", 0)  // Start from a point
    .style("fill", d => d.sensor.startsWith('M') ? '#519E3E' : '#C8552C')
    .style('opacity', 0)
    .raise();  // Draw these circles on top of the svg

  // Transition for entering and updating circles
  enterCircles.merge(circles)
    .transition()
    // .ease(d3.easeCubicInOut)
    .ease(d3.easeLinear)
    .duration(config.transitionDuration / 2)  // Faster transition for the pulsate effect
    .attr("r", d => d.value === 0 ? 3 : size(d.value) * 0.8)  // Temporarily reduce size
    .style('opacity', 0.8)  // Slightly reduce opacity
    .transition()  // Another transition to go back to normal
    .ease(d3.easeCubicInOut)
    .duration(config.transitionDuration)
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", d => config.area_sensor_map[config.city].includes(d.sensor) ? size(d.value) * 3 : size(d.value))
    ;

  // Exit old elements not present in new data
  circles.exit()
    .transition()
    .ease(d3.easeCubicOut)
    .duration(config.transitionDuration * 40)
    .attr("r", 0)  // Shrink to a point
    .style('opacity', 0)  // Fade out
    .remove();  // Remove after transition
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
  // // Update primary and secondary labels.
  // updateLabelHighlights(currentData);
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

    // if (currentTimeStep > maxTime) currentTimeStep = minTime;
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

  function restart() {
    document.getElementById("time-slider").value = 1;
    updateChart(svg, data, 1, x, y, size, timestampDisplay, maxTime);
    control.play();
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
    restart: restart,
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
  document.getElementById("replayButton").addEventListener("click", function() {
    document.getElementById("pauseButton").classList.remove('active');
    document.getElementById("playButton").classList.add('active');
    control.restart();
  });

  control.play(); // Start autoplay on load
}

// Helper functions
function parseTime(dateString) {
  const parser = d3.timeParse("%Y-%m-%d %H:%M:%S.%f");
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