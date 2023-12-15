const pokemonRepository = (function () {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
          let detailsContainer = document.querySelector('#details-container');
        detailsContainer.innerHTML = '';

        let details = document.createElement('div');
        details.classList.add('pokemon-details');

        let closeButton = document.createElement('button');
        closeButton.classList.add('details-close');
        closeButton.innerText = 'x';
        closeButton.addEventListener('click', hideDetails);

        let detailsTitle = document.createElement('h2');
        detailsTitle.innerText = pokemon.name;

        let detailsContent = document.createElement('p');
        // converts height to from decimeters to meters
        let meterHeight = pokemon.height / 10;
        let writeHeight = meterHeight >= 1.0
        ? `Height: ${meterHeight} m - Wow, that's big!`
        : `Height: ${meterHeight} m`;

        // converts weight to from hectograms to kilograms
        let writeWeight = 'Weight: ' + pokemon.weight / 10 + ' kg';

        let writeTypes = pokemon.types;

        let spriteContainer = document.createElement('div');
        spriteContainer.classList.add('pokemon-sprite');

        let spriteImg = document.createElement('img');
        spriteImg.src = pokemon.imageUrl;
        spriteImg.classList.add('pokemon-sprite','pokemon-details');

        detailsContent.innerText = `${writeWeight}
        ${writeHeight}
        Type: ${writeTypes}`;
        
        details.appendChild(spriteContainer);
        spriteContainer.appendChild(closeButton);
        spriteContainer.appendChild(spriteImg);
        details.appendChild(detailsTitle);
        details.appendChild(detailsContent);
        detailsContainer.appendChild(details);

        detailsContainer.classList.add('is-visible');

        detailsContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === detailsContainer) {
            hideDetails();
          }
        })
      })
    } // Details modal | show

    function hideDetails() {
      let detailsContainer = document.querySelector('#details-container');
      detailsContainer.classList.remove('is-visible');
    } // Details modal | hide

    window.addEventListener('keydown', (e) => {
      let detailsContainer = document.querySelector('#details-container');
      
      if (e.key === 'Escape' && detailsContainer.classList.contains('is-visible')) {
        hideDetails();
      }
    }); // Details modal | press Esc to close

    function buttonListener(button, pokemon) {
        button.addEventListener('click', function(event){
            showDetails(pokemon)
        });
    } // Click to get details modal

    function addListItem(pokemon) {
        const list = document.querySelector('.pokemon-list');
        const listItem = document.createElement('li');
        const button = document.createElement('button');
    
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        list.appendChild(listItem);

        buttonListener(button, pokemon);
    }

    function showLoadingMessage() {
        const list = document.querySelector('.pokemon-list');
        const loadingMessage = document.createElement('button');

        loadingMessage.innerText = 'Content Loading';
        loadingMessage.classList.add('pokemon-button','loading-message');
        list.appendChild(loadingMessage);
    }
    
    function hideLoadingMessage() {
        const hide = document.querySelector('.loading-message');

        hide.parentElement.removeChild(hide);
    }

    function loadList() {

        showLoadingMessage();

        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
            hideLoadingMessage()
          json.results.forEach(function (item) {
            const pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
            hideLoadingMessage()
          console.error(e);
        })
    } // Load API

    function loadDetails(pokemon) {

        showLoadingMessage();

        const url = pokemon.detailsUrl;

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
    });
});