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


// ADD Cart 
let Cart = document.querySelectorAll(".add-cart"); /* select all add-cart classes  =>  "add to cart" button */

// Add cart
for (let i = 0; i < Cart.length; i++) {

    Cart[i].addEventListener('click', AddCart); /* call-back AddCart(); */


}

// function
function AddCart() {
    // console.log("AddCart is Running");
    CartNumber();/* call-back CartNumber(); */
}

let CartNumber = () => {
    let AddCartNumber = localStorage.getItem("cartNumber");
    AddCartNumberInt = parseInt(AddCartNumber) /* convert string to number  */
    // console.log(AddCartNumber);

    // add cart in localStorage
    if (AddCartNumberInt) {
        localStorage.setItem('cartNumber', AddCartNumberInt + 1);
        document.querySelector('.card-add span').textContent =  AddCartNumberInt + 1;
    }
    else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.card-add span').textContent = 1;
    }

    

}

// Default loading cart , Count in navbar
let DefaltLoadCart = ()=> {
    let AddCartNumber = localStorage.getItem("cartNumber");

    if(AddCartNumber){
        document.querySelector('.card-add span').textContent = AddCartNumber;
    }
    // else{
    //     console.log("Empty cart list");
    // }

}
DefaltLoadCart(); /* Default running function  */