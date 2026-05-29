let encaisse = 250000;
let totalAttendu = 300000;
let penalites = 15000;

// Charger les données du dashboard depuis l'API
async function loadDashboard() {
  try {
    if (API_CONFIG.BASE_URL) {
      const data = await API.getDashboard();
      encaisse = data.encaisse || encaisse;
      totalAttendu = data.totalAttendu || totalAttendu;
      penalites = data.penalites || penalites;
    }
  } catch (error) {
    console.log('Utilisation des données mockées');
  }
  updateDashboard();
}

function updateDashboard() {
  document.getElementById("encaisse").innerText = encaisse + " FCFA";

  let recouvrement = (encaisse / totalAttendu) * 100;
  document.getElementById("recouvrement").innerText = recouvrement.toFixed(1) + "%";

  document.getElementById("penalites").innerText = penalites + " FCFA";
}

// Charger au démarrage
loadDashboard();