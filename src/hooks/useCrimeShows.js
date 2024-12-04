import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCrimeShows } from "../utils/movieSlice"; // Redux action
import { API_OPTIONS } from "../utils/constant"; // API options

const useCrimeShows = () => {
  const dispatch = useDispatch(); // Get the dispatch function
  const crimeShows = useSelector((store) => store.movies?.crimeShows);
  // Function to fetch movies data

  const getCrimeShows = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80",
        API_OPTIONS
      ); // Fetch data from the API
      const json = await data.json(); // Convert response to JSON

      dispatch(addCrimeShows(json.results)); // Dispatch the movie data to Redux
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any errors
    }
  };

  // Use useEffect to call the fetchMovies when the hook is used
  useEffect(() => {
    if (!crimeShows || crimeShows.length === 0) {
      getCrimeShows(); // Call the fetch function when the component mounts if no data exists
    }
  }, []); // Depend on the URL so the hook will refetch if the URL changes
};

export default useCrimeShows;
