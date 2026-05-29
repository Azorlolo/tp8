<template>
  <p v-if="chargement">Chargement des taux en cours...</p>
  
  <p v-else-if="erreur">Impossible de récupérer les taux. Vérifiez votre connexion.</p>
  
  <p v-else-if="devises.length === 0">Aucun taux disponible pour le moment.</p>
  
  <section v-else class="grille">
    <div v-for="devise in devises" :key="devise.code" class="carte">
      <img
      :src="`https://flagcdn.com/w640/${devise.codePays}.png`"
      :alt="devise.nom"
      class="carte-drapeau"
      />
      <div class="carte-infos">
        <span class="carte-nom">{{ devise.nom }}</span>
        <span class="carte-conversion">{{ formaterNombre(convertir(devise.taux)) }}</span>
      </div>
      <span class="carte-code">{{ devise.code }}</span>
    </div>
  </section>
  
  <footer>
    Taux indicatifs — Dernière mise à jour : {{ derniereMaj }}
  </footer>
</template>

<script>
export default {
  name: 'Tableau',
    
  emits: ['update:montantXPF'],
  
  props: {
    montantXPF: {
      type: Number,
      default: 1000
    }
  },
  
  data() {
    return {
      devises: [],
      chargement: true,
      erreur: false,
      derniereMaj: '--:--',
      intervalRafraichissement: null,
      
      devisesConfig: [
      { code: 'AUD', nom: 'Dollar australien',    codePays: 'au' },
      { code: 'NZD', nom: 'Dollar néo-zélandais', codePays: 'nz' },
      { code: 'CAD', nom: 'Dollar canadien',       codePays: 'ca' },
      { code: 'USD', nom: 'Dollar US',             codePays: 'us' },
      { code: 'FJD', nom: 'Dollar fidjien',        codePays: 'fj' },
      { code: 'SGD', nom: 'Dollar de Singapour',   codePays: 'sg' },
      { code: 'THB', nom: 'Baht thaïlandais',      codePays: 'th' },
      { code: 'CHF', nom: 'Franc suisse',          codePays: 'ch' },
      { code: 'EUR', nom: 'Euro',                  codePays: 'eu' },
      { code: 'GBP', nom: 'Livre sterling',        codePays: 'gb' },
      { code: 'JPY', nom: 'Yen',                   codePays: 'jp' },
      { code: 'VUV', nom: 'Vatu (Vanuatu)',        codePays: 'vu' },
      ],
    }
  },
  
  mounted() {
    this.fetchTaux()
    this.intervalRafraichissement = setInterval(this.fetchTaux, 3600000)
  },
  
  unmounted() {
    clearInterval(this.intervalRafraichissement)
  },
  
  methods: {
    
    async fetchTaux() {
      this.erreur = false
      try {
        const url = `https://v6.exchangerate-api.com/v6/8758fc5610c010cfff69de64/latest/XPF`
        //const url = `/ChangeXPF.json`
        
        const reponse = await fetch(url)
        if (!reponse.ok) throw new Error('Réponse API invalide')
        
        const donnees = await reponse.json()
        
        this.devises = this.devisesConfig.map(devise => ({
          ...devise,
          taux: donnees.conversion_rates[devise.code] ?? null,
        })).filter(d => d.taux !== null)
        
        const maintenant = new Date()
        this.derniereMaj = maintenant.toLocaleTimeString('fr-FR')
        this.chargement = false
        
      } catch (e) {
        console.error('Erreur fetch :', e)
        this.erreur = true
        this.chargement = false
      }
    },
    
    convertir(taux) {
      return this.montantXPF * taux
    },
    
    formaterNombre(valeur) {
      if (valeur === null || valeur === undefined) return '—'
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }).format(valeur)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grille {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  row-gap: 2px;
}

.carte {
  display: flex;
  align-items: center;
  gap: 12px;
  width: calc(50% - 6px);
  padding: 10px 16px;
  background: linear-gradient(45deg, #0D1E2C, #1A3A4A, #0F2A3F, #112233);
  background-size: 400%;
  box-sizing: border-box;
  opacity: 0;
  animation: fadeSlideLeft 0.4s ease forwards, backgroundShift 10s ease infinite;;
}

.carte-drapeau {
  width: 70px;
  height: auto;
}

.carte-infos {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.carte-nom {
  color: #C9E4EF;
  font-size: 0.85rem;
}

.carte-conversion {
  color: #38C9E8;
  font-size: 1rem;
  font-weight: bold;
}

.carte-code {
  color: #FFFFFF;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-left: auto;
}

footer {
  color: #C9E4EF;
  font-size: 0.85rem;
  text-align: right;
}

@keyframes fadeSlideLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.carte:nth-child(1)  { animation-delay: 0.05s; }
.carte:nth-child(2)  { animation-delay: 0.10s; }
.carte:nth-child(3)  { animation-delay: 0.15s; }
.carte:nth-child(4)  { animation-delay: 0.20s; }
.carte:nth-child(5)  { animation-delay: 0.25s; }
.carte:nth-child(6)  { animation-delay: 0.30s; }
.carte:nth-child(7)  { animation-delay: 0.35s; }
.carte:nth-child(8)  { animation-delay: 0.40s; }
.carte:nth-child(9)  { animation-delay: 0.45s; }
.carte:nth-child(10) { animation-delay: 0.50s; }
.carte:nth-child(11) { animation-delay: 0.55s; }
.carte:nth-child(12) { animation-delay: 0.60s; }

@keyframes backgroundShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
