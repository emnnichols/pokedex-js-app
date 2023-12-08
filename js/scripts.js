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

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    function buttonListener(button, pokemon) {
        button.addEventListener('click', function(event){
            showDetails(pokemon)
        });
    }

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
    
        button.innerText = pokemon;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        list.appendChild(listItem);

        buttonListener(button, pokemon);
    }
    
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
      };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon.name)

    // let writeHeight = pokemon.height >= 1.0
    //     ? `Height: ${pokemon.height} m - Wow, that's big!`
    //     : `Height: ${pokemon.height} m`;
});