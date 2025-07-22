let products = [];
const cardContainer = document.querySelector('.card-container');

let filterProducts = () => {
    const searchText = document.querySelector('#search');
    if (searchText.value === "") {
        displayCards()
        return
    }
    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchText.value.toLowerCase())
    })
    displayFilteredProducts(filteredProducts)
}

let displayFilteredProducts = (products) => {
    cardContainer.innerHTML =""
    products.forEach((product) => {
        const card = createCard(product);
        cardContainer.appendChild(card);
    })
}

let createCard = (product) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Create Name, Image & Price
    const h2 = document.createElement('h2');
    h2.textContent = product.name;
    const img = document.createElement('img');
    img.src = product.image;
    const p = document.createElement('p');
    p.textContent = product.price;

    const icon = document.createElement('i')
    icon.classList.add('ri-delete-bin-7-line')
    icon.classList.add('d-none')
    icon.setAttribute('id', product.id)

    icon.addEventListener('click', (event) => {
        const productId = event.target.id;
        const removeIndex = products.findIndex((ele) => ele.id == productId)
        products.splice(removeIndex, 1);
        displayCards()
        // card.remove();
    })

    card.appendChild(h2);
    card.appendChild(img)
    card.appendChild(p);
    card.appendChild(icon)

    return card;
}

let displayCards = () => {
    cardContainer.innerHTML =""
    products.forEach((product) => {
        const card = createCard(product);
        cardContainer.appendChild(card);
    })
}

let getProducts = async () => {
    const url = "http://localhost:5500/products.json";
    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        products = data;
        displayCards();
    }
}

getProducts();