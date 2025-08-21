// Simple RTS chart for e1RM calc (RPE = 10 = max effort, 6.5 easier)
const rtsChart = {
  10: {1:1, 2:0.955, 3:0.922, 4:0.892, 5:0.863, 6:0.837, 7:0.811, 8:0.786, 9:0.762, 10:0.739},
  9.5:{1:0.978,2:0.943,3:0.911,4:0.882,5:0.854,6:0.828,7:0.802,8:0.778,9:0.754,10:0.731},
  9:  {1:0.955,2:0.922,3:0.892,4:0.863,5:0.837,6:0.811,7:0.786,8:0.762,9:0.739,10:0.717},
  8.5:{1:0.939,2:0.907,3:0.878,4:0.85, 5:0.824,6:0.799,7:0.774,8:0.751,9:0.728,10:0.706},
  8:  {1:0.922,2:0.892,3:0.863,4:0.837,5:0.811,6:0.786,7:0.762,8:0.739,9:0.717,10:0.696},
  7.5:{1:0.907,2:0.878,3:0.85, 4:0.824,5:0.799,6:0.774,7:0.751,8:0.728,9:0.706,10:0.685},
  7:  {1:0.892,2:0.863,3:0.837,4:0.811,5:0.786,6:0.762,7:0.739,8:0.717,9:0.696,10:0.675},
  6.5:{1:0.878,2:0.85, 3:0.824,4:0.799,5:0.774,6:0.751,7:0.728,8:0.706,9:0.685,10:0.664}
};

function update() {
  const lbs = parseFloat(document.getElementById("topLbs").value) || 0;
  const kg = parseFloat(document.getElementById("topKg").value) || (lbs/2.20462);
  const reps = parseInt(document.getElementById("reps").value) || 1;
  const rpe = document.getElementById("rir").value;
  const percent = rtsChart[rpe]?.[reps] || 1;

  // e1RM
  const e1rm = kg / percent;
  document.getElementById("e1rm").textContent = 
    `Today's estimated 1RM: ${Math.round(e1rm)} kg / ${Math.round(e1rm*2.20462)} lbs`;

  // Backoff
  const backoffPct = document.getElementById("backoffSlider").value;
  document.getElementById("backoffPercent").textContent = backoffPct + "%";
  const backoffWeight = e1rm * (backoffPct/100);
  document.getElementById("backoff").textContent = 
    `Backoff weight to use: ${Math.round(backoffWeight)} kg / ${Math.round(backoffWeight*2.20462)} lbs`;

  // Plate breakdown (simple, just mirrors numbers for now)
  document.getElementById("plates").textContent = 
    `Plates (kg/lbs): match bar math coming soon…`;
}

document.querySelectorAll("input,select").forEach(el => {
  el.addEventListener("input", update);
});
