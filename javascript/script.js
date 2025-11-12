//Apenas pokemons da primeira geração, porque não conheço muito os novos xD
let pokemonId = Math.floor(Math.random() * 151) + 1;
let misses = 0;
let pokemonData = {};

const missesParagraph = document.getElementById('misses');
const pokeImg = document.getElementById('poke-img');
const pokeInput = document.getElementById('poke-input');

//Função para buscar os dados do Pokémon na API
async function fetchPokemon(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            alert('Erro ao buscar dados do Pokémon. Tente novamente.');
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        return data;
    } catch (error) { 
        console.log('Erro ao buscar dados do Pokémon:', error);
    }
    
}

//Função para exibir a imagem do Pokémon como silhueta
async function displayPokemonImage(sillouette = true) {
    try {
        pokemonData = await fetchPokemon(pokemonId);
        pokeImg.src = pokemonData.sprites.front_default;

        if (sillouette) {
            pokeImg.style.filter = 'brightness(0) contrast(0) invert(1)';
        } else {
            pokeImg.style.filter = '';
        }
    return;
    } catch (error) {
        console.log('Erro ao exibir a imagem do Pokémon:', error);
    }
}

function guessPokemon() {
    const userGuess = pokeInput.value.toLowerCase().trim();
    const pokemonName = pokemonData.name.toLowerCase();

    if (userGuess === '') {
        alert('Por favor, insira um nome de Pokémon.');
        return;
    }

    if (userGuess === pokemonName) {

        // Acertou
        alert(`Parabéns! Você acertou! É o ${pokemonData.name}!`);

        //Filtros e Animações
        pokeImg.style.filter = 'none';
        pokeImg.style.transition = 'filter 0.5s ease-in-out';

        //Borda verde no campo de input
        pokeInput.style.borderColor = 'green';
        pokeInput.style.transition = 'border-color 1s ease-in-out';

        //Reset o tipo de transição após a animação
        setTimeout(() => {
            pokeImg.style.transition = '';
        }, 500);

        //Reset da borda após 2 segundos
        setTimeout(() => {
            pokeInput.style.borderColor = '';
        }, 2000);

    } else {
        misses++;

        missesParagraph.textContent = `Tentativas erradas: ${misses}`;
        pokeInput.value = '';

        pokeInput.style.animation = 'shake 0.5s';
        pokeImg.style.animation = 'shake 0.5s';
        pokeInput.style.borderColor = 'red';

        setTimeout(() => {
            pokeImg.style.animation = '';
            pokeInput.style.animation = '';
            pokeInput.style.borderColor = '';
        }, 500);

    }
}

function tryAgain() {
    pokemonId = Math.floor(Math.random() * 151) + 1;
    misses = 0;
    missesParagraph.textContent = `Tentativas erradas: ${misses}`;
    pokeInput.value = '';
    displayPokemonImage();
}

displayPokemonImage();



