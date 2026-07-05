async function loadOrders() {
    try {
        const response = await fetch("http://localhost:5050/orders");
        const orders = await response.json();

        const table = document.getElementById("orders-table");
        table.innerHTML = "";

        orders.forEach(order => {
            let productNames = "";
            let total = 0;

            if (order.cart && order.cart.length > 0) {
                order.cart.forEach(item => {
                    productNames += item.name + ", ";
                    total += item.price;
                });
            } else {
                productNames = "No products";
            }

            table.innerHTML += `
                <tr>
                    <td>${order.name}</td>
                    <td>${order.email}</td>
                    <td>${productNames}</td>
                    <td>PKR ${total}</td>
                    <td>${order.address}</td>
                    <td>${order.payment}</td>
                  <td>
                  <select onchange="changeStatus(this)">
                   <option>Pending</option>
                   <option>Delivered</option>
                  <option>Cancelled</option>
    </select>
</td>
                </tr>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

loadOrders();
function changeStatus(select) {
    alert("Status changed to: " + select.value);
}