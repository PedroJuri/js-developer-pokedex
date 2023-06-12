const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
// Adicione essa linha no início do arquivo main.js
let pokemons = [];


const maxRecords = 151


function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) =>
        `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`
        ).join('')
        pokemonList.innerHTML += newHTML
    })
}


loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})

function showPokemonDetails(pokemon) {
    const modal = document.getElementById('pokemonModal');
    const modalContent = modal.querySelector('.modal-content');

    modalContent.innerHTML = `
      <h2>${pokemon.name}</h2>
      <p>Number: ${pokemon.number}</p>
      <p>Types: ${pokemon.types.join(', ')}</p>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
    `;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'none';
}  


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const modalCloseButton = document.querySelector('.modal-close');
        modalCloseButton.addEventListener('click', () => {
        closeModal();
        });

        const newHTML = pokemons
        .map(
          (pokemon) =>
            `<li class="pokemon ${pokemon.type}">
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>
              <div class="detail">
                <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
              </div>
            </li>`
        )
        .join('');
      pokemonList.innerHTML += newHTML;

      const pokemonElements = document.querySelectorAll('.pokemon');
      pokemonElements.forEach((pokemonElement) => {
      pokemonElement.addEventListener('click', () => {
        const pokemonName = pokemonElement.querySelector('.name').textContent;
        const pokemonNumber = pokemonElement.querySelector('.number').textContent;
        const pokemonTypes = Array.from(pokemonElement.querySelectorAll('.type')).map((typeElement) => typeElement.textContent);
        const pokemonPhoto = pokemonElement.querySelector('img').getAttribute('src');

        const pokemon = {
        name: pokemonName,
        number: pokemonNumber,
        types: pokemonTypes,
        photo: pokemonPhoto
        };

        showPokemonDetails(pokemon);
    });
    });

  
      // Atualiza a variável global 'pokemons'
      pokemons.push(...pokemons);
    });
}
  

// Adiciona um evento de clique a cada item de Pokémon
pokemonList.addEventListener('click', (event) => {
    const pokemonItem = event.target.closest('.pokemon');
    if (pokemonItem) {
      const pokemonName = pokemonItem.querySelector('.name').textContent;
      const pokemon = pokemons.find((p) => p.name === pokemonName);
      if (pokemon) {
        showPokemonDetails(pokemon);
      }
    }
  });
  
  // Fecha o modal ao clicar no botão de fechar
const closeButton = document.querySelector('.modal-close');
closeButton.addEventListener('click', () => {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'none';
});
  