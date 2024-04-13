let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tmp ;
let mood = "create";


function getTotal(){
    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{total.innerHTML = '';
    total.style.background = '#a00d02';}
}

let datePro;
if(localStorage.product != null){
    datePro = JSON.parse(localStorage.product)
}else{
    datePro = [];
}


submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != ""
    && price.value != ""
    && category.value != ""
    && count.value <= 100){
        if(mood === "create"){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                datePro.push(newPro);
            }
        }else{
            datePro.push(newPro);
        }
    }else{
            datePro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block";
        }
    clearDate()
    }
    localStorage.setItem('product', JSON.stringify(datePro))
    showDate()
}

function clearDate(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showDate(){
    let table = '';
    for(let i = 0; i < datePro.length; i++){
        table += `
        <tr>
            <td>${i +1}</td>
            <td>${datePro[i].title}</td>
            <td>${datePro[i].price}</td>
            <td>${datePro[i].taxes}</td>
            <td>${datePro[i].ads}</td>
            <td>${datePro[i].discount}</td>
            <td>${datePro[i].total}</td>
            <td>${datePro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(datePro.length > 0){
btnDelete.innerHTML = `
<button onclick="deleteAll()">delete All (${datePro.length})</button>
`
    }else{
        btnDelete.innerHTML = '';
    }
    getTotal()
}

showDate()

function deleteDate(i){
    datePro.splice(i,1);
    localStorage.product = JSON.stringify(datePro);
showDate()
}

function deleteAll(){
    localStorage.clear()
    datePro.splice(0)
showDate()
}

function updateData(i){
    title.value = datePro[i].title;
    price.value = datePro[i].price;
    taxes.value = datePro[i].taxes;
    ads.value = datePro[i].ads;
    discount.value = datePro[i].discount;
    total.value = datePro[i].total;
    category.value = datePro[i].category;
    count.style.display = "none";
    submit.innerHTML = "update";
    mood = "update"
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
    getTotal()
}

let SearchMood = "title";
function getSearchMood(id){
    let search = document.getElementById("search")
    if(id == "searchTitle"){
        SearchMood = "title";
    }else{
        SearchMood = "category";
    }
    search.placeholder = "search by "+SearchMood;
    search.focus();
    search.value = "";
    showDate();
}

function searchData(value){
    let table = '';
    for(let i = 0; i < datePro.length; i++){
        if(SearchMood === "title"){
            if(datePro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i +1}</td>
                <td>${datePro[i].title}</td>
                <td>${datePro[i].price}</td>
                <td>${datePro[i].taxes}</td>
                <td>${datePro[i].ads}</td>
                <td>${datePro[i].discount}</td>
                <td>${datePro[i].total}</td>
                <td>${datePro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>
            `;
        }
    }else{
            if(datePro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i +1}</td>
                <td>${datePro[i].title}</td>
                <td>${datePro[i].price}</td>
                <td>${datePro[i].taxes}</td>
                <td>${datePro[i].ads}</td>
                <td>${datePro[i].discount}</td>
                <td>${datePro[i].total}</td>
                <td>${datePro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>
            `;
        }
    }
}
    document.getElementById('tbody').innerHTML = table;
}