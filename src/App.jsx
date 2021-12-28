import React, { useState, useEffect } from "react";
import PokemeonList from "./PokemeonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemons, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  useEffect(() => {
    setLoading(true);
    
    async function getPokemon() {
      let cancel;
      await axios({
        method: "get",
        url: currentPageUrl,
        cancelToken: new axios.CancelToken((c) => {cancel = c}),
      })
      .then((res) => {
        setLoading(false);
        setPrevPageUrl(res.data.next);
        setNextPageUrl(res.data.previous);
        setPokemon(res.data.results);
      });
      return () => cancel.cancel();
    }

    getPokemon();
  }, [currentPageUrl]);

  function getPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  function getNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  return (
    <div className="App">
      {loading === true ? 
        <p>Loading ...</p>
       : 
        <PokemeonList pokemons={pokemons} />
      }
      <br />
      <br />
      <Pagination getPrevPage={prevPageUrl ? getPrevPage : null} getNextPage={nextPageUrl ? getNextPage : null} />
    </div>
  );
}

export default App;
