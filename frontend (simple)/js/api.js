// Configuration des APIs
const API_CONFIG = {
  BASE_URL: '', // À completer avec votre URL de base
  TIMEOUT: 5000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
};

// Utilitaire pour les requêtes HTTP
async function fetchAPI(endpoint, options = {}) {
  const url = API_CONFIG.BASE_URL + endpoint;
  const config = {
    headers: API_CONFIG.HEADERS,
    ...options
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}

// Module API pour les Membres
const API = {
  // Récupérer tous les membres
  getMembers: async () => {
    return fetchAPI('/membres', { method: 'GET' });
  },

  // Créer un nouveau membre
  createMember: async (memberData) => {
    return fetchAPI('/membres', {
      method: 'POST',
      body: JSON.stringify(memberData)
    });
  },

  // Récupérer un membre par ID
  getMemberById: async (id) => {
    return fetchAPI(`/membres/${id}`, { method: 'GET' });
  },

  // Mettre à jour un membre
  updateMember: async (id, memberData) => {
    return fetchAPI(`/membres/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData)
    });
  },

  // Récupérer les membres pénalisés
  getPenalizedMembers: async () => {
    return fetchAPI('/membres?penalise=true', { method: 'GET' });
  },

  // Données du Dashboard
  getDashboard: async () => {
    return fetchAPI('/dashboard', { method: 'GET' });
  },

  // Enregistrer une cotisation
  recordCotisation: async (memberId, cotisationData) => {
    return fetchAPI(`/membres/${memberId}/cotisations`, {
      method: 'POST',
      body: JSON.stringify(cotisationData)
    });
  },

  // Chercher un membre
  searchMembers: async (query) => {
    return fetchAPI(`/membres/search?q=${encodeURIComponent(query)}`, { method: 'GET' });
  }
};

// Fonction pour définir l'URL de base
function setAPIBaseURL(url) {
  API_CONFIG.BASE_URL = url;
}
