import axios from 'axios';

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWFkMDIwOTM4NGU0OWY2N2U4MTc2NmI2NTkwMzc4YSIsInN1YiI6IjYzZDJjN2Q0Y2I3MWI4MDA3YzFiYmVjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sjYZwJUdxOyw2-GNLQo89BsEDfc4rQMQolr7OcaYDxY';
const baseURL = 'https://api.themoviedb.org/3/';

const tmdbApi = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'accept': 'application/json'
  }
});

export default tmdbApi;
