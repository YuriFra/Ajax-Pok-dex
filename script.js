document.getElementById('button').addEventListener('click', () => {
    let pokeId = document.getElementById('input').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(response => response.json())
        .then(data => console.log(data))



        .catch(error => console.error(error))
})
