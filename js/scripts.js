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
          let detailsContainer = document.querySelector('.modal-content'); //bootstrap modal
        detailsContainer.innerHTML = '';

        let details = document.createElement('div');
        details.classList.add('pokemon-details');

        let closeButton = document.createElement('button');
        closeButton.classList.add('close');
        closeButton.setAttribute('data-dismiss', 'modal'); //bootstrap hide/close modal
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.innerText = '×';

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

        let types = '';
        for (let i = 0; i < pokemon.types.length; i++) {
          if (i >= 1) {
          types += (' and ' + pokemon.types[i].type.name)
        } else {
          types += (pokemon.types[i].type.name)}};

        let writeTypes = 'Types: ' + types;

        let spriteContainer = document.createElement('div');
        spriteContainer.classList.add('pokemon-sprite');

        let spriteImg = document.createElement('img');
        spriteImg.src = pokemon.imageUrl;
        spriteImg.classList.add('pokemon-sprite','pokemon-details');

        detailsContent.innerText = `${writeWeight}
        ${writeHeight}
        ${writeTypes}`;
        
        spriteContainer.appendChild(closeButton);
        spriteContainer.appendChild(spriteImg);
        details.appendChild(spriteContainer);
        details.appendChild(detailsTitle);
        details.appendChild(detailsContent);
        detailsContainer.appendChild(details);
      })
    } // Details modal | show

    function hideDetails() {
      let detailsContainer = document.querySelector('.modal-content');
      detailsContainer.classList.remove('is-visible');
    } // Details modal | hide

    window.addEventListener('click', (e) => {
      let detailsContainer = document.querySelector('.modal-content');
      let target = e.target;

      if (target === detailsContainer && detailsContainer.classList.contains('is-visible')) {
        hideDetails();
      }
    }); // Details modal | Click outside to close

    function buttonListener(button, pokemon) {
        button.addEventListener('click', function(event){
            showDetails(pokemon)
        });
    } // Click to get details modal

    function addListItem(pokemon) {
        const list = document.querySelector('.list-group');
        const gridItem = document.querySelector('.row'); //bootstrap grid
        const listItem = document.createElement('li');
        const button = document.createElement('button');
    
        button.innerText = pokemon.name;
        button.classList.add('btn'); // bootstrap class
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', 'modal'); // bootstrap modal attr
        button.setAttribute('data-target', '#detailsModal'); // bootstrap modal attr
        listItem.appendChild(button); // append button to li
        listItem.classList.add('list-group-item');
        listItem.classList.add('col-sm-6');
        listItem.classList.add('col-lg-4');
        listItem.classList.add('col-12');
        gridItem.appendChild(listItem); // append li to bootstrap grid
        list.appendChild(gridItem); // append grid to list-group

        buttonListener(button, pokemon);
    }

    function showLoadingMessage() {
        const list = document.querySelector('.list-group');
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