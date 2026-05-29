let cotisations = [];

function ajouterCotisation() {
  const montant = prompt("Montant cotisation :");
  const date = new Date().toLocaleDateString();

  if (montant) {
    cotisations.push({ montant, date });

    const div = document.createElement("div");
    div.className = "cotisation";
    div.innerHTML = `💰 ${montant} FCFA - ${date}`;

    document.getElementById("cotisations").appendChild(div);
  }
}

document.getElementById("memberForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const membre = {
    nom: document.getElementById("nom").value,
    cni: document.getElementById("cni").value,
    contact: document.getElementById("contact").value,
    urgence: document.getElementById("contactUrgence").value,
    tontines: Array.from(document.getElementById("tontines").selectedOptions).map(o => o.value),
    cotisations: cotisations
  };

  try {
    if (API_CONFIG.BASE_URL) {
      await API.createMember(membre);
    }
    console.log("MEMBRE ENREGISTRÉ :", membre);
    alert("Membre enregistré avec succès !");
    
    // Réinitialiser le formulaire
    document.getElementById("memberForm").reset();
    document.getElementById("cotisations").innerHTML = "";
    cotisations = [];
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
    alert("Erreur lors de l'enregistrement du membre");
  }
});