<template>
  
  <!--Navigation globale-->
  <nav>
    <div>
      <a href="/">
        <img src="../src/assets/promotion.png" alt="Promotion de mon projet Pépite" width="150">
      </a>
    </div>
    <div>
      <h1>TAUX DE CHANGE</h1>
      <h2>Banque de Nouvelle-Calédonie — Aéroport de La Tontouta</h2>
      <div v-if="$route.path === '/Tableau'">
        <span><router-link to="/">Retour à l'accueil</router-link></span>
      </div>
      <div v-else>
        <span><router-link to="/Tableau">Accéder au tableau de convertion</router-link></span>
      </div>
    </div>
  </nav>
  
  <!--Le truc qui affiche les vues-->
  <router-view/>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 20px;
  padding: 20px;
  background-color: #0D1E2C;
}

nav {
  padding: 0px;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-around;
}

nav div {
  text-align: left;
}

h1, h2, h3 {
  color: #ffffff;
}

a {
  color: #ffffff;
  text-decoration: none;
}

a:hover {
  text-decoration:underline;
}

.conteneur {
  gap: 20px;
  display: flex;
  flex-direction: column;
}

hr {
  color: #f0f0f0;
  margin: 20px;
}

.converteur {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.converteur div {
  color: #C9E4EF;
  gap: 12px;
  display: flex;
}
</style>