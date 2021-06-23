const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");

const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

const searchPokemon = (event) => {
  event.preventDefault();

  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((response) => renderPokemonData(response))
    .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
  // Obtenemos la imagen
  const sprite = data.sprites.front_default;
  // Desectructuramos de data los stats y los types
  const { stats, types } = data;

  pokeName.textContent = data.name.toUpperCase();
  pokeImg.setAttribute("src", sprite); // Al elemento img le agregamos el atributo src con el sprite
  pokeId.textContent = `N° ${data.id}`;

  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);
};

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  // Comprobamos que tenga un 2° color. Si lo tiene lo asignamos.
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  pokeImg.style.backgroundSize = ` 5px 5px`;
};

const renderPokemonTypes = (types) => {
  // Limpiamos los types para que no se sumen a los buscados anteriormente
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    // Creamos el div y le asignamos los estilos y el contenido del div
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    // Agregamos el div que creamos antes a pokeTypes
    pokeTypes.appendChild(typeTextElement);
  });
};

const renderPokemonStats = (stats) => {
  pokeStats.innerHTML = "";
  stats.forEach((stat) => {
    // Creamos 3 divs
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");

    // Añade el contenido a los divs
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;

    // Agregamos los divs al contenedos statElement
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    // Agregamos a pokeStats el contenedor
    pokeStats.appendChild(statElement);
  });
};

const renderNotFound = () => {
  pokeName.textContent = "Pokemon no encontrado";
  pokeImg.setAttribute("src", "./images/poke-default.png");
  pokeImg.style.background = "#fff";

  pokeTypes.innerHTML = "";
  pokeStats.innerHTML = "";
  pokeId.innerHTML = "";
};
