import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedTVSeries } from "../utils/movieSlice"; // Redux action
import { API_OPTIONS } from "../utils/constant"; // API options

const useTopRatedTVSeries = () => {
  const dispatch = useDispatch(); // Get the dispatch function
  const topRatedTVSeries = useSelector(
    (store) => store.movies.topRatedTVSeries
  );
  // Function to fetch movies data

  const getTopRatedTVSeries = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        API_OPTIONS
      ); // Fetch data from the API
      const json = await data.json(); // Convert response to JSON
      console.log("useTopRatedTVSeries", json.results);
      dispatch(addTopRatedTVSeries(json.results)); // Dispatch the movie data to Redux
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any errors
    }
  };
  useEffect(() => {
    if (!topRatedTVSeries || topRatedTVSeries.length === 0) {
      getTopRatedTVSeries(); // Call the fetch function when the component mounts if no data exists
    }
  }, [topRatedTVSeries]);
};

export default useTopRatedTVSeries;
