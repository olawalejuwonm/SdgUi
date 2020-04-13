var inName = document.getElementById('name');
var inPopu = document.getElementById('population');
var inAvgA = document.getElementById('avgAge');
var inAvgU = document.getElementById('avgDailyIncomeInUSD');
var inAvgP = document.getElementById('avgDailyIncomePopulation');
var inRepC = document.getElementById('reportedCases');
var inToHB = document.getElementById('totalHospitalBeds');
var inTiTE = document.getElementById('timeToElapse');
var inPerT = document.getElementById('periodType');
var inImpE = document.getElementById('ImpactEstimator');
function covid19ImpactEstimator() {
   var Total = [inAvgU.value + inAvgP.value + inRepC.value + inToHB.value + inTiTE.value];

   if (Total.includes('') || inName.value == "") {alert("Please Provide Important Value(s)")}
   else {
   document.getElementById('theimpact').setAttribute("class", "best active svelte-1h0ma34")
   document.getElementById('Thesevereimpact').setAttribute("class", "worst svelte-1h0ma34")
   var DayNumber;
   var CurrentlyInfected = inRepC.value * 10
   document.getElementById('form').style.display = "none";
   document.getElementById('analysis').style.display = "block";
   document.getElementById('repoCases').innerHTML = CurrentlyInfected;
   document.getElementById('region').innerHTML = inName.value;
   if (inPerT.value === 'days') {
    DayNumber = inTiTE.value;
  } else if (inPerT.value === 'weeks') {
    DayNumber = 7 * inTiTE.value;
  }
  if (inPerT.value === 'months') {
    DayNumber = 30 * inTiTE.value;
  }
   document.getElementById('days').innerHTML = DayNumber;
   var factor = Math.trunc(DayNumber / 3);

   const impactInfBrqt = Math.trunc(CurrentlyInfected * (2 ** factor));
   document.getElementById('infectionBRQT').innerHTML = impactInfBrqt;
   
   const impSevercaseBrqt = Math.trunc(0.15 * impactInfBrqt);
   document.getElementById('severeBRQT').innerHTML = impSevercaseBrqt;

   var availableBed = 0.35 * inToHB.value;
   const impAvailBed = Math.trunc(availableBed - impSevercaseBrqt);
   document.getElementById('availHB').innerHTML = impAvailBed;

   const impSevIcu = Math.trunc(0.05 * impactInfBrqt);
   document.getElementById('severeICU').innerHTML = impSevIcu;

   const impSevVent = Math.trunc(0.02 * impactInfBrqt);
   document.getElementById('severeVenti').innerHTML = impSevVent;
   
   var avgDInPop = Number(inAvgP.value);
   var avgIncome = Number(inAvgU.value);
   var days = Number(DayNumber);

  const impDollInFlight = Math.trunc((impactInfBrqt * avgDInPop
    * avgIncome) / days);
  document.getElementById('dollarFly').innerHTML = impDollInFlight;
}
}
function funcAttr() {
	inName.setAttribute("data-region-name", inName.value);
    inPopu.setAttribute("data-population", inPopu.value);
	inAvgA.setAttribute("data-avg-age", inAvgA.value);
	inAvgU.setAttribute("data-avg-daily-income", inAvgU.value);
	inAvgP.setAttribute("data-avg-daily-income-population", inAvgP.value);
	inRepC.setAttribute("data-reported-cases", inRepC.value);
	inToHB.setAttribute("data-total-hospital-beds", inToHB.value);
	inTiTE.setAttribute("data-time-to-elapse", inTiTE.value);
	inPerT.setAttribute("data-period-type", inPerT.value);
}
function SevereImpact() {
  document.getElementById('Thesevereimpact').setAttribute("class", "best active svelte-1h0ma34")
  document.getElementById('theimpact').setAttribute("class", "worst svelte-1h0ma34")
  var availableBed = 0.35 * inToHB.value;
  var DayNumber;
  if (inPerT.value === 'days') {
    DayNumber = inTiTE.value;
  } else if (inPerT.value === 'weeks') {
    DayNumber = 7 * inTiTE.value;
  }
  if (inPerT.value === 'months') {
    DayNumber = 30 * inTiTE.value;
  }
  var avgDInPop = Number(inAvgP.value);
  var avgIncome = Number(inAvgU.value);
  var days = Number(DayNumber);
  const factor = Math.trunc(DayNumber / 3);
	const sevCurrentlyInfected = inRepC.value * 50;
  document.getElementById('repoCases').innerHTML = sevCurrentlyInfected;
  const sevImpactInfBrqt = sevCurrentlyInfected * (2 ** factor);
  document.getElementById('infectionBRQT').innerHTML = Math.trunc(sevImpactInfBrqt);

  const sevImpSevercaseBrqt = 0.15 * sevImpactInfBrqt;
  document.getElementById('severeBRQT').innerHTML = Math.trunc(sevImpSevercaseBrqt);


  const sevAvailBed = availableBed - sevImpSevercaseBrqt;
  document.getElementById('availHB').innerHTML = Math.trunc(sevAvailBed);

   const sevSevICU = 0.05 * sevImpactInfBrqt;
   document.getElementById('severeICU').innerHTML = Math.trunc(sevSevICU);

   const sevSevVent = 0.02 * sevImpactInfBrqt;
   document.getElementById('severeVenti').innerHTML = Math.trunc(sevSevVent);

   const sevDoll = (sevImpactInfBrqt * avgDInPop * avgIncome) / days
   document.getElementById('dollarFly').innerHTML = Math.trunc(sevDoll);








}
function Rerun() {
  document.getElementById('analysis').style.display = "none";
  document.getElementById('form').style.display = "block";
  
}