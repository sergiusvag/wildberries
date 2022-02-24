const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')
    const keyString = "DBKey-";
    let keys = JSON.parse(localStorage.getItem('keys'));
    let curKeyNum = localStorage.length + 1;
    let curKeyString;

    const getData = () => {
        fetch('https://wildberries-db-default-rtdb.europe-west1.firebasedatabase.app/db.json')
            .then(res => res.json())
            .then(data => {
                setToLocalStorage(data);
            })
    }

    // set the data to localstorage
    const setToLocalStorage = (data) => {
        curKeyString = keyString.concat(curKeyNum);
        localStorage.setItem(curKeyString, JSON.stringify(data));
        keys.push(curKeyString);
        localStorage.setItem('keys', JSON.stringify(keys));
        curKeyNum++;
    }
    
    // remove all DBs stored till now
    const removeAllFromLocalStorage = () => {
        const totalDBKeys = localStorage.length;
        for(let i = 0; i < totalDBKeys; i++ ) {
            localStorage.removeItem(keys[i]);
        }
        localStorage.removeItem('keys');
        keys = [];
    }

    // in case there are no keys
    if (keys === null) {
        keys = [];
    }

    // comment this function if you don't want to clean the db on refresh
    removeAllFromLocalStorage();

    // 
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            getData();
        })
    })
}

getGoods()