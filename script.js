let pokeId;
let pokeName;

//fetch poke by ID or name
const displayPokeInfo = (pokeId) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            pokeName = data.species.name;
            document.getElementById('name').innerHTML = `Name: <span class="text-capitalize">${pokeName}</span>`;
            document.getElementById('pokeId').innerHTML = `ID: ${data.id}`;
            if (data.sprites.back_shiny === null) {
                document.getElementById('sprite').innerHTML = `<img id="front" class="img" src="${data.sprites.front_shiny}" alt="frontImg">`;
            } else {
                document.getElementById('sprite').innerHTML = `<img id="front" class="img" src="${data.sprites.front_shiny}" alt="frontImg"><img id="back" class="img" src="${data.sprites.back_shiny}" alt="backImg">`;
            }

            document.getElementById('moves').innerHTML = '';
            let moves = data.moves.slice(0, 4);
            moves.forEach(move => {
                console.log(move.move.name);
                document.getElementById('moves').innerHTML += `<div class="move">${move.move.name}</div> `;
            })
            //.catch(error => console.error(error))
        })
}

// input poke name or ID and click to fetch poke info
document.getElementById('button').addEventListener('click', () => {
    pokeId = document.getElementById('input').value;
    displayPokeInfo(pokeId);
})

//fetch previous evolution of poke
document.getElementById('prev').addEventListener('click', () => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.evolves_from_species === null) {
                document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> is the baby`;
            } else {
                pokeName = data.evolves_from_species.name;
                console.log(pokeName);
                displayPokeInfo(pokeName);
            }
        })
})
//.catch(error => console.error(error))


