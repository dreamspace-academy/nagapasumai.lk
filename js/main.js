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
        id:1,
        name: 'A',
        price: 100,
        incart: 0
    },
    {
        name: 'B',
        price: 200,
        incart: 0
    },
    {
        name: 'C',
        price: 300,
        incart: 0
    },
    {
        name: 'D',
        price: 400,
        incart: 0
    }
]


// ADD Cart Number
let Cart = document.querySelectorAll(".add-cart"); /* select all add-cart classes  =>  "add to cart" button */

// Add cart
for (let i = 0; i < Cart.length; i++) {

    Cart[i].addEventListener('click', () => {
        // console.log("Add To Cart is Running");

        CartNumber(productList[i]);/* Call CartNumber(productList[i]); */
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
        switch (ProductItem != null) {
            case ProductItem[product.name] == undefined:
                ProductItem = {
                    ...ProductItem, /* copy the ProductItem => add old ProductItem + new ProductItem */
                    [product.name]: product /* Create JSON formate naming convention */
                }
                ProductItem[product.name].incart += 1;
                break;
            case ProductItem[product.name] === ProductItem[product.name]:
                product.incart = 1
                alert("no")
                break;
            default:
                break;
        }

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
    // else{
    //     console.log("Empty cart list");
    // }
}
DefaltLoadCart(); /* Default running function  */



// Default loading cart , show product functiopn in checkout page 

let ShowProduct = () => {
    let ShowProductItem = localStorage.getItem('AddCartProductName');/* get to local storage */
    ShowProductItem = JSON.parse(ShowProductItem);
    console.log(ShowProductItem);
    let HtmlPageLoad = document.querySelector('.ProductDetails');
    let HtmlPageLoadPrice = document.querySelector('.Pricing');


    if (ShowProductItem && HtmlPageLoad  && HtmlPageLoadPrice) {
        HtmlPageLoad.innerHTML = ``
        Object.values(ShowProductItem).map(MapShowProduct); /* call back MapShowProduct function */

        HtmlPageLoadPrice.innerHTML = `<div class="d-flex justify-content-between mb-3 pt-1">
        <h6 class="font-weight-medium">Subtotal</h6>
        <h6 class="font-weight-medium"></h6>
        </div>`

    }



    function MapShowProduct(Item) {
        HtmlPageLoad.innerHTML += `
        <div class="d-flex justify-content-between">
        <p>${Item.name}</p>
        <p>rs ${Item.price}</p>
    </div>`
    }
}
ShowProduct();