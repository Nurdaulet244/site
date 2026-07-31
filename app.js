/* =========================
   FLEUR PERFUMES
   APP.JS
========================= */


/* =========================
   PRODUCTS DISPLAY
========================= */


function displayProducts(list = products){


const container = document.getElementById("products");


if(!container) return;


container.innerHTML = "";



list.forEach(product => {


container.innerHTML += `


<div class="product-card">


<img

src="${product.image}"

alt="${product.name}"

loading="lazy"

onerror="this.src='images/no-image.png'"

>


<h3>
${product.name}
</h3>


<p class="brand">
${product.brand}
</p>


<p class="category">
${product.category}
</p>


<p class="description">
${product.description || ""}
</p>


<p class="recommendation">
${product.recommendation || ""}
</p>



<button

class="btn gold"

onclick="addToCart('${product.id}')"

>

🛒 В корзину

</button>


</div>


`;


});


}







/* =========================
   FILTERS
========================= */


function createFilters(){


const brandFilter =
document.getElementById("brandFilter");


const categoryFilter =
document.getElementById("categoryFilter");



if(!brandFilter || !categoryFilter)
return;



brandFilter.innerHTML = `

<option value="all">
Все бренды
</option>

`;



categoryFilter.innerHTML = `

<option value="all">
Все категории
</option>

`;




const brands = [
...new Set(products.map(product => product.brand))
];



const categories = [
...new Set(products.map(product => product.category))
];





brands.forEach(brand => {


brandFilter.innerHTML += `

<option value="${brand}">
${brand}
</option>

`;



});





categories.forEach(category => {


categoryFilter.innerHTML += `

<option value="${category}">
${category}
</option>

`;



});



}








/* =========================
   CATALOG
========================= */


function initCatalog(){


if(typeof products === "undefined")
return;



displayProducts(products);


createFilters();




const search =
document.getElementById("search");


const brand =
document.getElementById("brandFilter");


const category =
document.getElementById("categoryFilter");





function filterProducts(){


let result = [...products];



const text =
search?.value
.toLowerCase()
.trim();




if(text){


result =
result.filter(product =>


product.name.toLowerCase().includes(text)


||

product.brand.toLowerCase().includes(text)


||

product.category.toLowerCase().includes(text)



);


}




if(
brand &&
brand.value !== "all"
){


result =
result.filter(product =>

product.brand === brand.value

);


}





if(
category &&
category.value !== "all"
){


result =
result.filter(product =>

product.category === category.value

);


}




displayProducts(result);



}







search?.addEventListener(
"input",
filterProducts
);



brand?.addEventListener(
"change",
filterProducts
);



category?.addEventListener(
"change",
filterProducts
);



}









/* =========================
   CART STORAGE
========================= */


function getCart(){


return JSON.parse(

localStorage.getItem("cart")

) || [];


}




function saveCart(cart){


localStorage.setItem(

"cart",

JSON.stringify(cart)

);


}








/* =========================
   ADD TO CART
========================= */


function addToCart(id){


let cart =
getCart();



let product =
products.find(item => item.id === id);




if(!product)
return;




let item =
cart.find(item => item.id === id);




if(item){


item.quantity++;


}

else{


cart.push({

...product,

quantity:1

});


}




saveCart(cart);


updateCartCount();



alert(

product.name +

" добавлен в корзину"

);



}









/* =========================
   CART COUNT
========================= */


function updateCartCount(){


const counter =
document.getElementById("cartCount");



if(!counter)
return;




const count =

getCart().reduce(

(sum,item)=>sum + item.quantity,

0

);




counter.innerHTML = count;



}









/* =========================
   LOAD CART
========================= */


function loadCart(){


const container =
document.getElementById("cartItems");


const total =
document.getElementById("total");



if(!container)
return;




const cart =
getCart();



container.innerHTML = "";




if(cart.length === 0){


container.innerHTML = `

<h3>
Корзина пустая
</h3>

`;



if(total)
total.innerHTML = "";



return;

}





let sum = 0;




cart.forEach((item,index)=>{


container.innerHTML += `


<div class="cart-item">


<img

src="${item.image}"

alt="${item.name}"

onerror="this.src='images/no-image.png'"

>



<div>


<h3>
${item.name}
</h3>



<p>
${item.brand}
</p>



<p>
Количество: ${item.quantity}
</p>



<button

class="btn dark"

onclick="removeCart(${index})"

>

Удалить

</button>


</div>


</div>


`;



sum += item.quantity;



});




if(total){


total.innerHTML =
"Всего товаров: " + sum;


}



}









/* =========================
   REMOVE CART
========================= */


function removeCart(index){


let cart =
getCart();


cart.splice(index,1);



saveCart(cart);



loadCart();


updateCartCount();


}









function clearCart(){


localStorage.removeItem("cart");


loadCart();


updateCartCount();


}









/* =========================
   WHATSAPP ORDER
========================= */


function checkout(){


const cart =
getCart();



if(cart.length === 0){


alert("Корзина пустая");


return;


}




let message =

"Здравствуйте, FLEUR PERFUMES!\n\n";


message +=

"Хочу заказать:\n\n";





cart.forEach(item=>{


message +=

"- " +

item.name +

" (" +

item.brand +

") x " +

item.quantity +

"\n";


});





const city =

confirm(

"OK — Алматы\nОтмена — Астана"

);




const phone =

city

?

"77781655756"

:

"77714013715";





window.open(

"https://wa.me/" +

phone +

"?text=" +

encodeURIComponent(message)

);



}









/* =========================
   WHOLESALE
========================= */


function sendWholesale(){


let message =


"Здравствуйте, FLEUR PERFUMES!\n\n" +


"Имя: " +

(document.getElementById("name")?.value || "") +


"\nКомпания: " +

(document.getElementById("company")?.value || "") +


"\nТелефон: " +

(document.getElementById("phone")?.value || "") +


"\nГород: " +

(document.getElementById("city")?.value || "");





const city =

confirm(

"OK — Алматы\nОтмена — Астана"

);




const phone =

city

?

"77781655756"

:

"77714013715";





window.open(

"https://wa.me/" +

phone +

"?text=" +

encodeURIComponent(message)

);



}









/* =========================
   START
========================= */


document.addEventListener(

"DOMContentLoaded",

()=>{


if(typeof products !== "undefined"){

initCatalog();

}


loadCart();


updateCartCount();



}

);
