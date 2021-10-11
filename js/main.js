"use strict";

// loading

$(document).ready(function () {
  $(".sk-cube-grid").fadeOut(500, function () {
    $("#loading").fadeOut(500, function () {
      $("body").css("overflow-y", "auto");
      $("#loading").remove();
    });
  });
});

// sidebar

$("a[href^='#']").click(function (e) {
  let href = $(e.target).attr("href");
  let secOffset = $(href).offset().top;
  $("html,body").animate({ scrollTop: secOffset }, 1500);
});

let links = document.querySelectorAll(".linkContainer a");

let boxWidth = $(".box").outerWidth();

$(".boxContainer").animate({ left: `-${boxWidth}` }, 0);

$(".icon").click(function () {
  if ($(".boxContainer").css("left") == "0px") {
    $(".boxContainer").animate({ left: `-${boxWidth}` }, 1000);
    $(".icon").html(`<i class="fas fa-bars fa-fw"></i>`);
    for (let i = 0; i < links.length; i++) {
      $(links[i]).animate({ "top": "500" }, 1000)
    }
  }
  else {
    $(".boxContainer").animate({ left: `0px` }, 1000);
    $(".icon").html(`<i class="fas fa-times fa-fw"></i>`);
    let duration = 1100;
    for (let i = 0; i < links.length; i++) {
      $(links[i]).animate({ "top": "0" }, duration);
      duration += 200;
    }
  }
})

// home

let movies = [];
let divs = document.querySelector(".divs");
let movieDetails;

$(".trend").click(getTrending);

$(".link").click(function (e) {
  getList($(e.target).attr("value"));
})

async function getList(list) {
  let response = await fetch(`https://api.themoviedb.org/3/movie/${list}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`);
  let movieDetails = await response.json();
  movies = movieDetails.results;
  if (response.status == 200) {
    displayMovies();
  }
}

$("#search").keyup(function (e) {
  getMovies(e.target.value)
});

$("#filter").keyup(function (e) {
  filterMovies(e.target.value)
});

async function getMovies(movie) {
  let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&query=${movie}`);
  let movieDetails = await response.json();
  movies = movieDetails.results;
  if (movies != undefined && movies.length > 0) {
    displayMovies();
  }
  else if (movies == undefined) {
    getTrending();
  }
  else {
    divs.innerHTML = `<div class="fs-1 text-center text-white fw-bolder">No Match</div>`;
  }
}

async function getTrending() {
  let response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`);
  let movieDetails = await response.json();
  movies = movieDetails.results;

  if (response.status == 200) {
    displayMovies();
  }
}
getTrending()

function displayMovies() {
  let cols = ``;
  for (let i = 0; i < movies.length; i++) {
    cols += `
      <div class="col-lg-4 col-md-6 my-3">
      <div class="position-relative imgContainer overflow-hidden shadow">
          <div class="layer d-flex justify-content-center align-items-center">
          <div class="text-center px-1">
          <h3>${movies[i].original_title}</h3>
          <p>${movies[i].overview}</p>
          <p>Rate: ${movies[i].vote_average}</p>
          <p>${movies[i].release_date}</p>
          </div>
          </div>
          <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" alt="">
      </div>
  </div>`
  }
  divs.innerHTML = cols;

}

function filterMovies(term) {
  let cols = ``;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].original_title.toLowerCase().includes(term.toLowerCase()) == true) {

      cols += `
      <div class="col-lg-4 col-md-6 my-3">
      <div class="position-relative imgContainer overflow-hidden shadow">
          <div class="layer d-flex justify-content-center align-items-center">
          <div class="text-center px-1">
          <h3>${movies[i].original_title}</h3>
          <p>${movies[i].overview}</p>
          <p>Rate: ${movies[i].vote_average}</p>
          <p>${movies[i].release_date}</p>
          </div>
          </div>
          <img class="img-fluid" src="https://image.tmdb.org/t/p/original${movies[i].poster_path}" alt="">
      </div>
  </div>`
    }
  }

  if (cols.length == 0) {
    divs.innerHTML = `<div class="fs-1 text-center text-white fw-bolder">No Match</div>`;
  }
  else {
    divs.innerHTML = cols;
  }
}

