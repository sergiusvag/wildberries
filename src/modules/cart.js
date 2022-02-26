export const cart = function () {
    const cartBtn = document.querySelector('.button-cart')
    const cartModal = document.getElementById('modal-cart')
    const cartInnerModal = cartModal.querySelector('.modal')
    const closeBtn = cartModal.querySelector('.modal-close')
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')
    const cartTotal = document.querySelector('.card-table__total')
    const modalForm = document.querySelector('.modal-form')
    const formName = document.getElementsByName("nameCustomer")
    const formPhone = document.getElementsByName("phoneCustomer")
    let isOut = true;
    let isCheckOut = false;

    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const clickedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        if (cart.some(good => good.id === clickedGood.id)) {
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })
        } else {
            clickedGood.count = 1
            cart.push(clickedGood)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.filter(good => {
            return good.id !== id
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))

    }

    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                good.count++
            }
            return good
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                if (good.count > 0) {
                    good.count--
                }
            }
            return good
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const renderCartGoods = (goods) => {
        let totalPrice = 0;

        cartTable.innerHTML = ''

        goods.forEach(good => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${good.name}</td>
                <td>${good.price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${good.count}</td>
                <td><button class=" cart-btn-plus"">+</button></td>
                <td>${+good.price * +good.count}$</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `
            totalPrice += good.price * good.count

            cartTable.append(tr)

            tr.addEventListener('click', (e) => {
                if (e.target.classList.contains('cart-btn-minus')) {
                    minusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-plus')) {
                    plusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-delete')) {
                    deleteCartItem(good.id)
                }
            })
        })

        cartTotal.innerHTML = totalPrice
    }

    const sendForm = () => {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                cart: cartArray,
                name: formName[0].value,
                phone: formPhone[0].value
            })
        }).then(() => {
            isCheckOut = true
            cartInnerModal.style.animationName = 'slide-out';
        })
    }

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendForm()
    })
    cartBtn.addEventListener('click', function () {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        renderCartGoods(cartArray)

        cartModal.style.display = 'flex';
        cartInnerModal.style.animationName = 'slide-in';
    })
    cartInnerModal.addEventListener('animationend', function () {
        if (isOut) {
            cartInnerModal.style.transform = 'translateX(0)';
            isOut = false;
        } else {
            if (isCheckOut) {
                isCheckOut = false
                cartTable.innerHTML = ''
                localStorage.removeItem('cart')
            }
            cartModal.style.display = '';
            isOut = true;
        }
    })
    closeBtn.addEventListener('click', function () {
        cartInnerModal.style.animationName = 'slide-out';
    })

    cartModal.addEventListener('click', (event) => {
        if (event.target.classList.contains('overlay')) {
            cartInnerModal.style.animationName = 'slide-out';
        }
    })

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {
            if (event.target.closest('.add-to-cart')) {
                const buttonToCart = event.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id

                addToCart(goodId)
            }
        })
    }
}
