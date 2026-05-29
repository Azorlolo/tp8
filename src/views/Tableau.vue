<template>
    <hr/>
    <div class="conteneur">
        <section class="converteur">
            <h2>Convertisseur de devises - XPF</h2>        
            <div>
                <label>Montant en Francs Pacifiques (XPF)</label>
                <input v-model.number="montantXPF" type="number" min="1" placeholder="1000" />
            </div>
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
            montantXPF: 1000
        }
    }
}
</script>