const cart = function () {
    const cartBtn = document.querySelector('.button-cart');
    const cartModal = document.getElementById('modal-cart');
    const cartInnerModal = cartModal.querySelector('.modal');
    const closeBtn = cartModal.querySelector('.modal-close');
    
    let isOut = true;
    cartBtn.addEventListener('click', function () {
        cartModal.style.display = 'flex';
        cartInnerModal.style.animationName = 'slide-in';
    })
    cartInnerModal.addEventListener('animationend', function () {
        if (isOut) {
            cartInnerModal.style.transform = 'translateX(0)';
            isOut = false;
        } else {
            cartModal.style.display = '';
            isOut = true;
        }
    })
    closeBtn.addEventListener('click', function () {
        cartInnerModal.style.animationName = 'slide-out';
    })

    cartModal.addEventListener('click', (event) => {
        if(event.target.classList.contains('overlay'))
        {
            cartInnerModal.style.animationName = 'slide-out';
        }
    })
}

cart();
