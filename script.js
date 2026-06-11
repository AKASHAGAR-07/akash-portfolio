document.addEventListener("DOMContentLoaded", () => {

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

if(hamburger){

hamburger.addEventListener("click", () => {

hamburger.classList.toggle("active");

navLinks.classList.toggle("active");

});

}

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

anchor.addEventListener("click",
function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

window.scrollTo({

top:
target.offsetTop - 80,

behavior:"smooth"

});

}

});

});

window.addEventListener("scroll", () => {

const header =
document.querySelector("header");

if(window.scrollY > 50){

header.style.background =
"#0b1120";

}
else{

header.style.background =
"#111827";

}

});

});