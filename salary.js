const provinces = ["Alberta", "BC", "Saskatchewan", "Manitoba", "Ontario"];

const federal = [
  [50197, 0.15],
  [50195, 0.205],
  [55233, 0.26],
  [66083, 0.29],
];

const federalMax = 0.33;

const Alberta = [
  [131220, 0.1],
  [26344, 0.12],
  [52488, 0.13],
  [104976, 0.14],
];

const albertaMax = 0.15;

const BC = [
  [43070, 0.0506],
  [43071, 0.077],
  [12760, 0.105],
  [21193, 0.1229],
  [42738, 0.147],
  [64259, 0.168],
];

const BCMax = 0.205;

const Saskatchewan = [
  [45677, 0.105],
  [39152, 0.125],
];

const SaskatchewanMax = 0.145;

const Manitoba = [
  [33723, 0.108],
  [39162, 0.1275],
];

const ManitobaMax = 0.174;

const Ontario = [
  [45142, 0.0505],
  [45143, 0.0915],
  [59712, 0.1116],
  [70000, 12.16],
];

const OntarioMax = 0.1316;

let provinceSelector = "BC";
let selectedProvince = "BC";
let provinceMax = "";
let wageType = "salaryWage";

//General Functions//
function maxProvinceSelection(selectedProvince) {
  let maxProvince = "";

  switch (selectedProvince) {
    case "Alberta":
      maxProvince = albertaMax;
      break;
    case "BC":
      maxProvince = BCMax;
      break;
    case "Saskatchewan":
      maxProvince = SaskatchewanMax;
      break;
    case "Manitoba":
      maxProvince = ManitobaMax;
      break;
    case "Ontario":
      maxProvince = OntarioMax;
      break;
    default:
      maxProvince = albertaMax;
  }

  return maxProvince;
}

function provinceSelection(selectedProvince) {
  let province = "";

  switch (selectedProvince) {
    case "Alberta":
      province = Alberta;
      break;
    case "BC":
      province = BC;
      break;
    case "Saskatchewan":
      province = Saskatchewan;
      break;
    case "Manitoba":
      province = Manitoba;
      break;
    case "Ontario":
      province = Ontario;
      break;
    case "federal":
      province = federal;
      break;
    default:
      province = defaultProvince;
  }

  return province;
}

//province changer + bracket changer//

function navProvinceColorChanger(provinceId, previousProvinceId) {
  if (provinceId == "BC" && selectedProvince == "BC") {
    document.getElementById("BC").style.background = "#d5a4f7";
  }
  if (provinceId != previousProvinceId) {
    document.getElementById(previousProvinceId).style.background = "#fbf6fe";
    document.getElementById(provinceId).style.background = "#d5a4f7";
  }
}



function taxBracketGetter(taxBracketConstant, taxBracketConstantMax) {
  let taxArray = [taxBracketConstant.length - 1];
  let province = provinceSelection(taxBracketConstant);
  let salarySum = 0;

  for (let i = 0; i < province.length; i++) {
    if (i == 0) {
      salarySum += province[i][0];
      taxArray[i] =
        "For first $" +
        Number(province[i][0]) +
        " tax rate for this province is " +
        (province[i][1] * 100).toFixed(2) +
        "%";
    } else {
      taxArray[i] =
        "Tax rate for range $" +
        salarySum +
        " ~  $" +
        (salarySum + province[i][0]) +
        " is " +
        (province[i][1] * 100).toFixed(2) +
        "%";
      salarySum += province[i][0];
    }
  }
  taxArray[province.length] =
    "After $" +
    salarySum +
    ", tax rate is fixed at " +
    (taxBracketConstantMax * 100).toFixed(2) +
    "%";

  return taxArray;
}

function provinceChanger(provinceName) {
  if (provinceName != provinceSelector) {
    selectedProvince = provinceSelector;
    provinceSelector = provinceName;
  }
  /*Function to change province's color  upon click */
  navProvinceColorChanger(provinceSelector, selectedProvince);
  /*Functions to change provincial tax bracket */
  let provinceMax = maxProvinceSelection(provinceSelector);
  let provinceTaxArray = taxBracketGetter(provinceSelector, provinceMax);
  /*Functions to change Federal tax bracket */
  let federalTaxArray = taxBracketGetter("federal", federalMax);

  /*Functions to display provincial and federal tax brackets */
  taxBracketCaller("taxBracketDisplayElement", provinceTaxArray);
  taxBracketCaller("federalTaxBracketDisplayElement", federalTaxArray);
  // taxBracketCaller("taxBracketDisplayElement", provinceTaxArray);
}

