// import {
//   BC, Alberta, Saskatchewan, Manitoba, Ontario, Quebec,
//   NewBrunswick, NovaScotia, PrinceEd, Newfoundland, Yukon, NorthWest, Nunavut,
//   BCMax, albertaMax, SaskatchewanMax, ManitobaMax, OntarioMax, QuebecMax, NunavutMax,
//   NewBrunswickMax, NovaScotiaMax, PrinceEdMax, NewfoundlandMax, YukonMax, NorthWestMax,
//   federal, federalMax
// } from "./constants.js";

import * as constants from "./constants.js";

let provinceSelector = "BC";
let selectedProvince = "BC";
let provinceMax = "";
let wageType = "salaryWage";

//General Functions//
function maxProvinceSelection(selectedProvince) {
  let maxProvince = "";

  switch (selectedProvince) {
    case "Alberta":
      maxProvince = constants.albertaMax;
      break;
    case "BC":
      maxProvince = constants.BCMax;
      break;
    case "Saskatchewan":
      maxProvince = constants.SaskatchewanMax;
      break;
    case "Manitoba":
      maxProvince = constants.ManitobaMax;
      break;
    case "Ontario":
      maxProvince = constants.OntarioMax;
      break;
    case "Quebec":
      maxProvince = constants.QuebecMax;
      break;
    case "newBrunswick":
      maxProvince = constants.NewBrunswickMax;
      break;
    case "novaScotia":
      maxProvince = constants.NovaScotiaMax;
      break;
    case "princeEdward":
      maxProvince = constants.PrinceEdMax;
      break;
    case "newFoundLand":
      maxProvince = constants.NewfoundlandMax;
      break;
    case "yukon":
      maxProvince = constants.YukonMax;
      break;
    case "northWestTerritory":
      maxProvince = constants.NorthWestMax;
      break;
    case "nunavut":
      maxProvince = constants.NunavutMax;
      break;
    default:
      maxProvince = constants.albertaMax;
  }

  return maxProvince;
}

