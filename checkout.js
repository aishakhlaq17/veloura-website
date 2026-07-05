let shipping = 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Load checkout items */
function loadCheckout() {
    let container = document.getElementById("checkout-items");
    let subtotal = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("subtotal-price").innerText = "PKR 0";
        document.getElementById("shipping-price").innerText = "PKR 0";
        document.getElementById("checkout-total").innerText = "PKR 0";
        return;
    }

    cart.forEach(item => {
        container.innerHTML += `
            <div class="checkout-item">
                <div class="item-left">
                    <img src="${item.image || 'images/logo.png.jpeg'}" alt="${item.name}" class="product-thumb">
                    <div>
                        <b>${item.name}</b>
                    </div>
                </div>
                <span>PKR ${item.price}</span>
            </div>
        `;
        subtotal += Number(item.price);
    });

    document.getElementById("subtotal-price").innerText = `PKR ${subtotal}`;
    document.getElementById("shipping-price").innerText = `PKR ${shipping}`;
    document.getElementById("checkout-total").innerText = `PKR ${subtotal + shipping}`;
}

/* Payment method */
function showPaymentDetails() {
    let payment = document.getElementById("payment").value;
    let box = document.getElementById("payment-details");

    if (payment === "cod") {
        shipping = 300;
        box.innerHTML = `
            <b>Cash on Delivery</b><br>
            Shipping Charges: PKR 300
        `;
    }
    else if (payment === "easypaisa") {
        shipping = 0;
        box.innerHTML = `
            <b>Easypaisa</b><br>
            Account Title: AYESHA AKHLAQ<br>
            Number: 03084818833
        `;
    }
    else if (payment === "jazzcash") {
        shipping = 0;
        box.innerHTML = `
            <b>JazzCash</b><br>
            Account Title: AYESHA AKHLAQ<br>
            Number: 03084818833
        `;
    }
    else if (payment === "bank") {
        shipping = 0;
        box.innerHTML = `
            <b>Soneri Bank</b><br>
            Account Title: NASEEM AKHLAQ<br>
            Account Number: 20016088488<br>
            IBAN: PK24SONE00423200116088488
        `;
    }

    loadCheckout();
}

/* Place order */
async function placeOrder() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let payment = document.getElementById("payment").value;

    if (!name || !email || !address || !city || !phone) {
        alert("Please fill all fields.");
        return;
    }

    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    const order = {
        customer: {
            name,
            email,
            address,
            city,
            phone
        },
        paymentMethod: payment,
        shipping: shipping,
        cart: cart
    };

    try {
        const response = await fetch("https://veloura-backend.onrender.com/place-order") {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Order placed successfully!");
            localStorage.removeItem("cart");
            window.location.href = "index.html";
        } else {
            alert(data.message || "Failed to place order");
        }
    } catch (error) {
        console.log(error);
        alert("Server connection failed.");
    }
}

/* Start page */
showPaymentDetails();
loadCheckout();