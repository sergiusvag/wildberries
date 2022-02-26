(()=>{"use strict";var __webpack_modules__={220:()=>{eval("\n;// CONCATENATED MODULE: ./src/modules/search.js\nconst search = function () {\r\n    const input = document.querySelector('.search-block > input')\r\n    const searchBtn = document.querySelector('.search-block > button')\r\n\r\n    searchBtn.addEventListener('click', (event) => {\r\n        getData(input.value)\r\n    })\r\n\r\n    const renderGoods = (goods) => {\r\n        const goodsContainer = document.querySelector('.long-goods-list')\r\n\r\n        goodsContainer.innerHTML = \"\"\r\n\r\n        goods.forEach(good => {\r\n            const goodBlock = document.createElement('div')\r\n\r\n            goodBlock.classList.add('col-lg-3')\r\n            goodBlock.classList.add('col-sm-6')\r\n\r\n            goodBlock.innerHTML = `\r\n                <div class=\"goods-card\">\r\n                    <span class=\"label ${good.label ? null : 'd-none'}\">${good.label}</span>\r\n                    <img src=\"db/${good.img}\" alt=\"${good.name}\" class=\"goods-image\">\r\n                    <h3 class=\"goods-title\">${good.name}</h3>\r\n                    <p class=\"goods-description\">${good.description}</p>\r\n                    <button class=\"button goods-card-btn add-to-cart\" data-id=\"${good.id}\">\r\n                        <span class=\"button-price\">$${good.price}</span>\r\n                    </button>\r\n                </div>\r\n            `\r\n\r\n            goodsContainer.append(goodBlock)\r\n        })\r\n    }\r\n\r\n    const getData = (value) => {\r\n        fetch('https://wildberries-db-default-rtdb.europe-west1.firebasedatabase.app/db.json')\r\n            .then(res => res.json())\r\n            .then(data => {\r\n                const array = data.filter(good => good.name.toLowerCase().includes(value.toLowerCase()));\r\n\r\n                localStorage.setItem('goods', JSON.stringify(array));\r\n\r\n                if (window.location.pathname != \"/goods.html\") {\r\n                    window.location.href = '/goods.html'\r\n                } else {\r\n                    renderGoods(array);\r\n                }\r\n            })\r\n    }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/modules/cart.js\nconst cart = function () {\r\n    const cartBtn = document.querySelector('.button-cart')\r\n    const cartModal = document.getElementById('modal-cart')\r\n    const cartInnerModal = cartModal.querySelector('.modal')\r\n    const closeBtn = cartModal.querySelector('.modal-close')\r\n    const goodsContainer = document.querySelector('.long-goods-list')\r\n    const cartTable = document.querySelector('.cart-table__goods')\r\n    const cartTotal = document.querySelector('.card-table__total')\r\n    const modalForm = document.querySelector('.modal-form')\r\n    const formName = document.getElementsByName(\"nameCustomer\")\r\n    const formPhone = document.getElementsByName(\"phoneCustomer\")\r\n    let isOut = true;\r\n    let isCheckOut = false;\r\n\r\n    const addToCart = (id) => {\r\n        const goods = JSON.parse(localStorage.getItem('goods'))\r\n        const clickedGood = goods.find(good => good.id === id)\r\n        const cart = localStorage.getItem('cart') ?\r\n            JSON.parse(localStorage.getItem('cart')) : []\r\n\r\n        if (cart.some(good => good.id === clickedGood.id)) {\r\n            cart.map(good => {\r\n                if (good.id === clickedGood.id) {\r\n                    good.count++\r\n                }\r\n                return good\r\n            })\r\n        } else {\r\n            clickedGood.count = 1\r\n            cart.push(clickedGood)\r\n        }\r\n        localStorage.setItem('cart', JSON.stringify(cart))\r\n    }\r\n\r\n    const deleteCartItem = (id) => {\r\n        const cart = JSON.parse(localStorage.getItem('cart'))\r\n\r\n        const newCart = cart.filter(good => {\r\n            return good.id !== id\r\n        })\r\n\r\n        localStorage.setItem('cart', JSON.stringify(newCart))\r\n        renderCartGoods(JSON.parse(localStorage.getItem('cart')))\r\n\r\n    }\r\n\r\n    const plusCartItem = (id) => {\r\n        const cart = JSON.parse(localStorage.getItem('cart'))\r\n\r\n        const newCart = cart.map(good => {\r\n            if (good.id === id) {\r\n                good.count++\r\n            }\r\n            return good\r\n        })\r\n\r\n        localStorage.setItem('cart', JSON.stringify(newCart))\r\n        renderCartGoods(JSON.parse(localStorage.getItem('cart')))\r\n    }\r\n\r\n    const minusCartItem = (id) => {\r\n        const cart = JSON.parse(localStorage.getItem('cart'))\r\n\r\n        const newCart = cart.map(good => {\r\n            if (good.id === id) {\r\n                if (good.count > 0) {\r\n                    good.count--\r\n                }\r\n            }\r\n            return good\r\n        })\r\n\r\n        localStorage.setItem('cart', JSON.stringify(newCart))\r\n        renderCartGoods(JSON.parse(localStorage.getItem('cart')))\r\n    }\r\n\r\n    const renderCartGoods = (goods) => {\r\n        let totalPrice = 0;\r\n\r\n        cartTable.innerHTML = ''\r\n\r\n        goods.forEach(good => {\r\n            const tr = document.createElement('tr')\r\n            tr.innerHTML = `\r\n                <td>${good.name}</td>\r\n                <td>${good.price}$</td>\r\n                <td><button class=\"cart-btn-minus\"\">-</button></td>\r\n                <td>${good.count}</td>\r\n                <td><button class=\" cart-btn-plus\"\">+</button></td>\r\n                <td>${+good.price * +good.count}$</td>\r\n                <td><button class=\"cart-btn-delete\"\">x</button></td>\r\n            `\r\n            totalPrice += good.price * good.count\r\n\r\n            cartTable.append(tr)\r\n\r\n            tr.addEventListener('click', (e) => {\r\n                if (e.target.classList.contains('cart-btn-minus')) {\r\n                    minusCartItem(good.id)\r\n                } else if (e.target.classList.contains('cart-btn-plus')) {\r\n                    plusCartItem(good.id)\r\n                } else if (e.target.classList.contains('cart-btn-delete')) {\r\n                    deleteCartItem(good.id)\r\n                }\r\n            })\r\n        })\r\n\r\n        cartTotal.innerHTML = totalPrice\r\n    }\r\n\r\n    const sendForm = () => {\r\n        const cartArray = localStorage.getItem('cart') ?\r\n            JSON.parse(localStorage.getItem('cart')) : []\r\n\r\n        fetch('https://jsonplaceholder.typicode.com/posts', {\r\n            method: 'POST',\r\n            body: JSON.stringify({\r\n                cart: cartArray,\r\n                name: formName[0].value,\r\n                phone: formPhone[0].value\r\n            })\r\n        }).then(() => {\r\n            isCheckOut = true\r\n            cartInnerModal.style.animationName = 'slide-out';\r\n        })\r\n    }\r\n\r\n    modalForm.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        sendForm()\r\n    })\r\n    cartBtn.addEventListener('click', function () {\r\n        const cartArray = localStorage.getItem('cart') ?\r\n            JSON.parse(localStorage.getItem('cart')) : []\r\n\r\n        renderCartGoods(cartArray)\r\n\r\n        cartModal.style.display = 'flex';\r\n        cartInnerModal.style.animationName = 'slide-in';\r\n    })\r\n    cartInnerModal.addEventListener('animationend', function () {\r\n        if (isOut) {\r\n            cartInnerModal.style.transform = 'translateX(0)';\r\n            isOut = false;\r\n        } else {\r\n            //If called from checkout button, clear cart only on animation end\r\n            if (isCheckOut) {\r\n                isCheckOut = false\r\n                cartTable.innerHTML = ''\r\n                localStorage.removeItem('cart')\r\n            }\r\n            cartModal.style.display = '';\r\n            isOut = true;\r\n        }\r\n    })\r\n    closeBtn.addEventListener('click', function () {\r\n        cartInnerModal.style.animationName = 'slide-out';\r\n    })\r\n\r\n    cartModal.addEventListener('click', (event) => {\r\n        if (event.target.classList.contains('overlay')) {\r\n            cartInnerModal.style.animationName = 'slide-out';\r\n        }\r\n    })\r\n\r\n    if (goodsContainer) {\r\n        goodsContainer.addEventListener('click', (event) => {\r\n            if (event.target.closest('.add-to-cart')) {\r\n                const buttonToCart = event.target.closest('.add-to-cart')\r\n                const goodId = buttonToCart.dataset.id\r\n\r\n                addToCart(goodId)\r\n            }\r\n        })\r\n    }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/modules/getGoods.js\nconst getGoods = () => {\r\n    // I added this part to simply add viewall link to the \"links\" without changing viewall classes\r\n    const viewAll = document.querySelector('.more');\r\n    let wasAdded = false;\r\n    if (viewAll && !viewAll.classList.contains('navigation-link')) {\r\n        viewAll.classList.add('navigation-link')\r\n        wasAdded = true;\r\n    }\r\n\r\n    const links = document.querySelectorAll('.navigation-link')\r\n\r\n    if (wasAdded) {\r\n        viewAll.classList.remove('navigation-link')\r\n    }\r\n\r\n    const renderGoods = (goods) => {\r\n        const goodsContainer = document.querySelector('.long-goods-list')\r\n\r\n        goodsContainer.innerHTML = \"\"\r\n\r\n        goods.forEach(good => {\r\n            const goodBlock = document.createElement('div')\r\n\r\n            goodBlock.classList.add('col-lg-3')\r\n            goodBlock.classList.add('col-sm-6')\r\n\r\n            goodBlock.innerHTML = `\r\n                <div class=\"goods-card\">\r\n                    <span class=\"label ${good.label ? null : 'd-none'}\">${good.label}</span>\r\n                    <img src=\"db/${good.img}\" alt=\"${good.name}\" class=\"goods-image\">\r\n                    <h3 class=\"goods-title\">${good.name}</h3>\r\n                    <p class=\"goods-description\">${good.description}</p>\r\n                    <button class=\"button goods-card-btn add-to-cart\" data-id=\"${good.id}\">\r\n                        <span class=\"button-price\">$${good.price}</span>\r\n                    </button>\r\n                </div>\r\n            `\r\n            goodsContainer.append(goodBlock)\r\n        })\r\n    }\r\n\r\n    const getData = (value, category) => {\r\n        fetch('https://wildberries-db-default-rtdb.europe-west1.firebasedatabase.app/db.json')\r\n            .then(res => res.json())\r\n            .then(data => {\r\n                const array = category ? data.filter(item => item[category] === value) : data\r\n\r\n                localStorage.setItem('goods', JSON.stringify(array));\r\n\r\n                if (window.location.pathname != \"/goods.html\") {\r\n                    window.location.href = '/goods.html'\r\n                } else {\r\n                    renderGoods(array);\r\n                }\r\n            })\r\n    }\r\n\r\n    links.forEach((link) => {\r\n        link.addEventListener('click', (e) => {\r\n            e.preventDefault();\r\n            const linkValue = link.textContent;\r\n            const category = link.dataset.field;\r\n            getData(linkValue, category);\r\n        })\r\n    })\r\n\r\n    if (localStorage.getItem('goods') && window.location.pathname === \"/goods.html\") {\r\n        renderGoods(JSON.parse(localStorage.getItem('goods')));\r\n    }\r\n}\n;// CONCATENATED MODULE: ./src/goods.js\n\r\n\r\n\r\n\r\nsearch()\r\ncart()\r\ngetGoods()//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7QUNyRTBDO0FBQ0o7QUFDUTtBQUM5QztBQUNBLE1BQU07QUFDTixJQUFJO0FBQ0osUUFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL3dpbGRiZXJyaWVzLy4vc3JjL21vZHVsZXMvc2VhcmNoLmpzP2UwNzUiLCJ3ZWJwYWNrOi8vd2lsZGJlcnJpZXMvLi9zcmMvbW9kdWxlcy9jYXJ0LmpzP2FjMGUiLCJ3ZWJwYWNrOi8vd2lsZGJlcnJpZXMvLi9zcmMvbW9kdWxlcy9nZXRHb29kcy5qcz9kNTlhIiwid2VicGFjazovL3dpbGRiZXJyaWVzLy4vc3JjL2dvb2RzLmpzPzdiZGEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1ibG9jayA+IGlucHV0JylcclxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmxvY2sgPiBidXR0b24nKVxyXG5cclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGdldERhdGEoaW5wdXQudmFsdWUpXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHJlbmRlckdvb2RzID0gKGdvb2RzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ29vZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9uZy1nb29kcy1saXN0JylcclxuXHJcbiAgICAgICAgZ29vZHNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICAgICAgICBnb29kcy5mb3JFYWNoKGdvb2QgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnb29kQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5cclxuICAgICAgICAgICAgZ29vZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ2NvbC1sZy0zJylcclxuICAgICAgICAgICAgZ29vZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ2NvbC1zbS02JylcclxuXHJcbiAgICAgICAgICAgIGdvb2RCbG9jay5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ29vZHMtY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgJHtnb29kLmxhYmVsID8gbnVsbCA6ICdkLW5vbmUnfVwiPiR7Z29vZC5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJkYi8ke2dvb2QuaW1nfVwiIGFsdD1cIiR7Z29vZC5uYW1lfVwiIGNsYXNzPVwiZ29vZHMtaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJnb29kcy10aXRsZVwiPiR7Z29vZC5uYW1lfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJnb29kcy1kZXNjcmlwdGlvblwiPiR7Z29vZC5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBnb29kcy1jYXJkLWJ0biBhZGQtdG8tY2FydFwiIGRhdGEtaWQ9XCIke2dvb2QuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uLXByaWNlXCI+JCR7Z29vZC5wcmljZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYFxyXG5cclxuICAgICAgICAgICAgZ29vZHNDb250YWluZXIuYXBwZW5kKGdvb2RCbG9jaylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldERhdGEgPSAodmFsdWUpID0+IHtcclxuICAgICAgICBmZXRjaCgnaHR0cHM6Ly93aWxkYmVycmllcy1kYi1kZWZhdWx0LXJ0ZGIuZXVyb3BlLXdlc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwL2RiLmpzb24nKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IGRhdGEuZmlsdGVyKGdvb2QgPT4gZ29vZC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnb29kcycsIEpTT04uc3RyaW5naWZ5KGFycmF5KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBcIi9nb29kcy5odG1sXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZ29vZHMuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyR29vZHMoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBjYXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgY2FydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tY2FydCcpXHJcbiAgICBjb25zdCBjYXJ0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtY2FydCcpXHJcbiAgICBjb25zdCBjYXJ0SW5uZXJNb2RhbCA9IGNhcnRNb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBjYXJ0TW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWNsb3NlJylcclxuICAgIGNvbnN0IGdvb2RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvbmctZ29vZHMtbGlzdCcpXHJcbiAgICBjb25zdCBjYXJ0VGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FydC10YWJsZV9fZ29vZHMnKVxyXG4gICAgY29uc3QgY2FydFRvdGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtdGFibGVfX3RvdGFsJylcclxuICAgIGNvbnN0IG1vZGFsRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb3JtJylcclxuICAgIGNvbnN0IGZvcm1OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJuYW1lQ3VzdG9tZXJcIilcclxuICAgIGNvbnN0IGZvcm1QaG9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwicGhvbmVDdXN0b21lclwiKVxyXG4gICAgbGV0IGlzT3V0ID0gdHJ1ZTtcclxuICAgIGxldCBpc0NoZWNrT3V0ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgYWRkVG9DYXJ0ID0gKGlkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ29vZHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnb29kcycpKVxyXG4gICAgICAgIGNvbnN0IGNsaWNrZWRHb29kID0gZ29vZHMuZmluZChnb29kID0+IGdvb2QuaWQgPT09IGlkKVxyXG4gICAgICAgIGNvbnN0IGNhcnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpID9cclxuICAgICAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpKSA6IFtdXHJcblxyXG4gICAgICAgIGlmIChjYXJ0LnNvbWUoZ29vZCA9PiBnb29kLmlkID09PSBjbGlja2VkR29vZC5pZCkpIHtcclxuICAgICAgICAgICAgY2FydC5tYXAoZ29vZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ29vZC5pZCA9PT0gY2xpY2tlZEdvb2QuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnb29kLmNvdW50KytcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBnb29kXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xpY2tlZEdvb2QuY291bnQgPSAxXHJcbiAgICAgICAgICAgIGNhcnQucHVzaChjbGlja2VkR29vZClcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnQnLCBKU09OLnN0cmluZ2lmeShjYXJ0KSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWxldGVDYXJ0SXRlbSA9IChpZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhcnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0JykpXHJcblxyXG4gICAgICAgIGNvbnN0IG5ld0NhcnQgPSBjYXJ0LmZpbHRlcihnb29kID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGdvb2QuaWQgIT09IGlkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnQnLCBKU09OLnN0cmluZ2lmeShuZXdDYXJ0KSlcclxuICAgICAgICByZW5kZXJDYXJ0R29vZHMoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpKSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGx1c0NhcnRJdGVtID0gKGlkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FydCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcnQnKSlcclxuXHJcbiAgICAgICAgY29uc3QgbmV3Q2FydCA9IGNhcnQubWFwKGdvb2QgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZ29vZC5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIGdvb2QuY291bnQrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBnb29kXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnQnLCBKU09OLnN0cmluZ2lmeShuZXdDYXJ0KSlcclxuICAgICAgICByZW5kZXJDYXJ0R29vZHMoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpKSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtaW51c0NhcnRJdGVtID0gKGlkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FydCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcnQnKSlcclxuXHJcbiAgICAgICAgY29uc3QgbmV3Q2FydCA9IGNhcnQubWFwKGdvb2QgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZ29vZC5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnb29kLmNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdvb2QuY291bnQtLVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBnb29kXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnQnLCBKU09OLnN0cmluZ2lmeShuZXdDYXJ0KSlcclxuICAgICAgICByZW5kZXJDYXJ0R29vZHMoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpKSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJDYXJ0R29vZHMgPSAoZ29vZHMpID0+IHtcclxuICAgICAgICBsZXQgdG90YWxQcmljZSA9IDA7XHJcblxyXG4gICAgICAgIGNhcnRUYWJsZS5pbm5lckhUTUwgPSAnJ1xyXG5cclxuICAgICAgICBnb29kcy5mb3JFYWNoKGdvb2QgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcclxuICAgICAgICAgICAgdHIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPHRkPiR7Z29vZC5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+JHtnb29kLnByaWNlfSQ8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XCJjYXJ0LWJ0bi1taW51c1wiXCI+LTwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+JHtnb29kLmNvdW50fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzcz1cIiBjYXJ0LWJ0bi1wbHVzXCJcIj4rPC9idXR0b24+PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZD4keytnb29kLnByaWNlICogK2dvb2QuY291bnR9JDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzcz1cImNhcnQtYnRuLWRlbGV0ZVwiXCI+eDwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgdG90YWxQcmljZSArPSBnb29kLnByaWNlICogZ29vZC5jb3VudFxyXG5cclxuICAgICAgICAgICAgY2FydFRhYmxlLmFwcGVuZCh0cilcclxuXHJcbiAgICAgICAgICAgIHRyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcnQtYnRuLW1pbnVzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW51c0NhcnRJdGVtKGdvb2QuaWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FydC1idG4tcGx1cycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGx1c0NhcnRJdGVtKGdvb2QuaWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FydC1idG4tZGVsZXRlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVDYXJ0SXRlbShnb29kLmlkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNhcnRUb3RhbC5pbm5lckhUTUwgPSB0b3RhbFByaWNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZEZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FydEFycmF5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcnQnKSA/XHJcbiAgICAgICAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcnQnKSkgOiBbXVxyXG5cclxuICAgICAgICBmZXRjaCgnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgY2FydDogY2FydEFycmF5LFxyXG4gICAgICAgICAgICAgICAgbmFtZTogZm9ybU5hbWVbMF0udmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwaG9uZTogZm9ybVBob25lWzBdLnZhbHVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlzQ2hlY2tPdXQgPSB0cnVlXHJcbiAgICAgICAgICAgIGNhcnRJbm5lck1vZGFsLnN0eWxlLmFuaW1hdGlvbk5hbWUgPSAnc2xpZGUtb3V0JztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG1vZGFsRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBzZW5kRm9ybSgpXHJcbiAgICB9KVxyXG4gICAgY2FydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBjYXJ0QXJyYXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpID9cclxuICAgICAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpKSA6IFtdXHJcblxyXG4gICAgICAgIHJlbmRlckNhcnRHb29kcyhjYXJ0QXJyYXkpXHJcblxyXG4gICAgICAgIGNhcnRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGNhcnRJbm5lck1vZGFsLnN0eWxlLmFuaW1hdGlvbk5hbWUgPSAnc2xpZGUtaW4nO1xyXG4gICAgfSlcclxuICAgIGNhcnRJbm5lck1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoaXNPdXQpIHtcclxuICAgICAgICAgICAgY2FydElubmVyTW9kYWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMCknO1xyXG4gICAgICAgICAgICBpc091dCA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vSWYgY2FsbGVkIGZyb20gY2hlY2tvdXQgYnV0dG9uLCBjbGVhciBjYXJ0IG9ubHkgb24gYW5pbWF0aW9uIGVuZFxyXG4gICAgICAgICAgICBpZiAoaXNDaGVja091dCkge1xyXG4gICAgICAgICAgICAgICAgaXNDaGVja091dCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYXJ0VGFibGUuaW5uZXJIVE1MID0gJydcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjYXJ0JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXJ0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICBpc091dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNhcnRJbm5lck1vZGFsLnN0eWxlLmFuaW1hdGlvbk5hbWUgPSAnc2xpZGUtb3V0JztcclxuICAgIH0pXHJcblxyXG4gICAgY2FydE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJsYXknKSkge1xyXG4gICAgICAgICAgICBjYXJ0SW5uZXJNb2RhbC5zdHlsZS5hbmltYXRpb25OYW1lID0gJ3NsaWRlLW91dCc7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAoZ29vZHNDb250YWluZXIpIHtcclxuICAgICAgICBnb29kc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5hZGQtdG8tY2FydCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b25Ub0NhcnQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmFkZC10by1jYXJ0JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdvb2RJZCA9IGJ1dHRvblRvQ2FydC5kYXRhc2V0LmlkXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkVG9DYXJ0KGdvb2RJZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGdldEdvb2RzID0gKCkgPT4ge1xyXG4gICAgLy8gSSBhZGRlZCB0aGlzIHBhcnQgdG8gc2ltcGx5IGFkZCB2aWV3YWxsIGxpbmsgdG8gdGhlIFwibGlua3NcIiB3aXRob3V0IGNoYW5naW5nIHZpZXdhbGwgY2xhc3Nlc1xyXG4gICAgY29uc3Qgdmlld0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3JlJyk7XHJcbiAgICBsZXQgd2FzQWRkZWQgPSBmYWxzZTtcclxuICAgIGlmICh2aWV3QWxsICYmICF2aWV3QWxsLmNsYXNzTGlzdC5jb250YWlucygnbmF2aWdhdGlvbi1saW5rJykpIHtcclxuICAgICAgICB2aWV3QWxsLmNsYXNzTGlzdC5hZGQoJ25hdmlnYXRpb24tbGluaycpXHJcbiAgICAgICAgd2FzQWRkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdmlnYXRpb24tbGluaycpXHJcblxyXG4gICAgaWYgKHdhc0FkZGVkKSB7XHJcbiAgICAgICAgdmlld0FsbC5jbGFzc0xpc3QucmVtb3ZlKCduYXZpZ2F0aW9uLWxpbmsnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlckdvb2RzID0gKGdvb2RzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ29vZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9uZy1nb29kcy1saXN0JylcclxuXHJcbiAgICAgICAgZ29vZHNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICAgICAgICBnb29kcy5mb3JFYWNoKGdvb2QgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnb29kQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5cclxuICAgICAgICAgICAgZ29vZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ2NvbC1sZy0zJylcclxuICAgICAgICAgICAgZ29vZEJsb2NrLmNsYXNzTGlzdC5hZGQoJ2NvbC1zbS02JylcclxuXHJcbiAgICAgICAgICAgIGdvb2RCbG9jay5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ29vZHMtY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgJHtnb29kLmxhYmVsID8gbnVsbCA6ICdkLW5vbmUnfVwiPiR7Z29vZC5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJkYi8ke2dvb2QuaW1nfVwiIGFsdD1cIiR7Z29vZC5uYW1lfVwiIGNsYXNzPVwiZ29vZHMtaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJnb29kcy10aXRsZVwiPiR7Z29vZC5uYW1lfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJnb29kcy1kZXNjcmlwdGlvblwiPiR7Z29vZC5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBnb29kcy1jYXJkLWJ0biBhZGQtdG8tY2FydFwiIGRhdGEtaWQ9XCIke2dvb2QuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uLXByaWNlXCI+JCR7Z29vZC5wcmljZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICBnb29kc0NvbnRhaW5lci5hcHBlbmQoZ29vZEJsb2NrKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0RGF0YSA9ICh2YWx1ZSwgY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICBmZXRjaCgnaHR0cHM6Ly93aWxkYmVycmllcy1kYi1kZWZhdWx0LXJ0ZGIuZXVyb3BlLXdlc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwL2RiLmpzb24nKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IGNhdGVnb3J5ID8gZGF0YS5maWx0ZXIoaXRlbSA9PiBpdGVtW2NhdGVnb3J5XSA9PT0gdmFsdWUpIDogZGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnb29kcycsIEpTT04uc3RyaW5naWZ5KGFycmF5KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAhPSBcIi9nb29kcy5odG1sXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZ29vZHMuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyR29vZHMoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rVmFsdWUgPSBsaW5rLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeSA9IGxpbmsuZGF0YXNldC5maWVsZDtcclxuICAgICAgICAgICAgZ2V0RGF0YShsaW5rVmFsdWUsIGNhdGVnb3J5KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dvb2RzJykgJiYgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9nb29kcy5odG1sXCIpIHtcclxuICAgICAgICByZW5kZXJHb29kcyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnb29kcycpKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBzZWFyY2ggfSBmcm9tIFwiLi9tb2R1bGVzL3NlYXJjaFwiO1xyXG5pbXBvcnQgeyBjYXJ0IH0gZnJvbSBcIi4vbW9kdWxlcy9jYXJ0XCI7XHJcbmltcG9ydCB7IGdldEdvb2RzIH0gZnJvbSBcIi4vbW9kdWxlcy9nZXRHb29kc1wiO1xyXG5cclxuc2VhcmNoKClcclxuY2FydCgpXHJcbmdldEdvb2RzKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///220\n")}},__webpack_exports__={};__webpack_modules__[220]()})();