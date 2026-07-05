function showProduct(product) {
    let title = "";
    let price = "";
    let description = "";

    if (product === "matte") {
        title = "MATTE BLACK";
        price = "PKR 550";
        description = "A timeless premium satin bandana designed for effortless elegance and everyday luxury.";
    }

    else if (product === "snow") {
        title = "SNOW VEIL";
        price = "PKR 550";
        description = "Soft ivory bandana with delicate detailing for graceful feminine styling.";
    }

    else if (product === "noir") {
        title = "NOIR LACE";
        price = "PKR 550";
        description = "Black satin bandana finished with signature lace trim for bold luxury.";
    }

    else if (product === "opal") {
        title = "OPAL PEARL";
        price = "PKR 550";
        description = "Elegant pearl-detailed bandana crafted for soft luxury styling.";
    }

    else if (product === "gardenia") {
        title = "GARDENIA";
        price = "PKR 550";
        description = "A graceful floral-inspired bandana with premium finishing.";
    }

    else if (product === "lacenoir") {
        title = "LACE NOIR";
        price = "PKR 550";
        description = "Bold black luxury bandana with delicate lace detail.";
    }

    else if (product === "checklace") {
        title = "CHECK LACE";
        price = "PKR 350";
        description = "Soft statement scrunchie with lace accents.";
    }

    else if (product === "eira") {
        title = "EIRA LACE";
        price = "PKR 350";
        description = "Minimal yet elegant scrunchie for timeless styling.";
    }

    else if (product === "aura") {
        title = "LACE AURA";
        price = "PKR 350";
        description = "Luxury lace scrunchie crafted for everyday elegance.";
    }

    else if (product === "luna") {
        title = "LUNA PEARL";
        price = "PKR 350";
        description = "Pearl-detailed scrunchie designed for soft glamour.";
    }

    else if (product === "pearlnoir") {
        title = "PEARL NOIR";
        price = "PKR 350";
        description = "Dark luxury scrunchie with pearl detailing.";
    }

    else if (product === "raven") {
        title = "RAVEN LACE";
        price = "PKR 350";
        description = "Bold signature black scrunchie with refined lace finish.";
    }

    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-price").innerText = price;
    document.getElementById("popup-description").innerText = description;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth"
    });
}

window.onclick = function(event) {
    let popup = document.getElementById("popup");

    if (event.target === popup) {
        popup.style.display = "none";
    }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartCount = document.getElementById("cart-count");
if (cartCount) {
    cartCount.innerText = cart.length;
}
const productImages = {
    "MATTE BLACK": "images/MATTE BLACK.png",
    "SNOW VEIL": "images/SNOW VEIL.png",
    "NOIR LACE": "images/NOIR LACE.jpeg",
    "OPAL PEARL": "images/opal pearl.png.jpeg",
    "GARDENIA": "images/gardenia.png.jpeg",
    "LACE NOIR": "images/lace noir.png.jpeg",
    "CHECK LACE": "images/checklace.png.jpeg",
    "EIRA LACE": "images/eira lace.png.jpeg",
    "LACE AURA": "images/lace aura.png.jpeg",
    "LUNA PEARL": "images/luna pearl.png.jpeg",
    "PEARL NOIR": "images/pearl noir.png.jpeg",
    "RAVEN LACE": "images/raven lace.png.jpeg"
};
function openCart() {
    let sidebar = document.getElementById("cart-sidebar");
    let overlay = document.getElementById("cart-overlay");

    sidebar.style.right = "0";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";

    updateCart();
}

function closeCart() {
    document.getElementById("cart-sidebar").style.right = "-420px";
    document.getElementById("cart-overlay").style.opacity = "0";
    document.getElementById("cart-overlay").style.pointerEvents = "none";
}

function addToCart(name, price) {
    cart.push({
        name: name,
        price: price,
        image: productImages[name]
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    updateCart();
    openCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let total = 0;

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin:12px 0;">
                    <span>${item.name} - PKR ${item.price}</span>
                    <button onclick="removeFromCart(${index})">X</button>
                </div>
            `;
            total += item.price;
        });
    }

    let totalElement = document.getElementById("cart-total");
    if (totalElement) {
        totalElement.innerText = total;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    updateCart();
}

window.addEventListener("load", function () {
    let loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 1000);
        }, 1500);
    }
});

let searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            let value = this.value.toLowerCase().trim();

            if (value.includes("matte")) {
                window.location.href = "product.html?id=matte";
            }
            else if (value.includes("snow")) {
                window.location.href = "product.html?id=snow";
            }
            else if (value.includes("noir")) {
                window.location.href = "product.html?id=noir";
            }
            else if (value.includes("opal")) {
                window.location.href = "product.html?id=opal";
            }
            else if (value.includes("gardenia")) {
                window.location.href = "product.html?id=gardenia";
            }
            else if (value.includes("lace noir")) {
                window.location.href = "product.html?id=lacenoir";
            }
            else if (value.includes("check")) {
                window.location.href = "product.html?id=checklace";
            }
            else if (value.includes("eira")) {
                window.location.href = "product.html?id=eira";
            }
            else if (value.includes("aura")) {
                window.location.href = "product.html?id=aura";
            }
            else if (value.includes("luna")) {
                window.location.href = "product.html?id=luna";
            }
            else if (value.includes("pearl")) {
                window.location.href = "product.html?id=pearlnoir";
            }
            else if (value.includes("raven")) {
                window.location.href = "product.html?id=raven";
            }
            if (value.includes("bandana") || value.includes("bandanas")) {
    document.getElementById("bandanas").scrollIntoView({
        behavior: "smooth"
    });
}
else if (value.includes("scrunchie") || value.includes("scrunchies")) {
    document.getElementById("scrunchies").scrollIntoView({
        behavior: "smooth"
    });
}
            else {
                alert("Product not found");
            }
        }
    });
}

window.addEventListener("load", function () {
    let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = savedCart;

    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    updateCart();

    const params = new URLSearchParams(window.location.search);

    if (params.get("cart") === "open") {
        openCart();
    }
});
function orderOnWhatsApp() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let message = "Hello Veloura! I want to place an order:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        message += `${item.name} - PKR ${item.price}%0A`;
        total += Number(item.price);
    });

    message += `%0A Total: PKR ${total}`;

    window.open(`https://wa.me/923390130409?text=${message}`, "_blank");
}