function provinceSelection(selectedProvince) {
  let province = "";

  switch (selectedProvince) {
    case "Alberta":
      province = constants.Alberta;
      break;
    case "BC":
      province = constants.BC;
      break;
    case "Saskatchewan":
      province = constants.Saskatchewan;
      break;
    case "Manitoba":
      province = constants.Manitoba;
      break;
    case "Ontario":
      province = constants.Ontario;
      break;
    case "Quebec":
      province = constants.Quebec;
      break;
    case "newBrunswick":
      province = constants.NewBrunswick;
      break;
    case "novaScotia":
      province = constants.NovaScotia;
      break;
    case "princeEdward":
      province = constants.PrinceEd;
      break;
    case "newFoundLand":
      province = constants.Newfoundland;
      break;
    case "yukon":
      province = constants.Yukon;
      break;
    case "northWestTerritory":
      province = constants.NorthWest;
      break;
    case "nunavut":
      province = constants.Nunavut;
      break;
    case "federal":
      province = constants.federal;
      break;
    default:
      province = constants.defaultProvince;
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
        "First $" +
        Number(province[i][0]) +
        ", tax rate is " +
        (province[i][1] * 100).toFixed(2) +
        "%";
    } else {
      taxArray[i] =
        "Tax rate for $" +
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
  /*Function to change province's color  upon click */5
  navProvinceColorChanger(provinceSelector, selectedProvince);
  /*Functions to change provincial tax bracket */
  let provinceMax = maxProvinceSelection(provinceSelector);
  let provinceTaxArray = taxBracketGetter(provinceSelector, provinceMax);
  /*Functions to change Federal tax bracket */
  let federalTaxArray = taxBracketGetter("federal", constants.federalMax);

  /*Functions to display provincial and federal tax brackets */
  taxBracketCaller("taxBracketDisplayElement", provinceTaxArray);
  taxBracketCaller("federalTaxBracketDisplayElement", federalTaxArray);
  // taxBracketCaller("taxBracketDisplayElement", provinceTaxArray);
}

window.provinceChanger = provinceChanger;

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

function inputFieldReset(buttonType) {
  if (!(buttonType == "calculate")) {
    document.getElementById("mainInputField").value = "";
    document.getElementById("secondaryInputField").value = "";
  }

  for (let i = 0; i < document.getElementsByClassName("calculatedDisplayArea").length; i++) {
    document.getElementsByClassName("calculatedDisplayArea")[i].innerHTML = "";
  }

  for (let i = 0; i < document.getElementsByClassName("errorDisplay").length; i++) {
    document.getElementsByClassName("errorDisplay")[i].innerHTML = "";
  }
}

function hourlyWageButton() {
  document.getElementById("mainHeading").innerHTML = "Enter your hourly wage";
  document.getElementById("secondInputField").style.display = "block";
  document.getElementById("firstDisplayHeading").innerHTML = "Calculated Annual Salary";

  document.getElementById("hourButton").style.background = "#fbf6fe";
  document.getElementById("salaryButton").style.background = "#FFF";
  document.getElementById("mainArea").style.background = "#fbf6fe";

  document.getElementById("mainInputField").placeholder = "Enter your hourly wage";

  inputFieldReset("none");

  wageType = "hourlyWage";
}

window.hourlyWageButton = hourlyWageButton;

function salaryWageButton() {
  document.getElementById("mainHeading").innerHTML = "Enter your annual wage";
  document.getElementById("secondInputField").style.display = "none";
  document.getElementById("firstDisplayHeading").innerHTML = "Your Annual Salary Before Tax";

  document.getElementById("salaryButton").style.background = "#fbf6fe";
  document.getElementById("hourButton").style.background = "#FFF";
  document.getElementById("mainArea").style.background = "#fbf6fe";

  document.getElementById("mainInputField").placeholder = "Enter your annual salary";

  inputFieldReset("none");

  wageType = "salaryWage";
}

window.salaryWageButton = salaryWageButton;

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

  inputFieldReset("calculate");

  let mainInput = Number(document.getElementById("mainInputField").value);
  let secondaryInput = Number(document.getElementById("secondaryInputField").value);
  let province = provinceSelection(selectedProvince);
  let provinceMax = maxProvinceSelection(province);

  //Input validation goes here

  if (inputValidation(mainInput, "display1") && (inputValidation(secondaryInput, "display2") || wageType == "salaryWage")) {
    let calculatedAnnualSalary = firstDisplayHeading(mainInput, secondaryInput);
    document.getElementById("hourlyToAnnualCalculated").innerHTML = "$" + (calculatedAnnualSalary).toFixed(2);

    let provincialTax = taxCalculator(calculatedAnnualSalary, province, provinceMax);
    let federalTax = taxCalculator(calculatedAnnualSalary, constants.federal, constants.federalMax);

    document.getElementById("provincialTaxDisplay").innerHTML = "$" + (provincialTax).toFixed(2);
    document.getElementById("federalTaxDisplay").innerHTML = "$" + (federalTax).toFixed(2);

    let totalTax = Number(provincialTax + federalTax).toFixed(2);

    document.getElementById("calculatedIncomeDisplay").innerHTML = "$" + (calculatedAnnualSalary - totalTax).toFixed(2);

    let totalTaxPercentage = Number(totalTax) / Number(calculatedAnnualSalary);
    document.getElementById("resultDisplay").innerHTML = "Your total calculated tax is $" + totalTax + ". <br>"
      + " Your tax is equal to approximately </br>" + (totalTaxPercentage*100).toFixed(2) + "% of your annual income.";
  }

}

window.calculateIncome = calculateIncome;

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

function inputValidation(input, id) {

  if (input < 0) {
    document.getElementById(id).innerHTML = "Input has to be a positive number";
    return false;
  }

  if (input == 0) {
    document.getElementById(id).innerHTML = "Input has to be greater than $0";
    return false;
  }

  return true;
}

//onload function

function onLoadFunction() {

  provinceChanger("BC");
  salaryWageButton();

}

window.onLoadFunction = onLoadFunction;

