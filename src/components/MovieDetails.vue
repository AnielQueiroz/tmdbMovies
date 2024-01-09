 
<script>
import tmdbApi from '@/js/tmdbService';

export default {
    props: {
        id: {
            type: [String, Number],
            required: true
        },
    },
    data() {
        return {
            movieDetails: null,
            // ... outras propriedades de dados
        };
    },
    async created() {
        console.log(this.id)
        try {
            const response = await tmdbApi.get(`movie/${this.id}`, { params: { language: 'pt-BR' } });
            this.movieDetails = response.data;
        } catch (error) {
            console.error(error);
        }
    },
    // ... outros métodos
};
</script>

<template>
    <div class="movie-details">

    </div>
</template>

<style>
/* Estilos para o componente MovieDetails */
</style>
