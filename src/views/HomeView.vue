<template>
  <hr/>
  <div class="conteneur">
    <section class="converteur">
      <h2>Taux de change - XPF</h2>  
    </section>
    
    <Tableau :montantXPF="montantXPF" />
    
  </div>
</template>

<script>
import Tableau from '@/components/Tableau.vue'

export default {
  components: {
    Tableau
  },
  
  data() {
    return {
      montantXPF: 1
    }
  }
}
</script>