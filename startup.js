function getMatrixAlert() {
  var fourthCells = document.querySelectorAll('table tr td:nth-child(4)');
  console.log(fourthCells);
  // Call the function with the querySelectorAll response
  var timeStatsInHours = calculateTimeStatsInHours(fourthCells);
  console.log(timeStatsInHours);

  var analysis_message = `Total Days: ${timeStatsInHours.numberOfDays} <br> Total Hours: ${timeStatsInHours.sumInHours}:${timeStatsInHours.sumMinutesRemainder} <br>  Average: ${timeStatsInHours.averageInHours}:${timeStatsInHours.averageMinutesRemainder} <br> Remaining/Extra: ${timeStatsInHours.remainingOrExtraTime}` ;
  if (!document.querySelector('.hours-div')){
    createAnalysisDiv();
  }
  document.querySelector('.hours-div').querySelector('span').innerHTML =analysis_message;

}


function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


function calculateTimeStatsInHours(fourthCells) {
    // Initialize variables to store the sum, count, and average
      let sumInMinutes = 0;
      const firstCells = document.querySelectorAll('table tr td:nth-child(1)');
      // Get the current date
      const today = new Date();

      // Format and display today's date
      const formattedDate = formatDate(today);

      if ((formattedDate == firstCells[firstCells.length-2].textContent.trim() && document.querySelector('#today_switch') && document.querySelector('#today_switch').checked)|| (formattedDate != firstCells[firstCells.length-2].textContent.trim())){
        var numberOfDays = fourthCells.length - 1; // Include Today
      }
      else{
        var numberOfDays = fourthCells.length - 2; // Exclude Today
      }
    
      // Loop through the querySelector response (excluding the last row)
      for (let i = 0; i < numberOfDays; i++) {
        const cell = fourthCells[i];
        // Extract time value from the cell element
        const timeValue = cell.textContent.trim();
    
        // Convert time value to minutes and add to sum
        const [hours, minutes] = timeValue.split(':');
        sumInMinutes += parseInt(hours, 10) * 60 + parseInt(minutes, 10);
      }
    
      // Calculate the average in minutes
      const averageInMinutes = sumInMinutes / numberOfDays;
      const idealDailyExpectedMinutes = 8 * 60;
    
      // Convert sum and average back to hours and minutes
      const sumInHours = Math.floor(sumInMinutes / 60);
      const sumMinutesRemainder = sumInMinutes % 60;
    
      const averageInHours = Math.floor(averageInMinutes / 60);
      const averageMinutesRemainder = Math.floor(averageInMinutes % 60);
      const idealTotalMinutes = numberOfDays *  idealDailyExpectedMinutes;
      const offsetMinutes = sumInMinutes - idealTotalMinutes;
      if (offsetMinutes>=0){
        var remainingOrExtraTime = `${Math.floor(offsetMinutes/60)}:${offsetMinutes%60}`;
      }
      else{
        var remainingOrExtraTime = `-${Math.floor(offsetMinutes*-1/60)}:${offsetMinutes*-1%60}`;
      }
    
      return {
        sumInHours,
        sumMinutesRemainder,
        numberOfDays,
        averageInHours,
        averageMinutesRemainder,
        remainingOrExtraTime
      };
  }

function createAnalysisDiv()
{
    var newDiv = document.createElement('div');
    newDiv.className = 'hours-div'; // Add a class for styling if needed

    // Create a span element
    var newSpan = document.createElement('span');

    newSpan.textContent = ''

    // Append the span to the div
    newDiv.appendChild(newSpan);

    // Find the element with tag name "app-page-header"
    var appPageHeader = document.querySelector('app-page-header');

    const newDivCSS = `
    display: flex;
    justify-content: space-between;
    `;
    newDiv.style.cssText = newDivCSS;
    // Append the new div to the "app-page-header" element
    appPageHeader.appendChild(newDiv)

    const left_div = document.createElement('div');
    left_div.classList.add('left-div')
    left_div.textContent = 'Include Today '
    // Create the label element
    const label = document.createElement('label');
    label.classList.add('today_switch');
    // Create the input element
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id','today_switch')

    // Create the span element
    const span = document.createElement('span');
    span.classList.add('slider', 'round');

    // Append the input and span elements to the label
    label.appendChild(input);
    label.appendChild(span);
    left_div.appendChild(label)
    // Find the element with class name "hours-div"
    const hoursDiv = document.querySelector('.hours-div');

    // Append the label to the "hours-div" element
    if (hoursDiv) {
      hoursDiv.appendChild(left_div);
    } else {
      console.error('Element with class name "hours-div" not found.');
    }
    document.getElementById('today_switch').addEventListener('click',getMatrixAlert)
};

// Apply CSS
var ontimeExtentionCSS = `
/* The today_switch - the box around the slider */
.today_switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

/* Hide default HTML checkbox */
.today_switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
`
if (!document.querySelector('.ontime-analysis-css')){
  var style = document.createElement( "style" );
  style.className = 'ontime-analysis-css'
  style.textContent = ontimeExtentionCSS;
  document.getElementsByTagName( "head" )[0].appendChild( style );
}