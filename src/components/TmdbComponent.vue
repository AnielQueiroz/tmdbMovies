<script>
import tmdbApi from '@/js/tmdbService';

var adult = true;
var include_video = true;

export default {
    data() {
        return {
            movies: [],
            currentPage: 1
        };
    },
    async created() {
        this.loadMovies();

    },
    methods: {
        async loadMovies() {
            try {
                const response = await tmdbApi.get(`discover/movie?include_adult=${adult}&include_video=${include_video}&language=pt-BR&page=${this.currentPage}&sort_by=popularity.desc`, {
                });
                console.log(response);
                this.movies = response.data.results;
            } catch (error) {
                console.error(error);
            }
        },
        changePage(step) {
            this.currentPage += step;
            this.loadMovies();
        }
    }
};
</script>

<template>
    <div>
        <h1>Filmes populares</h1>
        <button @click="changePage(-1)" :disabled="currentPage <= 1">Anterior</button>
        <span>Página {{ currentPage }}</span>
        <button @click="changePage(1)">Próxima</button>

        <ul>
            <li v-for="movie in movies" :key="movie.id">
                <h2>{{ movie.title }}</h2>
                <img :src="'https://image.tmdb.org/t/p/w400' + movie.poster_path" alt="Poster">
            </li>
        </ul>
    </div>
</template>
  