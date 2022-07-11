const provinces = ["Alberta", "BC", "Saskatchewan", "Manitoba", "Ontario"];

const federal = [
    [50197, 0.15],
    [50195, 0.205],
    [55233, 0.26],
    [66083, 0.29]
]


const federalMax = 0.33;

const Alberta = [
  [131220, 0.1],
  [26344, 0.12],
  [52488, 0.13],
  [104976, 0.14]
];

const albertaMax = 0.15;

const BC = [
  [43070, 0.0506],
  [43071, 0.077],
  [12760, 0.105],
  [21193, 0.1229],
  [42738, 0.147],
  [64259, 0.168]
];

const BCMax = 0.205;

const Saskatchewan = [
    [45677, 0.105],
    [39152, 0.125]
]

const SaskatchewanMax = 0.145;

const Manitoba = [
    [33723, 0.108],
    [39162, 0.1275]
]

const ManitobaMax = 0.174;

const Ontario = [
  [45142, 0.0505],
  [45143, 0.0915],
  [59712, 0.1116],
  [70000, 12.16]
];

const OntarioMax = 0.1316;

let provinceSelector = "BC";
let selectedProvince = "BC";

function navProvinceColorChanger(provinceId, previousProvinceId) {
    if (provinceId == "BC" && selectedProvince == "BC"){
        document.getElementById("BC").style.background = "#aa83c6";
    }
    if (provinceId != previousProvinceId) {
    document.getElementById(previousProvinceId).style.background = "#fbf6fe";
    document.getElementById(provinceId).style.background = "#aa83c6";
  }
}

function taxBracketGetter(taxBracketConstant, taxBracketConstantMax){
    let taxArray = [taxBracketConstant.length-1]; 
    for(let i = 0; i < taxBracketConstant.length;i++){
        if(i == 0){
            taxArray[i] = "For first $" + taxBracketConstant[i,0] + " tax rate for this province is " + (taxBracketConstant[i,1] * 100) + "%";
        }else{
            taxArray[i] = "Tax rate for range $" + taxBracketConstant[i,0] + " ~  $" + (taxBracketConstant[i-1,0] + taxBracketConstant[i,0]) + " is " + (taxBracketConstant[i,1] * 100) + "%";
        }
    }
    taxArray[taxArray.length-1] = "After $" + taxBracketConstant[taxBracketConstant.length-1, 0] + ", tax rate is fixed at " + (taxBracketConstantMax  * 100) + "%";
}

function taxBracketInformation(provinceId){
    switch(provinceId){
        case "BC":

    }
}

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

function provinceChanger(provinceName) {
  if (provinceName != provinceSelector) {
    selectedProvince = provinceSelector;
    provinceSelector = provinceName;
  }

  navProvinceColorChanger(provinceSelector,selectedProvince);
  console.log(provinceSelector);
}
