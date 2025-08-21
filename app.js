const rtsChart = { /* same as before */ };

function parsePlates(unit) {
  const text = document.getElementById("platesInput").value;
  return text.split(",").map(p => parseFloat(p.trim())).filter(p => !isNaN(p)).sort((a,b)=>b-a);
}

function plateBreakdown(total, bar, plates) {
  let eachSide = (total - bar) / 2;
  if (eachSide < 0) return "Weight < bar!";
  const used = [];
  for (let p of plates) {
    while (eachSide >= p - 0.0001) {
      used.push(p);
      eachSide -= p;
    }
  }
  return used.length ? used.join(", ") + " per side" : "No plates needed";
}

function update() {
  const unit = document.getElementById("unitToggle").value;
  const bar = parseFloat(document.getElementById("barWeight").value) || 20;
  const top = parseFloat(document.getElementById("topWeight").value) || 0;
  const reps = parseInt(document.getElementById("reps").value) || 1;
  const rpe = document.getElementById("rir").value;
  const percent = rtsChart[rpe]?.[reps] || 1;

  const topKg = unit === "kg" ? top : top / 2.20462;
  const e1rm = topKg / percent;

  document.getElementById("e1rm").textContent = 
    `Today's estimated 1RM: ${Math.round(e1rm)} kg / ${Math.round(e1rm*2.20462)} lbs`;

  const backoffPct = document.getElementById("backoffSlider").value;
  document.getElementById("backoffPercent").textContent = backoffPct + "%";
  const backoffWeight = e1rm * (backoffPct/100);

  document.getElementById("backoff").textContent = 
    `Backoff weight to use: ${Math.round(backoffWeight)} kg / ${Math.round(backoffWeight*2.20462)} lbs`;

  const plates = parsePlates(unit);
  const breakdown = plateBreakdown(
    unit === "kg" ? Math.round(backoffWeight) : Math.round(backoffWeight*2.20462),
    bar,
    plates
  );

  document.getElementById("plates").textContent = `Plates: ${breakdown}`;
}

document.querySelectorAll("input,select").forEach(el => {
  el.addEventListener("input", update);
});