function taxBracketCaller(id, taxStringArray) {
  let displayString = "";

  for (let i = 0; i < taxStringArray.length; i++) {
    displayString += taxStringArray[i] + "<br/>";
  }

  if (taxStringArray.length < BC.length) {
    for (let k = 0; k <= (BC.length - taxStringArray.length); k++) {
      displayString += " <br/>";
    }
  }

  document.getElementById(id).innerHTML = displayString;
}

//Salary calculator main section display upon hourly/ salary wage button click//

function inputFieldReset() {
  document.getElementById("mainInputField").value = "";
  document.getElementById("secondaryInputField").value = "";

  for (let i = 0; i < document.getElementsByClassName("calculatedDisplayArea").length; i++) {
    document.getElementsByClassName("calculatedDisplayArea")[i].innerHTML = "";
  }
}

function hourlyWageButton() {
  document.getElementById("mainHeading").innerHTML = "Enter your hourly wage";
  document.getElementById("secondInputField").style.display = "block";
  document.getElementById("firstDisplayHeading").innerHTML = "Calculated Annual Salary";

  document.getElementById("hourButton").style.background = "#fbf6fe";
  document.getElementById("salaryButton").style.background = "#FFF";
  document.getElementById("mainArea").style.background = "#fbf6fe";

  inputFieldReset();

  wageType = "hourlyWage";
}

function salaryWageButton() {
  document.getElementById("mainHeading").innerHTML = "Enter your annual wage";
  document.getElementById("secondInputField").style.display = "none";
  document.getElementById("firstDisplayHeading").innerHTML = "Your Annual Salary Before Tax";

  document.getElementById("salaryButton").style.background = "#fbf6fe";
  document.getElementById("hourButton").style.background = "#FFF";
  document.getElementById("mainArea").style.background = "#fbf6fe";

  inputFieldReset();

  wageType = "salaryWage";
}

//Main section tax calculation


function taxCalculator(income, province, maxProvince) {
  let currentBracket = 0;
  let currentIncome = income;
  let owedTax = 0;

  while (true) {
    if (currentBracket == province.length) {
      owedTax += currentIncome * maxProvince;
      break;
    }

    if (currentIncome <= province[currentBracket][0]) {
      owedTax += currentIncome * province[currentBracket][1];
      break;
    }

    owedTax += province[currentBracket][1] * province[currentBracket][0];
    currentIncome -= province[currentBracket][0];
    currentBracket++;
  }

  return owedTax;
}

//ProtoType
function calculateIncome() {
  let mainInput = Number(document.getElementById("mainInputField").value);
  let secondaryInput = Number(document.getElementById("secondaryInputField").value);
  let province = provinceSelection(selectedProvince);
  let provinceMax = maxProvinceSelection(province);

  //Input validation goes here

  let calculatedAnnualSalary = firstDisplayHeading(mainInput, secondaryInput);
  document.getElementById("hourlyToAnnualCalculated").innerHTML = "$" + (calculatedAnnualSalary).toFixed(2);

  let provincialTax = taxCalculator(calculatedAnnualSalary, province, provinceMax);
  let federalTax = taxCalculator(calculatedAnnualSalary, federal, federalMax);

  document.getElementById("provincialTaxDisplay").innerHTML = "$" + (provincialTax).toFixed(2);
  document.getElementById("federalTaxDisplay").innerHTML = "$" + (federalTax).toFixed(2);

  let totalTax = Number(provincialTax + federalTax).toFixed(2);

  document.getElementById("calculatedIncomeDisplay").innerHTML = "$" + (calculatedAnnualSalary - totalTax).toFixed(2);

  let totalTaxPercentage = Number(totalTax) / Number(calculatedAnnualSalary);
  document.getElementById("resultDisplay").innerHTML = "Your total calculated tax is $" + totalTax + ". <br>" 
  + " Your tax is equal to approximately " + totalTaxPercentage.toFixed(2) + "% of your annual income.";

}

function firstDisplayHeading(inputField, secondaryInputField) {
  let calculatedIncome = 0;

  if (wageType == "salaryWage") {
    secondaryInputField = 1;
  }

  if (wageType == "hourlyWage") {
    secondaryInputField *= 52;
  }

  calculatedIncome = inputField * secondaryInputField;
  return calculatedIncome;
}

//onload function

function onLoadFunction() {

  provinceChanger("BC");
  salaryWageButton();

}

