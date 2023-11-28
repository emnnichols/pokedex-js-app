let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        weight: 6.9,
        type: ['grass','poison']
    },
    {
        name: 'Ivysaur',
        height: 1.0,
        weight: 13.0,
        type: ['grass','poison']
    },
    {
        name: 'Venusaur',
        height: 2.0,
        weight: 100.0,
        type: ['grass','poison']
    },
    {
        name: 'Charmander',
        height: 0.6,
        weight: 8.5,
        type: ['fire']
    },
    {
        name: 'Charmeleon',
        height: 1.1,
        weight: 19.0,
        type: ['fire']
    },
    {
        name: 'Charizard',
        height: 1.7,
        weight: 90.5,
        type: ['fire','flying']
    },
];

for (let i=0; i < pokemonList.length; i++) {
    let pokemonName = pokemonList[i].name;
    let pokemonHeight = pokemonList[i].height;
    let pokemonWeight = pokemonList[i].weight;
    let writeHeight = pokemonHeight >= 1.0 
        ? `Height: ${pokemonHeight} m - Wow, that's big!` 
        : `Height: ${pokemonHeight} m`;
    document.write(`<h2>${pokemonName}</h2> <p class="pokemon-info">${writeHeight} <br> Weight: ${pokemonWeight} kg </p>`);
}