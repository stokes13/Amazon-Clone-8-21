 function getItems() {
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            image: doc.data().image,
            name: doc.data().name,
            brand: doc.data().brand,
            rating: doc.data().rating,
            price: doc.data().price
        })
       
    });
        generateItems(items);
    });    
 }
function addToCart(item){
    let cartItem = db.collection('cart-items').doc(item.id);
    cartItem.get().then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity +1
            })
        } else {
            cartItem.set({
                image: item.image,
                name: item.name,
                brand: item.brand,
                price: item.price,
                rating: item.rating,
                quantity: 1
            })
        } 
    })

} 


 function generateItems(items){
     let itemsHTML = "";          
     items.forEach((item) =>{
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-3");
        doc.innerHTML = ` 
        
    <div class="product-image w-48 h-52 bg-white rounded-lg">
        <img class="w-full h-full object-contain p-4"src="${item.image}">
    </div>
    <div class="product-name text-gray-700 font-bold mt-2">${item.name}</div>
    <div class="product-make text-green-700 font-bold">${item.brand}</div>
    <div class="product-rating text-yellow-300 my1">${item.rating}</div>
    <div class="product-price text-gray-700 font-bold text-lg">$ ${item.price}</div>
    <div class="flex justify-center items-center my-2">
    </div>        
        `
        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("rounded", "bg-gray-400", "text-white", "hover:bg-yellow-500", "p-2", "cursor-pointer","text-center", "my-1")
        addToCartEl.innerText = 'Add to Cart';
        addToCartEl.addEventListener("click", function(){
                addToCart(item);
        });
        doc.appendChild(addToCartEl);
        document.querySelector('.main-section-products').appendChild(doc);
    
     let buyNowEl = document.createElement("div");
        buyNowEl.classList.add("rounded", "bg-gray-400", "text-white", "hover:bg-yellow-500", "p-2", "cursor-pointer","text-center", "my-1")
        buyNowEl.innerText = 'Buy Now';
        buyNowEl.addEventListener("click", function(){
                addToCart(item);
        });
        doc.appendChild(buyNowEl);
        document.querySelector('.main-section-products').appendChild(doc);
    });
 }

 getItems();
