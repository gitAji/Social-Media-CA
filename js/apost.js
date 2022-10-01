
let params = new URLSearchParams(document.location.search);
let id = params.get("id"); 

async function getCard() {
    try {
        const api = `https://www.amiiboapi.com/api/amiibo/?id=${id}`;
        //console.log(api);
        const response = await fetch(api);
        //console.log(response);
        const data = await response.json();
        //console.log("Data:", data);
        listFullCard (data.amiibo, outElement);
    } catch (error) {
        outElement.innerHTML = `Could not fetch data...`;
    }
}

getCard();

function listFullCard(card, out) {
    console.log(card);
    document.title = card.name;
    document.querySelector("h1").innerHTML = card.name;
    const releases = getReleases(card.release);
    let newDiv = `<div id="${card.head}${card.tail}">
        <img src="${card.image}" alt="${card.name}">
        <p>Character:<br><strong>${card.character}</strong></p>
        <p>Game-series:<br><strong>${card.gameSeries}</strong></p>
        <p>Amiibo-series:<br><strong>${card.amiiboSeries}</strong></p>
        <p>Type:<br><strong>${card.type}</strong></p>
        <p>Released:</p>
        ${releases}
    </div>`;
    //console.log(newDiv);
    out.innerHTML = newDiv;
}

function getReleases(release) {
    let ul = "<ul>";
    for (const location in release) {
        //console.log(location, release[location]);
        ul += `<li>${location}: ${release[location]}</li>`;
    }
    ul += "</ul>";
    return ul;
}