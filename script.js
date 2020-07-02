
document.getElementById('button').addEventListener('click', () => {
    let pokeId = document.getElementById('input').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('pokeId').innerHTML = `ID: ${data.id}`;
            document.getElementById('name').innerHTML = `Name: ${data.species.name}`;
            document.getElementById('sprite').innerHTML = `<img id="pokeImg" class="img d-block mx-auto" src="${data.sprites.front_shiny}" alt="pokeImg">`;

            let moves = data.moves.slice(0, 4);
            moves.forEach(move => {
                console.log(move.move.name);
                document.getElementById('moves').innerHTML += `${move.move.name} `;
            })

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let baby = data.evolves_from_species.name;
                    if (baby != null) {
                        console.log(data.evolves_from_species.name);
                    }
                })
                .catch(error => console.error('Poke does not have evolution'));

        })
        .catch(error => console.error(error))
})

