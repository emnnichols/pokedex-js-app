let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, weight: 6.9, type: ['grass','poison'] },
        { name: 'Ivysaur', height: 1.0, weight: 13.0, type: ['grass','poison'] },
        { name: 'Venusaur', height: 2.0, weight: 100.0, type: ['grass','poison'] },
        { name: 'Charmander', height: 0.6, weight: 8.5, type: ['fire'] },
        { name: 'Charmeleon', height: 1.1, weight: 19.0, type: ['fire'] },
        { name: 'Charizard', height: 1.7, weight: 90.5, type: ['fire','flying'] },
    ];

    function add(pokemon) {
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
            console.log(`Pokemon List has been updated!`);
        } else {
            return pokemon + ' is not a valid object';
        }
    }
    
    function getAll() {
        return pokemonList;
    }
    
      return {
        add: add,
        getAll: getAll
      };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    let writeHeight = pokemon.height >= 1.0
        ? `Height: ${pokemon.height} m - Wow, that's big!`
        : `Height: ${pokemon.height} m`;
    document.write(
        `<h2>${pokemon.name}</h2> 
        <p class="pokemon-info">${writeHeight} <br> 
        Weight: ${pokemon.weight} kg</p>`
        );
});