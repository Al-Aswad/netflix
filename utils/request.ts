const API_KEY=process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL='https://api.themoviedb.org/3'


const request= {
    fetchTrandingNow: `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
    // fetchTranding: `https://api.themoviedb.org/3/trending/all/day?api_key=5451b19f35910de478a0e3991a14c516`,
    fecthNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    fecthActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export default request;

