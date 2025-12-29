function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    if (!input) return "invalid number";
    // extract number part (everything up to the first letter)
    let numStr = input.trim().match(/^[\s\S]*?(?=[a-zA-Z]|$)/)[0];
    if (numStr === "") {
      return 1;
    }
    // handle fractions
    if ((numStr.match(/\//g) || []).length > 1) {
      return "invalid number";
    }
    if (numStr.includes("/")) {
      let nums = numStr.split("/");
      let numerator = parseFloat(nums[0]);
      let denominator = parseFloat(nums[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return "invalid number";
      result = numerator / denominator;
    } else {
      let val = parseFloat(numStr);
      if (isNaN(val)) return "invalid number";
      result = val;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    if (!input) return "invalid unit";
    let unitMatch = input.trim().match(/[a-zA-Z]+$/);
    if (!unitMatch) return "invalid unit";
    let unit = unitMatch[0];
    let unitsLower = unit.toLowerCase();
    switch (unitsLower) {
      case "gal":
        result = "gal";
        break;
      case "l":
        result = "L";
        break;
      case "mi":
        result = "mi";
        break;
      case "km":
        result = "km";
        break;
      case "lbs":
        result = "lbs";
        break;
      case "kg":
        result = "kg";
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = "invalid unit";
    }
    // round to 5 decimal places
    if (typeof result === "number") result = parseFloat(result.toFixed(5));
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    let initSpell = this.spellOutUnit(initUnit);
    let returnSpell = this.spellOutUnit(returnUnit);
    result = `${initNum} ${initSpell} converts to ${returnNum} ${returnSpell}`;
    return result;
  };
}

module.exports = ConvertHandler;
