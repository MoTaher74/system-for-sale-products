// get total 
// inputs

const title=document.getElementById("title");
const price=document.getElementById("price");
const ads=document.getElementById("ads");
const taxes=document.getElementById("taxes");
const discount=document.getElementById("discount");
const total=document.getElementById("total");
const counter=document.getElementById("count");
const category=document.getElementById("category");
const btn_create=document.getElementById("submit");
// tbady
const tbody = document.getElementById("tbody");
/////////////////
// create delete all Btn
const btn_delAll =document.getElementById("delete-all");

////////////////////////////////////////////////

//[1.fun. updateData()] def. global variable use to change between diff. mood( create & update)

let mood = "create" /* mood= create by default because the purpose
                    of this site is to register and display products first , 
                    and then Updata them in case of an errors .*/
let n; // dummy variable 


// ////////////////////
// for checked
// console.log(ads);
// console.log(btn_create);
// console.log(category);
// console.log(counter);
// console.log(discount);

// console.log(price);
// console.log(taxes);
// console.log(title);
// console.log(total);

// create get total functions
function getTotal() {
    if(price.value != ''){
        const result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.background='var(--btn-color)';
        total.style.color="white";
    }
    else{
        total.innerHTML = '';
        total.style.background='var(--sec-color)';
        total.style.color="#222";
    }
}

// create the create function button 
let arrayProduct;
if(localStorage.product !=null){
    arrayProduct = JSON.parse(localStorage.product );
}
else{
    arrayProduct = [];
}

// let arrayProduct=[];
btn_create.onclick=function(){
// create new object ,this obj create dynamic when click on the create button
let newProduct = {
    title: title.value,
    price:price.value,
    ads:ads.value,
    taxes:taxes.value,
    discount:discount.value,
    total:total.innerHTML,
    counter:counter.value,
    category:category.value

}
/* [3.fun. updateData()] the goal here is to create two conditions :
* 1- if(mood === "create")? => this Site continues to be 
*                           Create and displaynewProduct.counter 
*        if(newProduct.counter > 1){
            for(let i =0 ; i<newProduct.counter ; i++){
            arrayProduct.push(newProduct);
            }
        }else {

            arrayProduct.push(newProduct);
                }
*
* 2- else if(mood==='update') ?
*/

if(title.value != '' && price.value != '' && category.value != ''){
    if(mood === 'create'){
        if(newProduct.counter > 1){
            for(let i =0 ; i<newProduct.counter ; i++){
                arrayProduct.push(newProduct);
            }
        }else {
        
            arrayProduct.push(newProduct);
        }
    }
    else{
        arrayProduct[n]=newProduct;
        mood = 'create';
        btn_create.innerHTML = "Create";
        counter.style.display ="block";
    
    }
    clearData();
}



// create the counter 
// if(newProduct.counter > 1){
//     for(let i =0 ; i<newProduct.counter ; i++){
//         arrayProduct.push(newProduct);
//     }
// }else {

//     arrayProduct.push(newProduct);
// }

localStorage.setItem('product',JSON.stringify(arrayProduct));
// clearData();
showProduct();

}

// clear inputs 
function clearData(){
    title.value ='';
    price.value ='';
    ads.value ='';
    taxes.value='';
    discount.value='';
    total.innerHTML = '' ;
    counter.value ='';
    category.value ='';

}

// create function use that to read and show data in the body(on screen)

function showProduct(){

    // [4.fun. updateData()]
    getTotal();
    // console.log("Show data for this product");
    let tabel='';
    for(let i=1; i<arrayProduct.length;i++){
        // tabel = arrayProduct[i];
        // console.log(tabel);
        tabel += `
        
                    <tr>
                        <td>${i}</td>
                        <td>${arrayProduct[i].title}</td>
                        <td>${arrayProduct[i].category}</td>
                        <td>${arrayProduct[i].price} $</td>
                        <td>${arrayProduct[i].taxes} $</td>
                        <td>${arrayProduct[i].ads} $</td>
                        <td>${arrayProduct[i].discount} $</td>
                        <td>${arrayProduct[i].total} $</td>
                        <td><button onclick=" updateData(${i})"id="update" >Update</button></td>
                        <td><button onclick=" deleteData(${i})" id="delete" >Delete</button></td>
                    </tr>
        
        
        `

    }
    document.getElementById("tbody").innerHTML=tabel;

    // create the btn delete all 
    if(arrayProduct.length>0){
        btn_delAll.innerHTML = `
         <button onclick="deleteAll()" class="btn">Delete All(${arrayProduct.length})</button>`
    }else{
        btn_delAll.innerHTML ='';
    }
}

