'use strict'

let rowData =document.getElementById('row-data');
let submitBtn;

//Contact us functions validation
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

    $(document).ready(() => {
        searchByName("").then(() => {
            $(".loading").fadeOut(500);
            $("body").css("overflow", "auto");

        })
        

        
    })


$('.open-close-icon').click(()=>{
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav();
      
    } else {
      
        openSideNav();
    }
});

function openSideNav(){
$('.side-nav-menu').animate({
    left:0}
    ,500);
    $(".open-close-icon i").removeClass("fa-align-justify");
    $(".open-close-icon i").addClass("fa-x");

    for (let i = 0; i < 5; i++) 
    {
        $('.nav-links li').eq(i).animate({
                top:0
            },(i + 5) * 80);
     
    }
}

function closeSideNav(){
let width= $('.nav-tab').innerWidth();
let headerWidth= $('.nav-header').innerWidth();

$( '.side-nav-menu').animate({
    left: -(width-headerWidth)
}, 500);

$(".open-close-icon i").addClass("fa-align-justify");
$(".open-close-icon i").removeClass("fa-x");

$(".nav-links li").animate({
    top: 300
}, 500)

}

closeSideNav();

function displayMeals(array) {
    closeSideNav();
    rowData.innerHTML="";   
        let box="";

    for (let i = 0; i < array.length; i++) {
        box+=`
        <!-- meal design -->
        <div class="col-md-3">
             <div   onclick="getmeal('${array[i].idMeal}')" class=" meal rounded-2  position-relative  overflow-hidden ">
                     <div class="img ">
                         <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
                         <div class="meal-overlay position-absolute  d-flex align-items-center text-black p-2" id="meal-overlay">
                             <h3>${array[i].strMeal}</h3>
                         </div>
                     </div>
                 
                 
             </div>
        </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}
function displayCategories(array) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");

        let box="";

    for (let i = 0; i < array.length; i++) {
        box+=`
      
        <div class="col-md-3">
    
             <div onclick="getCategoryMeal ('${array[i].strCategory}')"  class=" meal rounded-2  position-relative  overflow-hidden ">
                 <div class="img ">
                     <img class="w-100" src="${array[i].strCategoryThumb}" alt="" srcset="">

                     <div class="meal-overlay position-absolute  d-flex flex-column align-items-center justify-content-center text-black p-2" id="meal-overlay">
                         <h3>${array[i].strCategory}</h3>
                         <p class="lead fs-6 text-center">${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}  </p>
                     </div>
                 </div>
             </div>
          </div>

         
          </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}
function displayArea(array) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");
            let box="";
    for (let i = 0; i < array.length; i++) {
        box+=`
            <!-- Area design -->
            <div class="col-md-3">
        
                <div onclick="getAreaMeal('${array[i].strArea}')" class=" meal rounded-2  text-center   p-2">
                    <div class="area-show ">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${array[i].strArea}</h3>
                    </div>

                </div>

            </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}


function displayIngredients(array) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");
                let box="";
 
    for (let i = 0; i < array.length; i++) {
        box+=`
        <!--Ingredients design -->
        <div class="col-md-3">
            <div onclick="getIngredientsMeal('${array[i].strIngredient}')" class=" meal rounded-2  text-center   p-2">
                <div class="area-show ">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${array[i].strIngredient}</h3>
                 
                    <p>${array[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>

            </div>

         </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}

function displayMealDetails(meal) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");
            let box="";
    let Ingredient="",Tags,tageStr="";
    for (let i=0; i<20 ;i++) {
        meal[`strIngredient${i}`] ? Ingredient+= `<li class="alert alert-info m-2 p-1" >${meal[`strMeasure${i}`] } ${meal[`strIngredient${i}`] }</li>`:"";
    }
    meal.strTags?Tags=meal.strTags.split(",") : Tags = [];

    for (const i of Tags) {
        tageStr+= `<li class="alert alert-danger m-2 p-1" >${i}</li>`;
    }
      
    rowData.innerHTML+=`
                <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                    <h2>${meal.strCategory}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions} </p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${Ingredient}
                    </ul>

                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tageStr}
                    </ul>

                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
        `;
        
 

}


async function searchByName(name) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        response = await response.json();
      
        response.meals ? displayMeals(response.meals) : displayMeals([])
        $(".inner-loading-screen").fadeOut(300)
    
}

async function searchByFLetter(fLetter) {
    closeSideNav();
    rowData.innerHTML="";
    fLetter==""? fLetter="a":"";

    $(".inner-loading-screen").fadeIn(300);
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fLetter}`)
        response = await response.json();
        response.meals ? displayMeals(response.meals) : displayMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}
    async function getCategories() {
        closeSideNav();
        rowData.innerHTML="";
        $(".inner-loading-screen").fadeIn(300);
         let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            response = await response.json();
   
            response.categories ? displayCategories(response.categories) : displayCategories([])
            $(".inner-loading-screen").fadeOut(300)
        
    }

    async function searchByArea() {
        closeSideNav();
        rowData.innerHTML="";
        $(".inner-loading-screen").fadeIn(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            response = await response.json();
        
            response.meals ? displayArea(response.meals) : displayArea([])
            $(".inner-loading-screen").fadeOut(300)
        
    }
async function searchByIngredients() {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        response = await response.json();
    
        response.meals ? displayIngredients(response.meals.slice(0, 20)) : displayIngredients([])
        $(".inner-loading-screen").fadeOut(300)
    
}
async function getmeal(mealID) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        response = await response.json();
    
        response.meals ? displayMealDetails(response.meals[0]) : "";
        $(".inner-loading-screen").fadeOut(300)
    
}
async function getCategoryMeal(category) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        response = await response.json();
    
        response.meals ? displayMeals(response.meals.slice(0, 20)) : displayMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}
async function getAreaMeal(area) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        response = await response.json();
    
        response.meals ? displayMeals(response.meals.slice(0, 20)) : displayMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}

async function getIngredientsMeal(Ingredients) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
        response = await response.json();
    
        response.meals ? displayMeals(response.meals.slice(0, 20)) : displayMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}


function showContactInputs() {
rowData.innerHTML=` <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                        <div class="container w-75 text-center">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                        Special characters and numbers not allowed
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                        Email not valid *exemple@yyy.zzz
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                        Enter valid Phone Number
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                        Enter valid age
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                        Enter valid repassword 
                                    </div>
                                </div>
                            </div>
                            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                        </div>
                        </div> `
;

            submitBtn = document.getElementById("submitBtn")


            document.getElementById("nameInput").addEventListener("focus", () => {
                nameInputTouched = true
            })

            document.getElementById("emailInput").addEventListener("focus", () => {
                emailInputTouched = true
            })

            document.getElementById("phoneInput").addEventListener("focus", () => {
                phoneInputTouched = true
            })

            document.getElementById("ageInput").addEventListener("focus", () => {
                ageInputTouched = true
            })

            document.getElementById("passwordInput").addEventListener("focus", () => {
                passwordInputTouched = true
            })

            document.getElementById("repasswordInput").addEventListener("focus", () => {
                repasswordInputTouched = true
            })

}





function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

function showSearchInputs() {
    $('.search-container').html(`
   
    <div class="container">
            <div class="row py-5 g-4 " id="row-data">
                <div class="col-md-6">
                    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
                </div>
            </div>  
    </div>
  
 `);
    rowData.innerHTML="";

}