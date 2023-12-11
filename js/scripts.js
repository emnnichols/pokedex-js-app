let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        loadDetails(pokemon).then(function() {
            console.log(pokemon)
        })
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
    
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        list.appendChild(listItem);

        buttonListener(button, pokemon);
    }

    function showLoadingMessage() {
        let list = document.querySelector('.pokemon-list');
        let loadingMessage = document.createElement('button');

        loadingMessage.innerText = 'Content Loading';
        loadingMessage.classList.add('pokemon-button','loading-message');
        list.appendChild(loadingMessage);
    };
    
    function hideLoadingMessage() {
        let hide = document.querySelector('.loading-message');

        hide.parentElement.removeChild(hide);
    };

    function loadList() {

        showLoadingMessage();

        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
            hideLoadingMessage()
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
            hideLoadingMessage()
          console.error(e);
        })
      }

      function loadDetails(pokemon) {

        showLoadingMessage();

        let url = pokemon.detailsUrl;

        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            hideLoadingMessage()
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.weight = details.weight;
          pokemon.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage()
          console.error(e);
        });
      }    
    
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
      };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)

    // let writeHeight = pokemon.height >= 1.0
    //     ? `Height: ${pokemon.height} m - Wow, that's big!`
    //     : `Height: ${pokemon.height} m`;
    });
});