showProduct();

// Delete operations in the products
function deleteData(i){

// console.log("Deleted");
arrayProduct.splice(i,1);
// console.log(arrayProduct);
// remove product from localStorage
localStorage.product = JSON.stringify(arrayProduct);


    // add this function here for use remove and refresh element in screen dynamic
    showProduct();   
}
// create function use to Delete all product on click button Delete all

function deleteAll(){
    localStorage.clear();
    arrayProduct.splice(0);
    showProduct(); 
}
// create the update function



function updateData(i){
    // console.log("done");
    // get the methods(title - price -ads - taxes - etc... , = name of the main array that has been stored data)
    title.value = arrayProduct[i].title;
    price.value = arrayProduct[i].price;
    ads.value = arrayProduct[i].ads;
    counter.style.display="none";  // remove this in that step
    taxes.value = arrayProduct[i].taxes;
    discount.value = arrayProduct[i].discount;
    category.value = arrayProduct[i].category;
    // use fuction to control on total 
    getTotal();
    btn_create.innerHTML = "Update"; // change "create" =>> "Update"

   //[2.fun. updateData()] change your mood from create to update
    mood = "update";
    n=i;
    scroll({
        top:0,
        behavior:"smooth"
    });


}

/*************************************** */

// function to search two steps : 1) search with title & category
let moodSearch ='title' ; // search with title by default 

// this goal of this function is working when you press a 'title' button or 'category' button
// [1] first step add this function in HTML code inside buttons 'title' & 'category'
// [2] when you press the Btn, return your id 
function getSearchMood(id){
    // console.log(id); 
    let search = document.getElementById("search");
    if(id === "searchTitle"){
        moodSearch = "title";
        search.placeholder = "Search By Title"; // change Placeholder
    }else{
        moodSearch = "category";
        search.placeholder = "Search By Category";
    }
    search.focus();
    // console.log(moodSearch);
    search.value = '';
    showProduct();

}

// 2) search function
function searchData(value){
    let table ='';

    if(moodSearch === "title"){

        for(let i=0; i<arrayProduct.length;i++){
            // if(arrayProduct[i].title.toLowerCase().includes(value.toLowerCase())){
            if(arrayProduct[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
        
                <tr>
                    <td>${i}</td>
                    <td>${arrayProduct[i].title}</td>
                    <td>${arrayProduct[i].category}</td>
                    <td>${arrayProduct[i].price} $</td>
                    <td>${arrayProduct[i].taxes} $</td>
                    <td>${arrayProduct[i].ads} $</td>
                    <td>${arrayProduct[i].discount} $</td>
                    <td>${arrayProduct[i].total} $</td>
                    <td><button onclick=" updateData(${i})"id="update" >Update</button></td>
                    <td><button onclick=" deleteData(${i})" id="delete" >Delete</button></td>
                </tr>
    
    
    `
            }

}
}
else{
    for(let i=0; i<arrayProduct.length;i++){
        // if(arrayProduct[i].title.toLowerCase().includes(value.toLowerCase())){
        if(arrayProduct[i].category.toLowerCase().includes(value.toLowerCase())){
            table += `
    
            <tr>
                <td>${i}</td>
                <td>${arrayProduct[i].title}</td>
                <td>${arrayProduct[i].category}</td>
                <td>${arrayProduct[i].price} $</td>
                <td>${arrayProduct[i].taxes} $</td>
                <td>${arrayProduct[i].ads} $</td>
                <td>${arrayProduct[i].discount} $</td>
                <td>${arrayProduct[i].total} $</td>
                <td><button onclick=" updateData(${i})"id="update" >Update</button></td>
                <td><button onclick=" deleteData(${i})" id="delete" >Delete</button></td>
            </tr>


`
        }

}
}
    document.getElementById("tbody").innerHTML=table;
}
