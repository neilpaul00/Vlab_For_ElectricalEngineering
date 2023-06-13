const voltageSlider = document.getElementById('voltageRange');
const voltageValue = document.getElementById('true-voltage-value');
const currentSlider = document.getElementById('currentRange');
const currentValue = document.getElementById('true-current-value');
const voltageRatioCheckbox = document.getElementById('pt-ratio-value');
const currentRatioCheckbox = document.getElementById('ct-ratio-value');
const addToTableButton = document.getElementById('add');
const observationTableBody = document.getElementById('observation-table-body');
const errorPercentageCell = document.getElementById('error-percentage');
const observationCounterCell = document.getElementById('observation-counter');
let observationCounter = 0;
let trueWattmeterValue = 0;
let modifiedWattmeterValue = 0;

//?To do
//Add javascript code of meter grid (3) 1 Ammeter 1 Voltmeter 1 Wattmeter

function changeImage() {
	var image = document.getElementById("firstImage");
	if (image.src.match("offpower.png")) {
	  image.src = "onpower.png";
	} else {
	  image.src = "offpower.png";
	}
}

voltageSlider.addEventListener('input', () => {
	voltageValue.textContent = voltageSlider.value;  //taking slider's value when slider is varied
});
currentSlider.addEventListener('input', () => {
	currentValue.textContent = currentSlider.value;  //taking slider's value when slider is varied
});

var slider = document.getElementById("voltageRange");
var output = document.getElementById("slider-value-voltage");
output.innerHTML = slider.value;

slider.oninput = function() {
output.innerHTML = this.value;
}

// addToTableButton.addEventListener("click", function () {
//   if (image1.src === "offpower.png") {
//     alert("Please turn on the switch to take readings.");
//   } 
// });

var slider1 = document.getElementById("currentRange");
var output1 = document.getElementById("slider-value-current");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
output1.innerHTML = this.value;
}

function calculateModifiedWattmeterValue(actualVoltage, actualCurrent) {
	let modifiedVoltage = actualVoltage / 2;   //calculating modifiedVoltage
	let modifiedCurrent = actualCurrent / 10;  //calculating modifiedCurrent
	let modifiedWattmeterValue = modifiedVoltage * modifiedCurrent*2*10;  //calculating modified power
	return modifiedWattmeterValue;  
  }
// Function to update the wattmeter box
function updateWattmeterBox(actualVoltage, actualCurrent) {
	let modifiedWattmeterValue = calculateModifiedWattmeterValue(actualVoltage, actualCurrent);  
	let wattmeterBox = document.getElementById("demo");  
	wattmeterBox.textContent = modifiedWattmeterValue.toFixed(2);
  }

// function updateErrorPercentage() {
// 	errorPercentageCell.textContent = ((trueWattmeterValue - modifiedWattmeterValue) / trueWattmeterValue * 100).toFixed(2) + "%";
//   }

addToTableButton.addEventListener('click', () => {
	if (!voltageRatioCheckbox.checked || !currentRatioCheckbox.checked) {
      alert("Please check the voltage and current transformer ratio checkboxes.");
		return;
	}
    const actualVoltage = Number(voltageSlider.value);
	const actualCurrent = Number(currentSlider.value);
	const modifiedVoltage = actualVoltage / 2;
	const modifiedCurrent = actualCurrent / 10;
	trueWattmeterValue = actualVoltage * actualCurrent;
	modifiedWattmeterValue = calculateModifiedWattmeterValue(actualVoltage, actualCurrent);
	let errorPercentage = ((trueWattmeterValue - modifiedWattmeterValue) / trueWattmeterValue) * 100;

    const row = document.createElement('tr');
    const observationCounterCell = document.createElement('td');
    observationCounter++;
    observationCounterCell.textContent = observationCounter;
    row.appendChild(observationCounterCell);
	const actualVoltageCell = document.createElement('td');
	actualVoltageCell.textContent = actualVoltage.toFixed(2);
    row.appendChild(actualVoltageCell);
    const actualCurrentCell = document.createElement('td');
    actualCurrentCell.textContent = actualCurrent.toFixed(1);
    row.appendChild(actualCurrentCell);
    const modifiedVoltageCell = document.createElement('td');
    modifiedVoltageCell.textContent = modifiedVoltage.toFixed(2);
    row.appendChild(modifiedVoltageCell);

    const modifiedCurrentCell = document.createElement('td');
    modifiedCurrentCell.textContent = modifiedCurrent.toFixed(1);
    row.appendChild(modifiedCurrentCell);

    const trueWattmeterValueCell = document.createElement('td');
    trueWattmeterValueCell.textContent = trueWattmeterValue.toFixed(2);
    row.appendChild(trueWattmeterValueCell);

    const modifiedWattmeterValueCell = document.createElement('td');
    modifiedWattmeterValueCell.textContent = modifiedWattmeterValue.toFixed(2);
    row.appendChild(modifiedWattmeterValueCell);

    const errorPercentageCell = document.createElement('td');
    errorPercentageCell.textContent = errorPercentage.toFixed(2);
    row.appendChild(errorPercentageCell);

    observationTableBody.appendChild(row);

    updateWattmeterBox(actualVoltage, actualCurrent);
});

updateWattmeterBox(document.getElementById("actual-voltage").value, document.getElementById("actual-current").value);