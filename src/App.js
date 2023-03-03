import React, {useState, useEffect} from "react";
import "./App.css";
import "./index.css";
import axios from "axios";

function App() {
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
localStorage.theme = 'light'
localStorage.theme = 'dark'
localStorage.removeItem('theme')
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const reponse = await axios.get("https://restcountries.com/v3.1/all");
      setPosts(reponse.data);
      setLoading(false);
    };

    loadPosts();
  }, []);
  return (
    <div className="App">

      <h3>mmmh paté creme</h3>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => setSearchTitle(e.target.value)}
        />
      <div className="container bg-white border  dark:bg-gray-800 ">
        {loading ? ( <h1>loading...</h1> ) : ( posts.filter((value) => {
          if (searchTitle === "") {
            return value;
          } else if (
            value.name.common.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          }))
          .map((post) => <div key={post.name.common}>

          <div className="rxc1"> 
<div class="w-72  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded h-48" src={post.flags.png} alt="" />
    <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.name.common}</h5>
            <p class="mb-2 text-gray-600 dark:text-gray-400"><span className="gras"> Pays </span>{post.capital}</p>
            <p class="mb-2 text-gray-600 dark:text-gray-400"><span className="gras"> Region : </span>{post.region}</p>
            <p class="mb-2 text-gray-600 dark:text-gray-400"><span className="gras"> Population :  </span>{post.population}</p>

    </div>
</div>
</div>
          
          </div>) }
            </div>

      </div> ) }

      export default App;