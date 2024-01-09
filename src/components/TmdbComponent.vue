<script>
import tmdbApi from '@/js/tmdbService';

var adult = true;
var include_video = true;
var pages = 2;

export default {
    data() {
        return {
            movies: [],
        };
    },
    async created() {
        try {
            const response = await tmdbApi.get(`discover/movie?include_adult=${adult}&include_video=${include_video}&language=pt-BR&page=${pages}&sort_by=popularity.desc`, {
            });
            console.log(response)
            this.movies = response.data.results;
        } catch (error) {
            console.error(error);                
        }
    },
};
</script>


<!-- Dentro de TmdbComponent.vue -->
<template>
    <div>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
            <h2>{{ movie.title }}</h2>
            <img :src="'https://image.tmdb.org/t/p/w400' + movie.poster_path" alt="Poster">
        </li>
        <li> </li>
      </ul>
    </div>
  </template>
  