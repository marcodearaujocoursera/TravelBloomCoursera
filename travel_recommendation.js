var apiUrl = "./travel_recommendation_api.json"
var apiData = ""
fetch(apiUrl)
  .then(response => response.json())
  .then(data => apiData = data)

function searchIntoApiData(search) {
    let placesFound = []
    Object.keys(apiData)
        .map((destinationType) => {
            let element = apiData[destinationType]
            if (destinationType.toLocaleLowerCase().includes(search)) {
                placesFound = placesFound.concat(element)
                return
            }
            element.filter(x => x.hasOwnProperty('cities')).map(element => 
                placesFound = placesFound.concat(
                    element.cities.filter(city => city.description.toLowerCase().includes(search))
                )
            )
    })
    return placesFound
}

function resetSearch() {
    document.getElementById("search").value = ""
    document.getElementById("results").innerHTML = ""
}



function doSearch() {
    let search = document.getElementById("search").value
    resetSearch()
    let results = searchIntoApiData(search)
    results.map(item => {
        addCard(item)
    })
}

function addCard(obj) {
    const card = document.createElement("div")
    const img = document.createElement("img")
    const container = document.createElement("div")
    const placeName = document.createElement("h4")
    const description = document.createElement("p")
    card.classList.add("resultCard")
    container.classList.add("container")
    img.src = getImages(obj.imageUrl)
    img.style = "height: 25em;width: 25em;"
    placeName.innerText = obj.name
    description.innerText = obj.description
    container.appendChild(placeName)
    container.appendChild(description)
    card.appendChild(img)
    card.appendChild(container)
    document.getElementById("results").appendChild(card)
}

function getImages(img) {
    switch (img) {
        case "enter_your_image_for_bora-bora.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/6/67/Bora_Bora-E-11915.JPG"
        case "enter_your_image_for_copacabana.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/6/62/Praia_de_Copacabana_-_Rio_de_Janeiro%2C_Brasil.jpg"
        case "enter_your_image_for_sydney.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/2/21/Sydney_Opera_House_with_Tall_Ship.jpg"
        case "enter_your_image_for_melbourne.jpg": 
            return "https://upload.wikimedia.org/wikipedia/commons/8/81/Melbourne_%28AU%29%2C_Melbourne_City_Centre_--_2019_--_1530-4.jpg"
        case "enter_your_image_for_tokyo.jpg": 
            return "https://upload.wikimedia.org/wikipedia/commons/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg"
        case "enter_your_image_for_kyoto.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/3/32/Kyoto01.jpg"
        case "enter_your_image_for_rio.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/9/98/Cidade_Maravilhosa.jpg"
        case "enter_your_image_for_sao-paulo.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/d/d0/Cidade_de_S%C3%A3o_Paulo.jpg"
        case "enter_your_image_for_angkor-wat.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/5/5d/Angkor_Wat%2C_Camboya%2C_2013-08-16%2C_DD_079.JPG"
        case "enter_your_image_for_taj-mahal.jpg":
            return "https://upload.wikimedia.org/wikipedia/commons/7/74/Taj_Mahal%2C_Agra%2C_India_edit2.jpg"
        default:
            return "https://upload.wikimedia.org/wikipedia/commons/b/bd/Ambigram_Wrong%21_Ignore_%2890_degrees_rotational_symmetry_-_animated%29.gif";
    }
}
