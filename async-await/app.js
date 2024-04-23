let baseURL = "https://pokeapi.co/api/v2/pokemon"

// 1.
async function p1() {
    let res = await axios.get(`${baseURL}/?limit=1302`)
    console.log(res.data.results)
}
p1();

// 2.
async function p2() {
    let res = await axios.get(`${baseURL}/?limit=1302`)

    let randomPokemonUrls = []
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * res.data.count)
        let url = res.data.results[randomIdx].url
        randomPokemonUrls.push(url)
    }
    
    let pokemon = await Promise.all([
        axios.get(randomPokemonUrls[0]),
        axios.get(randomPokemonUrls[1]),
        axios.get(randomPokemonUrls[2])
    ])

    console.log(pokemon[0]);
    console.log(pokemon[1]);
    console.log(pokemon[2]);
}
p2()

// 3.
async function p3() {
    let res = await axios.get(`${baseURL}/?limit=1000`)

    let pokemonNames = []
    let speciesUrls = []
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * 1000)
        let name = res.data.results[randomIdx].name
        let url = `${baseURL}-species/${randomIdx}/`
        pokemonNames.push(name)
        speciesUrls.push(url)
    }
    
    let speciesData = await Promise.all([
        axios.get(speciesUrls[0]),
        axios.get(speciesUrls[1]),
        axios.get(speciesUrls[2])
    ])

    descriptions = speciesData.map(d => {
        let descriptionObj = d.data.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        return descriptionObj
          ? descriptionObj.flavor_text
          : "No description available.";
    });

    console.log(pokemonNames[0], ': ', descriptions[0]);
    console.log(pokemonNames[1], ': ', descriptions[1]);
    console.log(pokemonNames[2], ': ', descriptions[2]);
}
p3()

// 4.
let $btn = $("button");
let $pokeArea = $("#pokemon-area");

$btn.on('click', async function() {
    $pokeArea.empty()

    let res = await axios.get(`${baseURL}`)

    let pokemonUrls = []
    for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * res.data.results.length)
        let url = `${baseURL}/${randomIdx}/`
        pokemonUrls.push(url)
    }
    
    let pokemonData = await Promise.all([
        axios.get(pokemonUrls[0]),
        axios.get(pokemonUrls[1]),
        axios.get(pokemonUrls[2])
    ])
    //console.log(pokemonData)

    let speciesData = await Promise.all([
        axios.get(pokemonData[0].data.species.url),
        axios.get(pokemonData[1].data.species.url),
        axios.get(pokemonData[2].data.species.url)
    ]);
    //console.log(speciesData)

    speciesData.forEach((d, i) => {
        let descriptionObj = d.data.flavor_text_entries.find(
            entry => entry.language.name === "en"
        );
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let name = pokemonData[i].data.name;
        let imgSrc = pokemonData[i].data.sprites.front_default;
        $pokeArea.append(makePokeCard(name, imgSrc, description));
    });
})

function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
}
