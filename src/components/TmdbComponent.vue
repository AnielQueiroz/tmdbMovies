<script>
import tmdbApi from '@/js/tmdbService';
import { useRouter } from 'vue-router';

var include_adult = true;
var include_video = true;

export default {
    setup() {
        const router = useRouter();

        return {
            router
        }
    },
    data() {
        return {
            movies: [],
            genres: [],
            currentPage: 1,
            selectedGenre: null,
            years: [],
            selectedYear: new Date().getFullYear()
        };
    },
    watch: {
        selectedYear() {
            this.loadMovies();
        }
    },
    async created() {
        this.loadMovies();
        this.loadGenres();
        this.generateYearsList();
    },
    methods: {
        async loadMovies() {
            try {
                let params = {
                    include_video: include_video,
                    include_adult: include_adult,
                    language: 'pt-BR',
                    page: this.currentPage,
                    sort_by: 'popularity.desc',
                };
                if (this.selectedGenre) {
                    params.with_genres = this.selectedGenre;
                }
                if (this.selectedYear) {
                    params.primary_release_year = this.selectedYear;
                }
                const response = await tmdbApi.get('discover/movie', { params });
                console.log(response);
                this.movies = response.data.results;
            } catch (error) {
                console.error(error);
            }
        },
        async loadGenres() {
            try {
                const response = await tmdbApi.get('genre/movie/list', {
                    params: {
                        language: 'pt-BR'
                    }
                });
                this.genres = response.data.genres;
                // console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
        changePage(step) {
            this.currentPage += step;
            this.loadMovies();
        },
        selectGenre(genreId) {
            this.selectedGenre = genreId;
            this.loadMovies();
        },
        generateYearsList() {
            const currentYear = new Date().getFullYear();
            for (let year = currentYear; year >= 1980; year--) {
                this.years.push(year);
            }
        },
        showMovieDetails(movie) {
            console.log('clicado')
            this.router.push({ name: 'movie-details', params: { id: movie.id } });
        }
    }
};
</script>

<template>
    <div class="container">
        <h1 class="main-title">Filmes populares</h1>
        <div class="pagination">
            <button @click="changePage(-1)" :disabled="currentPage <= 1">Anterior</button>
            <span>Página {{ currentPage }}</span>
            <button @click="changePage(1)">Próxima</button>
        </div>

        <div class="movies-options">
            <ul>
                <li @click="selectGenre(null)" class="genres-names">Todos os Gêneros</li>
                <li v-for="genre in genres" :key="genre.id" @click="selectGenre(genre.id)">
                    <h2 class="genres-names"> {{ genre.name }} </h2>
                </li>
            </ul>

            <select v-model="selectedYear">
                <option value="">Todos os anos</option>
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>

        <ul class="movie-list">
            <li v-for="movie in movies" :key="movie.id" class="movie-card" @click="showMovieDetails(movie)">
                <h2 class="movie-title">{{ movie.title }}</h2>
                <img :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" alt="Poster" class="movie-poster">
            </li>
        </ul>
    </div>
</template>

<style>
.container {
    text-align: center;
}

.main-title {
    font-size: 2em;
    margin-bottom: 20px;
}

.pagination {
    margin-bottom: 20px;
}

.movies-options {
    margin-bottom: 20px;
}

.movies-options ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.movies-options li {
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    background-color: #f4f4f4;
}

.genres-names {
    font-size: 1rem;
    color: black;
}

.movies-options li:hover {
    background-color: #e9e9e9;
}

.movie-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.movie-card {
    width: 300px;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    transition: transform 0.3s ease;
}

.movie-card:hover {
    transform: scale(1.05);
}

.movie-title {
    font-size: 1.2em;
    margin: 10px;
    color: black;
}

.movie-poster {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #eee;
}
</style>

  