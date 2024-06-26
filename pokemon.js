//gen 1 only
const gen1= 151 ;
const listWrapper = document.querySelector(".list-wrapper");
const nameFilter = document.querySelector('#name');
const numberFilter = document.querySelector('#number');
const notFound = document.querySelector('#not-found');

let allPokemon = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=
${gen1}`)
.then((response) => response.json())
.then((data) =>{
    allPokemon = data.results;
    console.log(allPokemon);
displayPokemon(allPokemon);
}) ;

async function fetchPokemonData(id){
try{
    const [pokemon, species] = await Promise.
    all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => 
        res.json()
    ),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => 
        res.json()
    )
])
return true
} catch (err){
    console.log("fetch pokemon data failed")
}
}

function displayPokemon(pokemon){
    listWrapper.innerHTML = "";

    pokemon.forEach((pokemon) =>{
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML - `
        <div class = number-wrap>
        <p class = "caption-fonts">#${pokemonID}</p>
        </div>
        <div class = img-wrap>
    <img src = "https://raw.githubusercontent.com/pokeapi
    /sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg"
    alt = "${pokemon.name}"/>
        </div>
        <div class = name-wrap>
        <p class = "body3-fonts">#${pokemon.name}</p>
        </div>
        `
        listItem.addEventListener("click", async () => {
            const success = await
            fetchPokemonData(pokemonID);
            if (success){
                window.location.href = `/detail.html?id=${pokemonID}`
            }        });
listWrapper.appendChild(listItem);
    }) ;
}