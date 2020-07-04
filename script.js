let pokeId;
let pokeName;
let chainId;

//fetch poke by ID or name
const displayPokeInfo = (pokeId) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(response => response.json())
        .then(data => {
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
            document.getElementById('prev').innerHTML = `<button id="prev" aria-label="previousSearch" type="button" class="btn btn-primary">CHILD</button>`
            document.getElementById('next').innerHTML = `<button id="next" aria-label="nextSearch" type="button" class="btn btn-danger">PARENT</button>`
            //.catch(error => console.error(error))
        })
}
document.getElementById('button').addEventListener('click', () => {
    pokeId = document.getElementById('input').value;
    displayPokeInfo(pokeId);
})

//fetch previous evolutions of poke
const displayPokeChild = (pokeName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            if (data.evolves_from_species === null) {
                document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> is the baby`;
            } else {
                pokeName = data.evolves_from_species.name;
                displayPokeInfo(pokeName);
            }
        })
    .catch(error => console.error(error))
}
document.getElementById('prev').addEventListener('click', () => {
    displayPokeChild(pokeName);
})

// fetch next evolutions of poke
const displayPokeParent = (pokeName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.evolution_chain === null) {
                document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> has no parent`;
            } else {
                chainId = data.evolution_chain.url.split('/')[6];
            }
            fetch(`https://pokeapi.co/api/v2/evolution-chain/${chainId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.chain.evolves_to);
                    let multiEvo = [];
                    let evoTo = data.chain.evolves_to;
                    if (evoTo.length === 0) {
                        document.getElementById('name').innerHTML = `<span class="text-capitalize">${pokeName}</span> has no evolution`;
                    } else {
                        if (evoTo.length > 1) {
                            for (let i = 0; i < evoTo.length; i++) {
                                multiEvo.push(evoTo[i].species.name);
                            }
                            if (multiEvo.includes(pokeName)) {
                                let nextEvo = evoTo[multiEvo.indexOf(pokeName) + 1].species.name;
                                displayPokeInfo(nextEvo);
                            } else {
                                displayPokeInfo(multiEvo.shift());
                            }
                        } else if (evoTo[0].species.name === pokeName) {
                            pokeName2 = evoTo[0].evolves_to[0].species.name;
                            displayPokeInfo(pokeName2);
                        } else if (evoTo[0].evolves_to[0].species.name === pokeName && evoTo[0].evolves_to[0].evolves_to.length === 0) {
                            document.getElementById('name').innerHTML = `<span class="text-capitalize">${evoTo[0].evolves_to[0].species.name}</span> has no evolution`;
                        }
                        else {
                            pokeName1 = evoTo[0].species.name;
                            displayPokeInfo(pokeName1);
                        }
                    }
                })
        })
}
document.getElementById('next').addEventListener('click', () => {
    displayPokeParent(pokeName);
})