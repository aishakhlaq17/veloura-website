const products = {
    matte: {
        name: "MATTE BLACK",
        price: 550,
        image: "images/MATTE BLACK.png",
        description: "A timeless premium satin bandana designed for effortless elegance.",
        details: "Premium satin bandana crafted for timeless everyday elegance. Lightweight, breathable, silky smooth and comfortable for all-day wear. Perfect for casual styling, evening looks and special occasions.",
        care: [
            "Hand wash with cold water",
            "Do not bleach",
            "Air dry only",
            "Iron on low heat if required",
            "Store folded in a dry place"
        ]
    },

    snow: {
        name: "SNOW VEIL",
        price: 550,
        image: "images/SNOW VEIL.png",
        description: "Soft ivory bandana with delicate detailing for graceful styling.",
        details: "Luxury ivory satin bandana finished with delicate lace trim. Soft, elegant and designed to elevate every outfit.",
        care: [
            "Hand wash only",
            "Do not bleach",
            "Air dry in shade",
            "Steam gently if needed",
            "Avoid rough surfaces"
        ]
    },

    noir: {
        name: "NOIR LACE",
        price: 550,
        image: "images/NOIR LACE.jpeg",
        description: "Black satin bandana finished with signature lace trim.",
        details: "Premium black satin bandana with elegant lace detailing. A timeless luxury accessory for effortless sophistication.",
        care: [
            "Cold hand wash",
            "Do not wring",
            "Air dry only",
            "Iron on low heat",
            "Store neatly"
        ]
    },

    opal: {
        name: "OPAL PEARL",
        price: 550,
        image: "images/opal pearl.png.jpeg",
        description: "Elegant pearl-detailed bandana crafted for soft luxury styling.",
        details: "Premium satin bandana featuring delicate pearl embellishments for an elegant and luxurious finish.",
        care: [
            "Hand wash carefully",
            "Avoid rubbing pearls",
            "Do not bleach",
            "Air dry",
            "Store flat"
        ]
    },

    gardenia: {
        name: "GARDENIA",
        price: 550,
        image: "images/gardenia.png.jpeg",
        description: "Graceful floral-inspired bandana with premium finishing.",
        details: "Soft luxury satin bandana inspired by floral elegance. Lightweight, breathable and comfortable.",
        care: [
            "Cold hand wash",
            "Do not bleach",
            "Air dry",
            "Low heat ironing",
            "Keep away from sharp objects"
        ]
    },

    lacenoir: {
        name: "LACE NOIR",
        price: 550,
        image: "images/lace noir.png.jpeg",
        description: "Bold black luxury bandana with delicate lace detail.",
        details: "Luxury black satin bandana finished with beautiful lace edges for premium styling.",
        care: [
            "Hand wash",
            "Do not bleach",
            "Air dry",
            "Iron on low heat",
            "Store folded"
        ]
    },

    checklace: {
        name: "CHECK LACE",
        price: 350,
        image: "images/checklace.png.jpeg",
        description: "Soft statement scrunchie with lace accents.",
        details: "Premium satin scrunchie with delicate lace detailing. Comfortable, soft and gentle on hair.",
        care: [
            "Hand wash only",
            "Air dry",
            "Do not bleach",
            "Keep away from perfume",
            "Store dry"
        ]
    },

    eira: {
        name: "EIRA LACE",
        price: 350,
        image: "images/eira lace.png.jpeg",
        description: "Minimal yet elegant scrunchie for timeless styling.",
        details: "Elegant satin scrunchie finished with lace accents. Designed for effortless everyday luxury.",
        care: [
            "Cold hand wash",
            "Do not bleach",
            "Air dry",
            "Do not twist",
            "Store safely"
        ]
    },

    aura: {
        name: "LACE AURA",
        price: 350,
        image: "images/lace aura.png.jpeg",
        description: "Luxury lace scrunchie crafted for everyday elegance.",
        details: "Soft premium satin scrunchie featuring elegant lace for a sophisticated everyday look.",
        care: [
            "Hand wash",
            "Air dry",
            "Avoid bleach",
            "Iron not required",
            "Store in pouch"
        ]
    },

    luna: {
        name: "LUNA PEARL",
        price: 350,
        image: "images/luna pearl.png.jpeg",
        description: "Pearl-detailed scrunchie designed for soft glamour.",
        details: "Premium satin scrunchie with elegant pearl embellishments. Adds luxury to any hairstyle.",
        care: [
            "Wash gently",
            "Protect pearls",
            "Do not bleach",
            "Air dry",
            "Store separately"
        ]
    },

    pearlnoir: {
        name: "PEARL NOIR",
        price: 350,
        image: "images/pearl noir.png.jpeg",
        description: "Dark luxury scrunchie with pearl detailing.",
        details: "Elegant black satin scrunchie featuring premium pearl embellishments for timeless luxury.",
        care: [
            "Hand wash",
            "Avoid harsh chemicals",
            "Air dry",
            "Handle pearls carefully",
            "Store in dry place"
        ]
    },

    raven: {
        name: "RAVEN LACE",
        price: 350,
        images: [
            "images/raven lace.png.jpeg",
            "images/raven lace.png.jpeg",
            "images/raven lace.png.jpeg"
        ],
        description: "Bold signature black scrunchie with refined lace finish.",
        details: "Signature Veloura black satin scrunchie finished with luxury lace for elegant everyday styling.",
        care: [
            "Hand wash",
            "Air dry",
            "Do not bleach",
            "Iron on low heat if needed",
            "Store folded"
        ]
    }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products[productId];

let quantity = 1;
let currentImage = 0;

if (product) {

    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = "PKR " + product.price;
    document.getElementById("product-description").innerText = product.description;

    // NEW
    document.getElementById("product-details").innerText = product.details;

    let list = "";

    product.care.forEach(item => {
        list += `<li>${item}</li>`;
    });

    document.getElementById("care-tips").innerHTML = list;

    if (product.images) {
        document.getElementById("product-image").src = product.images[0];
        renderThumbnails();
    } else {
        document.getElementById("product-image").src = product.image;
    }

} else {
    alert("Product not found");
}

function increaseQty() {
    quantity++;
    document.getElementById("qty").innerText = quantity;
}

function decreaseQty() {
    if (quantity > 1) {
        quantity--;
        document.getElementById("qty").innerText = quantity;
    }
}

function addProductToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    for(let i = 0; i < quantity; i++){
        cart.push({
            name: product.name,
            price: product.price
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    openCart();   // <-- opens the sidebar
}

function openCart() {
    document.getElementById("cart-sidebar").style.right = "0";
    document.getElementById("cart-overlay").style.opacity = "1";
    document.getElementById("cart-overlay").style.pointerEvents = "auto";
    updateCart();
}

function closeCart() {
    document.getElementById("cart-sidebar").style.right = "-420px";
    document.getElementById("cart-overlay").style.opacity = "0";
    document.getElementById("cart-overlay").style.pointerEvents = "none";
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin:12px 0;">
                    <span>${item.name} - PKR ${item.price}</span>
                    <button onclick="removeFromCart(${index})">X</button>
                </div>
            `;
            total += item.price;
        });
    }

    document.getElementById("cart-total").innerText = total;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function renderThumbnails() {
    const container = document.getElementById("thumbnail-container");

    if (!container || !product.images) return;

    container.innerHTML = "";

    product.images.forEach((img, index) => {
        container.innerHTML += `
            <img src="${img}" onclick="selectImage(${index})">
        `;
    });
}

function selectImage(index) {
    currentImage = index;
    document.getElementById("product-image").src = product.images[index];
}

function nextImage() {
    if (!product.images) return;

    currentImage++;

    if (currentImage >= product.images.length) {
        currentImage = 0;
    }

    document.getElementById("product-image").src = product.images[currentImage];
}

function prevImage() {
    if (!product.images) return;

    currentImage--;

    if (currentImage < 0) {
        currentImage = product.images.length - 1;
    }

    document.getElementById("product-image").src = product.images[currentImage];
}

window.onload = function () {
    updateCart();
    loadRecommendations();
     const grid = document.getElementById("recommendation-grid");

    if (!grid || !product) return;

    grid.innerHTML = "";

    for (const id in products) {

        if (id === productId) continue;

        const item = products[id];

        const image = item.images ? item.images[0] : item.image;

        grid.innerHTML += `
            <div class="recommendation-card"
                 onclick="window.location.href='product.html?id=${id}'">

                <img src="${image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>PKR ${item.price}</p>

            </div>
        `;
    }
}
function orderOnWhatsApp() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Hello Veloura! ✨\n\nI'd like to order:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} - PKR ${item.price}\n`;
        total += item.price;
    });

    message += `\nTotal: PKR ${total}`;

    const phone = "923001234567"; // Replace with your number

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}
function loadRecommendations(){

    const grid=document.getElementById("recommendation-grid");

    if(!grid) return;

    grid.innerHTML="";

    Object.keys(products).forEach(id=>{

        if(id===productId) return;

        const item=products[id];

        const image=item.images ? item.images[0] : item.image;

        grid.innerHTML+=`

        <div class="recommendation-card"
        onclick="window.location.href='product.html?id=${id}'">

            <img src="${image}">

            <h3>${item.name}</h3>

            <p>PKR ${item.price}</p>

        </div>

        `;

    });

}