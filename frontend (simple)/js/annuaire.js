let members = [
  { nom: "Jean", solde: "ok", penalise: false },
  { nom: "Marie", solde: "retard", penalise: true },
  { nom: "Paul", solde: "ok", penalise: false }
];

// Charger les membres depuis l'API
async function loadMembers() {
  try {
    if (API_CONFIG.BASE_URL) {
      members = await API.getMembers();
    }
  } catch (error) {
    console.log('Utilisation des données mockées');
  }
  render(members);
}

function render(data) {
  const container = document.getElementById("members");
  container.innerHTML = "";

  data.forEach(m => {
    const color = m.solde === "ok" ? "green" : "red";

    const card = document.createElement("div");
    card.className = "card";
    card.style.borderLeft = `5px solid ${color}`;

    card.innerHTML = `
      <h3>${m.nom}</h3>
      <p>Statut: ${m.solde}</p>
      <button onclick='openModal(${JSON.stringify(m)})'>Voir JSON</button>
    `;

    container.appendChild(card);
  });
}

function openModal(data) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("jsonView").textContent = JSON.stringify(data, null, 2);
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

async function filtrerPenalises() {
  try {
    if (API_CONFIG.BASE_URL) {
      const penalizes = await API.getPenalizedMembers();
      render(penalizes);
    } else {
      render(members.filter(m => m.penalise));
    }
  } catch (error) {
    render(members.filter(m => m.penalise));
  }
}

document.getElementById("search").addEventListener("input", async function(e) {
  const value = e.target.value.toLowerCase();
  try {
    if (API_CONFIG.BASE_URL) {
      const results = await API.searchMembers(value);
      render(results);
    } else {
      render(members.filter(m => m.nom.toLowerCase().includes(value)));
    }
  } catch (error) {
    render(members.filter(m => m.nom.toLowerCase().includes(value)));
  }
});

// Charger les données au démarrage
loadMembers();