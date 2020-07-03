let pokeId;
let pokeName;
let chainId;

//fetch poke by ID or name
const displayPokeInfo = (pokeId) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            pokeName = data.species.name;
            document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span>`;
            document.getElementById('pokeId').innerHTML = `ID: ${data.id}`;
            if (data.sprites.back_shiny === null) {
                document.getElementById('sprite').innerHTML = `<img id="front" class="img" src="${data.sprites.front_shiny}" alt="frontImg">`;
            } else {
                document.getElementById('sprite').innerHTML = `<img id="front" class="img" src="${data.sprites.front_shiny}" alt="frontImg"><img id="back" class="img" src="${data.sprites.back_shiny}" alt="backImg">`;
            }
            document.getElementById('moves').innerHTML = '';
            let moves = data.moves.slice(0, 4);
            moves.forEach(move => {
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

const displayPokeChild = (pokeName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.evolves_from_species === null) {
                document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> is the baby`;
            } else {
                pokeName = data.evolves_from_species.name;
                displayPokeInfo(pokeName);
            }
            chainId = data.evolution_chain.url.split('/')[6];
            console.log(chainId);
        })
    //.catch(error => console.error(error))
}
//fetch previous evolutions of poke
document.getElementById('prev').addEventListener('click', () => {
    displayPokeChild(pokeName);
})

// fetch next evolutions of poke
document.getElementById('next').addEventListener('click', () => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.evolution_chain === null) {
                document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> has no parent`;
            } else {
                chainId = data.evolution_chain.url.split('/')[6];
                console.log(chainId);
                fetch(`https://pokeapi.co/api/v2/evolution-chain/${chainId}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.chain.evolves_to[0].species.name);
                        //while (data.chain.evolves_to[0].length > 0) {}
                        if (data.evolves_from_species === null) {
                            document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> is the parent`;
                        } else {
                            if (data.chain.evolves_to.length === 1) {
                                pokeName = data.chain.evolves_to[0].species.name;
                                displayPokeInfo(pokeName);
                            }

                        }

                    })
            }
        })
})





/*
fetch(`https://pokeapi.co/api/v2/evolution-chain/${chainId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.chain.evolves_to[0].species.name);
        //while (data.chain.evolves_to[0].length > 0) {}
        if (data.evolves_from_species === null) {
            document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> is the parent`;
        } else {
            pokeName = data.chain.evolves_to[0].species.name;
            displayPokeInfo(pokeName);
        }
    })

 */