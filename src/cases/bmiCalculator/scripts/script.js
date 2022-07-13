function calcBmiValue(weightInKg, heightInMeters) {
  return weightInKg / heightInMeters ** 2;
}

function parseBmiValueToBmiClass(bmiValue) {
  if (bmiValue < 18.5) {
    return "underweight";
  } else if (bmiValue < 25) {
    return "normalweight";
  } else if (bmiValue < 30) {
    return "overweight";
  }
  return "obesity";
}

function updateBmiValueInDom(bmiValue) {
    document.getElementsByClassName("result__bmi-value")[0].innerHTML = "bmi value"; 
    document.getElementsByClassName("result__bmi-value")[1].innerHTML = bmiValue.toFixed(2);
}

function updateBmiClassInDom(bmiClass) {
    document.getElementsByClassName("result__bmi-class")[0].innerHTML = "bmi class";
    document.getElementsByClassName("result__bmi-class")[1].innerHTML = bmiClass;
}

function updateStickManSrcInDom(bmiClass) {
    return document.getElementById("stickman").src = "images/stickman/" + bmiClass + ".png";
}

function updateResultInDOM() {
  let weightInKg = document.getElementsByClassName("calculator__text-field")[0].value;
  let heightInMeters = document.getElementsByClassName("calculator__text-field")[1].value;
  let bmiValue = calcBmiValue(weightInKg, heightInMeters);
  let bmiClass = parseBmiValueToBmiClass(bmiValue);
  updateBmiValueInDom(bmiValue);
  updateBmiClassInDom(bmiClass);
  updateStickManSrcInDom(bmiClass);
}