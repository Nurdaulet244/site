/* =========================
   FLEUR PERFUMES
   APP.JS
========================= */


/* PRODUCTS */

function displayProducts(list = products){

const container =
document.getElementById("products");


if(!container) return;


container.innerHTML="";


list.forEach(product=>{


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





/* FILTERS */


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



[...new Set(products.map(p=>p.brand))]
.forEach(item=>{

brand.innerHTML +=
`
<option value="${item}">
${item}
</option>
`;

});



[...new Set(products.map(p=>p.category))]
.forEach(item=>{

category.innerHTML +=
`
<option value="${item}">
${item}
</option>
`;

});


}





/* CATALOG */


function initCatalog(){


if(typeof products==="undefined")
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


let result=[...products];



let text =
search?.value
.toLowerCase()
.trim();



if(text){


result=result.filter(product=>


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




if(brand && brand.value!=="all"){


result=result.filter(product=>

product.brand===brand.value

);


}



if(category && category.value!=="all"){


result=result.filter(product=>

product.category===category.value

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







/* CART */


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





function addToCart(id){


let cart=getCart();



let product =
products.find(
p=>p.id===id
);



if(!product)
return;



let item =
cart.find(
p=>p.id===id
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
product.name+
" добавлен в корзину"
);


}





function updateCartCount(){


const counter =
document.getElementById("cartCount");


if(!counter)
return;



let count =
getCart()
.reduce(
(sum,item)=>sum+item.quantity,
0
);



counter.innerHTML=count;


}







/* CART PAGE */


function loadCart(){


const box =
document.getElementById("cartItems");


const total =
document.getElementById("total");



if(!box)
return;



let cart=getCart();



box.innerHTML="";



if(cart.length===0){


box.innerHTML=
`
<h3>
Корзина пустая
</h3>
`;


return;

}



let sum=0;



cart.forEach((item,index)=>{


box.innerHTML+=`

<div class="cart-item">


<img
src="${item.image}"
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



sum+=item.quantity;


});



if(total){

total.innerHTML=
"Всего товаров: "+sum;

}


}




function removeCart(index){


let cart=getCart();


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





/* WHATSAPP */


function checkout(){


let cart=getCart();



if(cart.length===0){

alert("Корзина пустая");

return;

}



let text=
"Здравствуйте, FLEUR PERFUMES!\n\n";


text+="Хочу заказать:\n\n";



cart.forEach(item=>{


text+=
"- "+
item.name+
" ("+
item.brand+
") x "+
item.quantity+
"\n";


});



let city =
confirm(
"OK — Алматы\nОтмена — Астана"
);



let phone =
city
?
"77781655756"
:
"77714013715";



window.open(

"https://wa.me/"+
phone+
"?text="+
encodeURIComponent(text)

);


}







/* WHOLESALE */


function sendWholesale(){


let text=

"Здравствуйте, FLEUR PERFUMES!\n\n"+

"Имя: "+
(document.getElementById("name")?.value || "")+

"\nКомпания: "+
(document.getElementById("company")?.value || "")+

"\nТелефон: "+
(document.getElementById("phone")?.value || "")+

"\nГород: "+
(document.getElementById("city")?.value || "");



let city =
confirm(
"OK — Алматы\nОтмена — Астана"
);



let phone =
city
?
"77781655756"
:
"77714013715";



window.open(

"https://wa.me/"+
phone+
"?text="+
encodeURIComponent(text)

);


}






/* START */


document.addEventListener(
"DOMContentLoaded",
()=>{


if(typeof products!=="undefined"){

initCatalog();

}


loadCart();


updateCartCount();


}
);