// subscribe

$(".submit").click(function () {
  if (nameCheck == true && emailCheck == true && phoneCheck == true && ageCheck == true
    && passwordCheck == true && rePasswordCheck == true) {
    $("#successAlert").removeClass("d-none");
    $("#requiredAlert").addClass("d-none");
    $(".submit").addClass("disabled");
    clearForm();
  }
  else {
    $("#successAlert").addClass("d-none");
    $("#requiredAlert").removeClass("d-none");
  }
});

$("#name").keyup(namevalidition);
let nameInput = document.querySelector("#name");
let nameCheck;
function namevalidition() {
  let nameRjex = /^[A-Z a-z]{2,20}$/;
  if (nameRjex.test(nameInput.value) == true) {
    $("#nameAlert").addClass("d-none");
    nameCheck = true;
  }
  else {
    $("#nameAlert").removeClass("d-none");
    nameCheck = false;
  }
  removeDisable();
}

$("#email").keyup(emailvalidition);
let emailInput = document.querySelector("#email");
let emailCheck;
function emailvalidition() {
  let emailRjex = /^\S+@\w+\.{1}\w{2,5}$/;
  if (emailRjex.test(emailInput.value) == true) {
    $("#emailAlert").addClass("d-none");
    emailCheck = true;
  }
  else {
    $("#emailAlert").removeClass("d-none");
    emailCheck = false;
  }
  removeDisable();
}

$("#phone").keyup(phonevalidition);
let phoneInput = document.querySelector("#phone");
let phoneCheck;
function phonevalidition() {
  let phoneRjex = /^(010|011|012|015)[0-9]{8}$/;
  if (phoneRjex.test(phoneInput.value) == true) {
    $("#phoneAlert").addClass("d-none");
    phoneCheck = true;
  }
  else {
    $("#phoneAlert").removeClass("d-none");
    phoneCheck = false;
  }
  removeDisable();
}

$("#age").keyup(agevalidition);
let ageInput = document.querySelector("#age");
let ageCheck;
function agevalidition() {
  let ageRjex = /^([2-9][0-9]|18|19)$/;
  if (ageRjex.test(ageInput.value) == true) {
    $("#ageAlert").addClass("d-none");
    ageCheck = true;
  }
  else {
    $("#ageAlert").removeClass("d-none");
    ageCheck = false;
  }
  removeDisable();
}

$("#password").keyup(passwordvalidition);
let passwordInput = document.querySelector("#password");
let passwordCheck;
function passwordvalidition() {
  let passwordRjex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (passwordRjex.test(passwordInput.value) == true) {
    $("#passwordAlert").addClass("d-none");
    passwordCheck = true;
  }
  else {
    $("#passwordAlert").removeClass("d-none");
    passwordCheck = false;
  }
  removeDisable();
}

$("#rePassword").keyup(rePasswordvalidition);
let rePasswordInput = document.querySelector("#rePassword");
let rePasswordCheck;
function rePasswordvalidition() {
  if (passwordInput.value == rePasswordInput.value) {
    $("#rePasswordAlert").addClass("d-none");
    rePasswordCheck = true;
  }
  else {
    $("#rePasswordAlert").removeClass("d-none");
    rePasswordCheck = false;
  }
  removeDisable();
}

function removeDisable() {
  if (nameCheck == true && emailCheck == true && phoneCheck == true && ageCheck == true
    && passwordCheck == true && rePasswordCheck == true) {
    $(".submit").removeClass("disabled");
  }
  else {
    $(".submit").addClass("disabled");
  }
}

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  ageInput.value = "";
  passwordInput.value = "";
  rePasswordInput.value = "";
}