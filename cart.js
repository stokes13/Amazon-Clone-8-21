function getCartItems() {
    db.collection('cart-items').onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
}

function decreaseCount(itemId) {
    let cartItem = db.collection('cart-items').doc(itemId);
    cartItem.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().quantity > 1) {
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}
function increaseCount(itemId) {
    let cartItem = db.collection('cart-items').doc(itemId);
    cartItem.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().quantity >= 1) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}
function deleteItem(itemId) {
    db.collection("cart-items").doc(itemId).delete();
}
function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML +=
            `
        <div class="cart-item flex items-center pb-4 border-b border-gray-100">
        <div class="cart-item-image w-40 h-24 bg-gray-100 p-4 rounded-lg">
            <img class='w-full h-full object-contain'
                src=${item.image}'>
        </div>

        <div class="cart-item-details flex-grow cursor-pointer">
            <div class="cart-item-title font-bold text-sm text-gray-300 mx-2 hover:text-yellow-500 ">
                ${item.name}
            </div>
            <div class="cart-item-brand text-sm text-gray-300 mx-2">
                ${item.brand}
            </div>
        </div>
        <div class="cart-item-counter w-48 flex items-center">
            <div
            data-id="${item.id}" class=" chevron-left cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-300 mr-2">
                <i class="fas fa-chevron-left fa-xs"></i>
            </div>
            <h4 class="text-gray-400 ">${item.quantity}</h4>
            <div
            data-id="${item.id}" class="chevron-right cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-300 ml-2">
                <i class="fas fa-chevron-right fa-xs"></i>
            </div>
        </div>
        <div class="cart-item-total-cost w-48 font-bold text-gray-400">
            $${item.price * item.quantity}
        </div>
        <div data-id="${item.id}" class="cart-item-delete w-10 font-bold text-gray-200 cursor-pointer hover:text-gray-400">
            <i class="fas fa-times"></i>
        </div>
    </div>
        
        `

    })

    document.querySelector('.cart-items').innerHTML = itemsHTML;
    createEventListeners();
}

function getTotalCost(items) {
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.quantity * item.price);
    })
    document.querySelector('.total-cost-number').innerText = `$${totalCost}`;
}
function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".chevron-left");
    let increaseButtons = document.querySelectorAll(".chevron-right");
    let deleteButtons = document.querySelectorAll(".cart-item-delete")

    decreaseButtons.forEach((button) => {
        button.addEventListener('click', function () {
            decreaseCount(button.dataset.id)
        })
    })
    increaseButtons.forEach((button) => {
        button.addEventListener('click', function () {
            increaseCount(button.dataset.id)
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            deleteItem(button.dataset.id)
        })
    })

}





getCartItems();
