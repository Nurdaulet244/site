/* =========================
   FLEUR PERFUMES
   APP.JS
========================= */


/* =========================
   SHOW PRODUCTS
========================= */


function displayProducts(list = products){


const container =
document.getElementById("products");


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



const brand =
document.getElementById("brandFilter");


const category =
document.getElementById("categoryFilter");



if(!brand || !category) return;



brand.innerHTML =
`
<option value="all">
Все бренды
</option>
`;



category.innerHTML =
`
<option value="all">
Все категории
</option>
`;





let brands = [

...new Set(

products.map(
item=>item.brand
)

)

];




let categories = [

...new Set(

products.map(
item=>item.category
)

)

];





brands.forEach(item=>{


brand.innerHTML +=

`
<option value="${item}">
${item}
</option>
`;


});





categories.forEach(item=>{


category.innerHTML +=

`
<option value="${item}">
${item}
</option>
`;


});


}
/* =========================
   CATALOG SEARCH
========================= */


function initCatalog(){


if(typeof products === "undefined")
return;



displayProducts();

createFilters();





const search =
document.getElementById("search");



const brand =
document.getElementById("brandFilter");



const category =
document.getElementById("categoryFilter");





function filterProducts(){



let result = products;



if(search){


let text =
search.value
.toLowerCase()
.trim();




if(text){


result =
result.filter(product =>


product.name
.toLowerCase()
.includes(text)



||



product.brand
.toLowerCase()
.includes(text)



||



product.category
.toLowerCase()
.includes(text)



);


}



}






if(brand && brand.value !== "all"){


result =
result.filter(product =>

product.brand === brand.value

);


}






if(category && category.value !== "all"){


result =
result.filter(product =>

product.category === category.value

);


}





displayProducts(result);



}






if(search){

search.addEventListener(
"input",
filterProducts
);

}





if(brand){

brand.addEventListener(
"change",
filterProducts
);

}





if(category){

category.addEventListener(
"change",
filterProducts
);

}



}






/* =========================
   CART STORAGE
========================= */


function getCart(){


return JSON.parse(

localStorage.getItem("cart")

)

|| [];

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
products.find(item =>

item.id === id

);





if(!product)
return;





let item =
cart.find(item =>

item.id === id

);





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




let cart =
getCart();




let count =

cart.reduce(

(sum,item)=>

sum + item.quantity,

0

);





counter.innerHTML =
count;



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




let cart =
getCart();



container.innerHTML = "";





if(cart.length === 0){


container.innerHTML =

`
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



container.innerHTML +=

`


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
   REMOVE ITEM
========================= */


function removeCart(index){


let cart =
getCart();



cart.splice(index,1);



saveCart(cart);



loadCart();


updateCartCount();


}






/* =========================
   CLEAR CART
========================= */


function clearCart(){


localStorage.removeItem("cart");



loadCart();


updateCartCount();


}








/* =========================
   WHATSAPP ORDER
========================= */


function checkout(){



let cart =
getCart();





if(cart.length === 0){


alert(
"Корзина пустая"
);


return;


}





let message =

"Здравствуйте, FLEUR PERFUMES!%0A%0A";


message +=

"Хочу заказать:%0A%0A";






cart.forEach(item=>{


message +=


"- " +

item.name +

" (" +

item.brand +

") x " +

item.quantity +

"%0A";



});





let city = confirm(

"Выберите город заказа:%0A%0A" +

"OK — Алматы%0A" +

"Отмена — Астана"

);





if(city){



window.open(

"https://wa.me/77781655756?text="

+

message

);



}

else{



window.open(

"https://wa.me/77714013715?text="

+

message

);



}



}








/* =========================
   WHOLESALE
========================= */


function sendWholesale(){



let message =


"Здравствуйте, FLEUR PERFUMES!%0A%0A" +


"Имя: " +

(document.getElementById("name")?.value || "")

+

"%0AКомпания: " +

(document.getElementById("company")?.value || "")

+

"%0AТелефон: " +

(document.getElementById("phone")?.value || "")

+

"%0AГород: " +

(document.getElementById("city")?.value || "");



let city = confirm(

"Выберите город:%0A%0AOK — Алматы%0AОтмена — Астана"

);



if(city){


window.open(

"https://wa.me/77781655756?text="+message

);


}

else{


window.open(

"https://wa.me/77714013715?text="+message

);


}



}







/* =========================
   START
========================= */


document.addEventListener(

"DOMContentLoaded",

()=>{


initCatalog();


loadCart();


updateCartCount();



}

);
