
// Product list
let productList = [
    {
        img: "naga_pasumai_img/Product-img/Briyani Masala.png",
        name: 'Briyani Masala',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Chicken Masala.png",
        name: 'Chicken Masala',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Coffee.png",
        name: 'Coffee',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Curry Chilly Powder.png",
        name: 'Chilly Powder',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Dry ginger Coffee.png",
        name: 'Dry ginger Coffee',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Fish Dry Masala.png",
        name: 'Fish Dry Masala',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Garam Masala.png",
        name: 'Garam Masala',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Health Mix.png",
        name: 'Health Mix',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Pepper Powder.png",
        name: 'Pepper Powder',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Rasam Powder.png",
        name: 'Rasam Powder',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Sambar Powder.png",
        name: 'Sambar Powder',
        price: 400,
        incart: 0
    },
    {
        img: "naga_pasumai_img/Product-img/Turmeric Powder.png",
        name: 'Turmeric Powder',
        price: 400,
        incart: 0
    },
]

// ADD Cart Number
let Cart = document.querySelectorAll(".add-cart"); /* select all add-cart classes  =>  "add to cart" button */

// Add cart
for (let i = 0; i < Cart.length; i++) {

    Cart[i].addEventListener('click', () => {
        // console.log("Add To Cart is Running");
        CartNumber(productList[i]);/* Call CartNumber(productList[i]); */
        CartproductCost(productList[i]);/* Call CartproductCost(productList[i]); */
    });
}

// Add cart function
let CartNumber = (product) => {
    /* productList[i] have product item { i = number :: eg = 1 , productList[i] => {name: 'A', price: 100, incart: 0} == product  } */
    // console.log(`product Details is `, product)
    let AddCartNumber = localStorage.getItem("cartNumber"); /* get to local storage */
    let AddCartNumberInt = parseInt(AddCartNumber) /* convert string to number  */

    // add cart in localStorage
    if (AddCartNumberInt) {
        localStorage.setItem('cartNumber', AddCartNumberInt + 1); /* Add to local storage */
        document.querySelector('.cta-colored .nav-link .icon-shopping_cart').textContent = AddCartNumberInt + 1;
    }
    else {
        localStorage.setItem('cartNumber', 1); /* Add to local storage */
        document.querySelector('.cta-colored .nav-link .icon-shopping_cart').textContent = 1;
    }
    /* Call-back function */
    AddCartProduct(product);
}

// Default loading cart , Count in navbar functiopn
let DefaltLoadCart = () => {
    let AddCartNumber = localStorage.getItem("cartNumber");
    if (AddCartNumber) {
        document.querySelector('.cta-colored .nav-link .icon-shopping_cart').textContent = AddCartNumber;
    }
}
DefaltLoadCart(); /* Default running function  */

// list-out Add product function
let AddCartProduct = (product) => {
    let ProductItem = localStorage.getItem('AddCartProductName');/* get to local storage */
    ProductItem = JSON.parse(ProductItem); /* convert JSON file formate to Js list */
    if (ProductItem != null) {
        ProductItem = {
            ...ProductItem, /* copy the ProductItem => add old ProductItem + new ProductItem */
            [product.name]: product /* Create JSON formate naming convention */
        }
        ProductItem[product.name].incart += 1;
    }
    else {
        // console.log(product.incart); /* incart = 0 */
        product.incart = 1
        ProductItem = {
            [product.name]: product /* Create JSON formate naming convention */
        }
    }
    let ProductItemJSON = JSON.stringify(ProductItem); /* convert Js list to JSON file formate */
    localStorage.setItem('AddCartProductName', ProductItemJSON); /* Add to local storage */
}

// loading to cost page
let CartproductCost = (product) => {
    let cartprice = localStorage.getItem("Price"); /* get to local storage */
    if (cartprice != null) {
        cartprice = parseInt(cartprice)
        localStorage.setItem("Price", cartprice + product.price)
    } else {
        localStorage.setItem("Price", product.price)
    }
}

// Default loading cart , show product functiopn in checkout page 
let ShowProduct = () => {
    let ShowProductItem = localStorage.getItem('AddCartProductName');/* get to local storage */
    ShowProductItem = JSON.parse(ShowProductItem);
    let cartprice = localStorage.getItem("Price"); /* get to local storage */
    cartprice = parseInt(cartprice);
    console.log(ShowProductItem);
    let HtmlPageLoad = document.querySelector('.ProductDetails');
    let HtmlPageLoadPrice = document.querySelector('.pricing');
    if (ShowProductItem && HtmlPageLoad && HtmlPageLoadPrice && cartprice) {
        HtmlPageLoad.innerHTML = ``;
        Object.values(ShowProductItem, cartprice).map(MapShowProduct); /* call back MapShowProduct function */
    }
    function MapShowProduct(Item) {
        console.log("checkout is running");
        // <td class="image-prod">
        //     <div class="img" style="background-image:url(./images/naga-pasumai-product-img/turmeric powder.jpg);"></div>
        // </td>
        HtmlPageLoad.innerHTML += `<tbody>
        <tr class="text-center">
									<td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td>
									
									<td class="product-name">
										<h3>${Item.name}</h3>
									</td>
									<td class="price">${Item.price}</td>
									<td class="quantity">
										<div class="input-group mb-3">
											<input type="text" name="quantity"
												class="quantity form-control input-number" value="${Item.incart}" min="1" max="10" >
										</div>
									</td>
									<td class="total">${Item.price * Item.incart}</td>
								</tr></tbody>`;
        HtmlPageLoadPrice.innerHTML = `
                        <p class="d-flex">
							<span>Subtotal</span>
							<span class="textcenter">${cartprice}</span>
						</p>
						<p class="d-flex">
							<span>Delivery</span>
							<span class="textcenter">delivery cost</span>
						</p>
						<hr>
						<p class="d-flex total-price">
							<span>Total</span>
							<span class="textcenter">${cartprice} + delivery cost</span>
						</p>`
    }
}
ShowProduct();