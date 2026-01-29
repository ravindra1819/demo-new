import { useEffect, useRef, useState } from "react";

function SearchFruits() {

  const [search, setSearch] = useState("");
  const [debounceSearch, SetDebounceSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const cacheRef = useRef([]);

  // Debounce logic of 3000ms //
  useEffect(() => {
    const timer = setTimeout(() => {
      SetDebounceSearch(search.trim())
    }, 3000);
    return () => clearTimeout(timer)
  }, [search])

  // Fetch + Cache logic
    useEffect(() => {
    if (!debounceSearch) {
      setResults([]);
      return;
    }

    // ✅ Serve from cache (no fetch)
    if (cacheRef.current[debounceSearch]) {
      console.log("FROM CACHE:", debounceSearch);
      setResults(cacheRef.current[debounceSearch]);
      return;
    }

    console.log("FETCH fruits.json");
    setLoading(true);

    fetch("/src/debounceExample/fruits.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((fruit) =>
          fruit.toLowerCase().includes(debounceSearch.toLowerCase())
        );

        cacheRef.current[debounceSearch] = filtered;
        setResults(filtered);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debounceSearch]);

  return (
    <div style={{ width: "320px", margin: "40px auto" }}>
      <input
        type="text"
        placeholder="Search fruits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />

      {loading && <p>Loading...</p>}

      <ul>
        {results.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFruits;