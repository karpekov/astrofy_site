document.addEventListener("DOMContentLoaded", function() {

const timeStampDuration = 1000;
const transitionDuration = 1100;

// let currentInterval;
let currentIndex = 0;


const minCircleSize = 10;
const maxCircleSize = 120;

var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

// Define a function to convert hex to RGBA
function hexToRGBA(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const labelColors_milan = {
    'Sleep': '#2F6397',
    'Master_Bedroom_Activity': '#3B75AF',
    'Master_Bathroom': "#4B68C9",
    'Bed_to_Toilet': "#4B68C9",
    'Guest_Bathroom': "#0570b0",

    'Kitchen_Activity': '#EF8636',
    'Dining_Rm_Activity': '#fdae61',

    'Read': '#C53A32',
    'Desk_Activity': '#de77ae',
    'Watch_TV': '#ae017e',

    'Leave_Home': '#519E3E',
    'Meditate': '#b8e186',
    'Chores': '#7fbc41',

    'Morning_Meds': '#F9DA56',
    'Eve_Meds': '#F9DA56',

    'no_activity': '#878787',
    'no_sensor_readings': '#bababa'
};

const labelPadding_milan = [4, 6, 9, 12, 14];

function formatDate(timestamp, get_time_only = false) {
  const month = timestamp.getMonth() + 1;  // getMonth() is zero-indexed, so add 1 to make it 1-indexed
  const day = timestamp.getDate();
  const hour = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  // Format numbers to ensure two digits (e.g., 05, 09)
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (get_time_only) {
      return `${formattedHour}:${formattedMinutes}`;
  }

  return `${formattedMonth}/${formattedDay} ${formattedHour}:${formattedMinutes}`;
}

d3.csv("milan_2009_12_03_5min.csv", function(d) {
  d.timestamp_round = parseTime(d.timestamp_round)
  d.label_list = JSON.parse(d.label_list.replace(/'/g, '"'))
  return d;
}).then(function(data) {

  CITY_NAME = 'Milan'
  DATE = '2009-12-03'
  min_time = formatDate(d3.min(data, d => d.timestamp_round), get_time_only=true);
  max_time = formatDate(d3.max(data, d => d.timestamp_round), get_time_only=true);

  // Set the title of the page
  d3.select('h2')
    .text(`${CITY_NAME} on ${DATE}: Sensor Readings from ${min_time} to ${max_time}`);
    //  (${formatDate(min_time)} - ${formatDate(max_time)})`);

  // Existing setup code here...
  // let currentInterval; // This will handle our autoplay interval
  // let currentTimeStep = 1; // Start from the first timestamp

  const maxTime = d3.max(data, d => +d.time);
  // Set max value for the slider
  const slider = document.getElementById("time-slider");
  slider.max = maxTime;
  slider.value = 1; // Resetting the value to the start or any specific point

  data.forEach(d => {
      d.x = +d.x;
      d.y = +d.y;
      d.value = +d.value;
      d.time = +d.time;
  });

  const margin = { top: 80, right: 50, bottom: 50, left: 80 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

  const svg = d3.select("#chartContainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("image")
    .attr("xlink:href", "milan_house_map.png")
    .attr("width", width+100)
    .attr("height", height+30)
    .attr("x", -60)
    .attr("y", -20)
    .attr("opacity", 0.5)
    .attr("preserveAspectRatio", "none");

  // Add a text element to the SVG for the timestamp
  const timestampDisplay = svg.append("text")
      .attr("x", width/2)  // Center of the SVG element
      .attr("y", -40)   // Somewhat at the top
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .text("Timestamp will appear here");

  const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);
  const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([height, 0]);

  const size = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([minCircleSize, maxCircleSize]);

  const color = d3.scaleSequential()
      .domain([1, d3.max(data, d => d.value) + 6])
      .interpolator(d3.interpolateYlOrRd);

  // Handle the Labels pane
  function initializeLabels() {
    const label_names = Object.keys(labelColors_milan);
    const labelSelection = d3.select('#labelsContainer')
        .selectAll('.label-box')
        .data(label_names)
        .enter()
        .append('div')
        .attr('class', 'label-box')
        .text(d => d)
        // Increase the padding between label box groups.
        .style('margin-bottom', function(d, i) {
            return labelPadding_milan.includes(i) ? '20px' : '5px';  // Adjust 20px for increased padding, 5px for regular padding
        })
    }

  // Function to update label highlights according to data
  function updateLabelHighlights(primary_label, secondary_labels) {
    // Reset all labels to default
    d3.select('#labelsContainer').selectAll('.label-box')
      .style('background-color', '#eee')
      .style('transform', 'scale(1)')
      .style('opacity', '0.8')
      .style('font-weight', '300')
      .style('color', '#474747');

    // Apply new highlights and transformations
    const labels = d3.select('#labelsContainer').selectAll('.label-box')
      .style('background-color', function(d) {
          const baseColor = labelColors_milan[d] || '#eeeeee';
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

  // Use the complete dataset or filter to a specific time where all sensors are present
  const initialData = data.filter(d => d.time === 2);

  // Initialize static black dots
  const staticDots = svg.append("g").attr("class", "static-dots");
  staticDots.selectAll("circle.static-dot")
      .data(initialData, d => d.sensor)
      .enter()
      .append("circle")
      .attr("class", "static-dot")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 3)  // Small fixed radius
      .style("fill", "black");

  // Initialize static text labels
  const labels = svg.selectAll("text.label")
      .data(initialData, d => d.sensor)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => x(d.x) + 10)
      .attr("y", d => y(d.y))
      .text(d => d.sensor)
      .attr("alignment-baseline", "middle")
      .style("font-size", "12px")
      .style("fill", "black");

  const timeSlider = document.getElementById("time-slider");
  const timestampValueSpan = document.getElementById("timestampValue");

  function updateChart(currentTimeStep) {
      const currentData = data.filter(d => d.time === currentTimeStep);
      // const currentTimeStamp = currentData[0].timestamp_round;
      const currentTimeStamp = currentData[0]?.timestamp_round;  // Optional chaining if data might be empty
      const currentLabel = currentData[0].label_first;
      const color = labelColors_milan[currentLabel] || 'grey';
      timestampDisplay.text(`Time: ${formatDate(currentTimeStamp)}`);

      const circles = svg.selectAll("circle:not(.static-dot)")
          .data(currentData, d => d.sensor);

      circles.enter()
          .append("circle")
          .merge(circles)
          .transition()
          .duration(transitionDuration)
          .attr("cx", d => x(d.x))
          .attr("cy", d => y(d.y))
          .attr("r", d => d.value === 0 ? 3 : size(d.value))
          .style("fill", color)
          // .style("fill", d => d.value === 0 ? 'black' : 'lightSalmon')
          .style('opacity', 0.5);

      circles.exit()
        .transition()
        .ease(d3.easeLinear)
        .duration(transitionDuration)

      // timestampValueSpan.textContent = currentTimeStep;
      slider_display_value = `${currentTimeStep} / ${maxTime} | ${formatDate(currentTimeStamp, get_time_only=true)}`
      timestampValueSpan.textContent = slider_display_value

      // Update the labels chart:
      primary_label = currentData[0].label_first;
      secondary_label = currentData[0].label_list;
      secondary_label = secondary_label.filter(element => element !== primary_label)
      updateLabelHighlights(primary_label, secondary_label);
  }

  function initializeChart() {
      updateChart(1); // Initial timestamp
  }


  let currentInterval = null;  // This will store our interval ID
  let currentTimeStep = 1;     // This keeps track of the current time step


  function autoplay() {
    clearInterval(currentInterval);  // Ensure no multiple intervals
    currentInterval = setInterval(() => {
        const maxTime = +document.getElementById("time-slider").max;
        let currentTimeStep = +document.getElementById("time-slider").value;

        currentTimeStep++;  // Increment the time step
        if (currentTimeStep > maxTime) {
            currentTimeStep = 1;  // Loop back to the start or handle as needed
        }

        document.getElementById("time-slider").value = currentTimeStep;  // Update slider position
        updateChart(currentTimeStep);  // Update the chart to reflect new data point
    }, timeStampDuration);
  }


  // Play functionality
  function play() {
      if (!currentInterval) { // Avoid multiple intervals running at the same time
          currentInterval = setInterval(() => {
              stepForward(); // Use the stepForward function to go to the next time
          }, timeStampDuration);
      }
  }

  function pause() {
      clearInterval(currentInterval);
      currentInterval = null;
      console.log("Autoplay paused.");
  }

  function stepForward() {
      const maxTime = +document.getElementById("time-slider").max;
      let currentTimeStep = +document.getElementById("time-slider").value;

      currentTimeStep++;
      if (currentTimeStep > maxTime) {
          currentTimeStep = 1;  // Or handle as needed, perhaps stop at the last value
      }

      document.getElementById("time-slider").value = currentTimeStep;
      updateChart(currentTimeStep);
      console.log("Moved to timestamp: ", currentTimeStep);
  }

  function stepBack() {
      const minTime = 1; // Assuming time starts at 1, adjust according to your data's start
      let currentTimeStep = +document.getElementById("time-slider").value;

      currentTimeStep--;
      if (currentTimeStep < minTime) {
          currentTimeStep = +document.getElementById("time-slider").max; // Optionally loop to the end
      }
      document.getElementById("time-slider").value = currentTimeStep;
      updateChart(currentTimeStep);
  }

  // Initialize chart, labels, and default autoplay
  initializeChart();
  initializeLabels();
  play(); // Start autoplay on load

  // Attach event listeners to buttons
  document.getElementById("stepButton").addEventListener("click", stepForward);
  document.getElementById("stepBackButton").addEventListener("click", stepBack);
  document.getElementById("pauseButton").addEventListener("click", function() {
      this.classList.add('active'); // Add 'active' class to show the button is pressed
      document.getElementById("playButton").classList.remove('active'); // Ensure play button is not active
      pause(); // Call the pause function
  });
  document.getElementById("playButton").addEventListener("click", function() {
      document.getElementById("pauseButton").classList.remove('active'); // Remove 'active' class from pause button
      this.classList.add('active'); // Optional: Indicate that play is currently active
      play(); // Call the play function
  });

  initializeChart();
  initializeLabels();
  autoplay();
}).catch(function(error) {
    console.error('Error loading the CSV file: ' + error.message);
});
});
