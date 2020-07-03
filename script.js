
document.getElementById('button').addEventListener('click', () => {
    let pokeId = document.getElementById('input').value;
    //fetch poke by ID or name
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let pokeName = data.species.name;
            document.getElementById('name').innerHTML = `Name: ${pokeName}`;
            function displayPokeInfo() {
                document.getElementById('pokeId').innerHTML = `ID: ${data.id}`;
                document.getElementById('sprite').innerHTML = `<img id="front" class="img" src="${data.sprites.front_shiny}" alt="frontImg"><img id="back" class="img" src="${data.sprites.back_shiny}" alt="backImg">`;
                document.getElementById('moves').innerHTML = '';
                let moves = data.moves.slice(0, 4);
                moves.forEach(move => {
                    console.log(move.move.name);
                    document.getElementById('moves').innerHTML += `<div class="move">${move.move.name}</div> `;
                })
            }
            displayPokeInfo();

            //fetch previous evolution of pokemon
            document.getElementById('prev').addEventListener('click', () => {
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        if (data.evolves_from_species === null) {
                            document.getElementById('pokeInfo').innerHTML = `<span class="text-capitalize">${pokeName}</span> is the baby.`;
                        } else {
                            baby = data.evolves_from_species.name;
                            console.log(baby);
                            fetch(`https://pokeapi.co/api/v2/pokemon/${baby}`)
                                .then(response => response.json())
                                .then(data => {
                                    document.getElementById('name').innerHTML = `Name: ${baby}`;
                                    if (baby === data.species.name) {
                                        document.getElementById('pokeId').innerHTML = `ID: ${data.id}`;
                                        document.getElementById('sprite').innerHTML = `<img id="front" class="img" src="${data.sprites.front_shiny}" alt="frontImg"><img id="back" class="img" src="${data.sprites.back_shiny}" alt="backImg">`;
                                        document.getElementById('moves').innerHTML = '';
                                        let moves = data.moves.slice(0, 4);
                                        moves.forEach(move => {
                                            console.log(move.move.name);
                                            document.getElementById('moves').innerHTML += `<div class="move">${move.move.name}</div> `;
                                        })
                                    }
                                })
                                .catch(error => console.error(error))
                        }
                    })
            })
                .catch(error => console.error(error))
        })
})

