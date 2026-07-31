/* =========================
   FLEUR PERFUMES APP.JS
========================= */



/* =========================
   DISPLAY PRODUCTS
========================= */


function displayProducts(list = products){


const container =
document.getElementById("products");


if(!container) return;



container.innerHTML = "";



list.forEach(product=>{


container.innerHTML += `


<div class="product-card">



<img

src="${product.image}"

alt="${product.name}"

loading="lazy"

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

${product.description}

</p>





<p class="recommendation">

${product.recommendation}

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
   CREATE FILTERS
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






brands.forEach(brand=>{


brandFilter.innerHTML += `

<option value="${brand}">

${brand}

</option>

`;



});







categories.forEach(category=>{


categoryFilter.innerHTML += `

<option value="${category}">

${category}

</option>

`;



});



}









/* =========================
   CATALOG FILTER
========================= */


function initCatalog(){



if(typeof products==="undefined")
return;




displayProducts();



createFilters();






const search =
document.getElementById("search");



const brandFilter =
document.getElementById("brandFilter");



const categoryFilter =
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
result.filter(product=>

product.name
.toLowerCase()
.includes(text)


||

product.brand
.toLowerCase()
.includes(text)

);



}



}









if(
brandFilter &&
brandFilter.value!=="all"

){


result =
result.filter(product=>

product.brand ===
brandFilter.value

);


}









if(
categoryFilter &&
categoryFilter.value!=="all"

){


result =
result.filter(product=>

product.category ===
categoryFilter.value

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





if(brandFilter){

brandFilter.addEventListener(
"change",
filterProducts
);

}





if(categoryFilter){

categoryFilter.addEventListener(
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

) || [];


}







function saveCart(cart){


localStorage.setItem(

"cart",

JSON.stringify(cart)

);


}









/* =========================
   ADD CART
========================= */


function addToCart(id){



let cart =
getCart();





let product =
products.find(item=>

item.id === id

);





if(!product)
return;






let exists =
cart.find(item=>

item.id === id

);






if(exists){


exists.quantity++;


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


const count =
document.getElementById("cartCount");



if(!count)
return;





let cart =
getCart();





let total =

cart.reduce(

(sum,item)=>

sum + (item.quantity || 1),

0

);





count.innerHTML =
total;



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





container.innerHTML="";







if(cart.length===0){


container.innerHTML = `

<h3>

Корзина пустая

</h3>

`;



if(total)

total.innerHTML="";


return;


}







let sum = 0;







cart.forEach((item,index)=>{



container.innerHTML += `


<div class="cart-item">



<img

src="${item.image}"

>



<div>



<h3>

${item.name}

</h3>



<p>

${item.brand}

</p>



<p>

Количество:
${item.quantity}

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





if(cart.length===0){


alert(
"Корзина пустая"
);


return;


}







let message =

"Здравствуйте, FLEUR PERFUMES!%0A%0A";


message +=

"Хочу заказать:%0A";







cart.forEach(item=>{


message +=

"- "

+

item.name

+

" "

+

"("

+

item.brand

+

")"

+

" x "

+

item.quantity

+

"%0A";


});







window.open(

"https://wa.me/77781655756?text="

+

message

);


}









/* =========================
   WHOLESALE
========================= */


function sendWholesale(){



let text =

"Здравствуйте, FLEUR PERFUMES!%0A%0A"

+

"Имя: "

+

(document.getElementById("name")?.value || "")

+

"%0A"

+

"Компания: "

+

(document.getElementById("company")?.value || "")

+

"%0A"

+

"Телефон: "

+

(document.getElementById("phone")?.value || "")

+

"%0A"

+

"Город: "

+

(document.getElementById("city")?.value || "")

+

"%0A"

+

"Аромат: "

+

(document.getElementById("aroma")?.value || "")

+

"%0A"

+

"Объем: "

+

(document.getElementById("volume")?.value || "");






window.open(

"https://wa.me/77781655756?text="

+

text

);



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
