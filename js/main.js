(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

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
        img: "naga_pasumai_img/Product-img/Chilly Powder.png",
        name: 'Chilly Powder',
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
        document.querySelector('.card-add span').textContent = AddCartNumberInt + 1;
    }
    else {
        localStorage.setItem('cartNumber', 1); /* Add to local storage */
        document.querySelector('.card-add span').textContent = 1;
    }
    /* Call-back function */
    AddCartProduct(product);
}

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

// Default loading cart , Count in navbar functiopn
let DefaltLoadCart = () => {
    let AddCartNumber = localStorage.getItem("cartNumber");
    if (AddCartNumber) {
        document.querySelector('.card-add span').textContent = AddCartNumber;
    }
}
DefaltLoadCart(); /* Default running function  */

// Default loading to cost page
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
let ShowProduct = async () => {
    let ShowProductItem = localStorage.getItem('AddCartProductName');/* get to local storage */
    ShowProductItem = JSON.parse(ShowProductItem);
    let cartprice = localStorage.getItem("Price"); /* get to local storage */
    cartprice = parseInt(cartprice);
    console.log(ShowProductItem);
    let HtmlPageLoad = document.querySelector('.ProductDetails');
    let HtmlPageLoadPrice = document.querySelector('.Pricing');
    if (ShowProductItem && HtmlPageLoad && HtmlPageLoadPrice && cartprice) {
        HtmlPageLoad.innerHTML = ``
        Object.values(ShowProductItem, cartprice).map(MapShowProduct); /* call back MapShowProduct function */
    }
    function MapShowProduct(Item) {
        HtmlPageLoad.innerHTML += `
        <div class="d-flex justify-content-between">
        <p class="col-4 ">${Item.name}</p>
        
        <p class="col-4 text-center">${Item.incart}</p>
        <p class="col-4 text-right">${Item.price * Item.incart}</p>
    </div>`;
        HtmlPageLoadPrice.innerHTML = `
        <div class="d-flex justify-content-between mb-3 pt-1">
        <h6 class="font-weight-bold">Total price</h6>
        <h6 class="font-weight-bold">${cartprice}</h6>
        </div>`
    }
}
ShowProduct();