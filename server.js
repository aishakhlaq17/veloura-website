const express = require("express");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

console.log("MY NEW SERVER FILE IS RUNNING");

// Gmail transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shoppveloura@gmail.com",
        pass: "swun wgta lrlc tpdl" // Your Gmail App Password
    }
});

// PLACE ORDER
app.post("/place-order", async (req, res) => {
    try {
        const order = req.body;
        console.log("ORDER RECEIVED:", order);

        // Save order to orders.json
        let orders = [];
        if (fs.existsSync("orders.json")) {
            orders = JSON.parse(fs.readFileSync("orders.json"));
        }

        orders.push(order);
        fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

        // Product list
        let productList = "";
        let subtotal = 0;

        if (order.cart && order.cart.length > 0) {
            order.cart.forEach(item => {
                productList += `${item.name} - PKR ${item.price}\n`;
                subtotal += Number(item.price);
            });
        } else {
            productList = "No products found";
        }

        let finalTotal = subtotal + Number(order.shipping || 0);

        // Email
        let mailOptions = {
            from: "shoppveloura@gmail.com",
            to: order.customer.email,
            subject: "Veloura Order Confirmation",
            text: `Hello ${order.customer.name},

Thank you for shopping with Veloura ✨

Your Order:
${productList}

Subtotal: PKR ${subtotal}
Shipping: PKR ${order.shipping}
Total: PKR ${finalTotal}

Payment Method: ${order.paymentMethod}

Shipping Address:
${order.customer.address}, ${order.customer.city}

Phone:
${order.customer.phone}

Your order will be dispatched soon.`
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "Order placed successfully"
        });

    } catch (error) {
        console.log("SERVER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

// ADMIN ROUTE
app.get("/orders", (req, res) => {
    let orders = [];

    if (fs.existsSync("orders.json")) {
        orders = JSON.parse(fs.readFileSync("orders.json"));
    }

    res.json(orders);
});

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Veloura server working");
});

// START SERVER
app.listen(5050, () => {
    console.log("Server running on port 5050");
});