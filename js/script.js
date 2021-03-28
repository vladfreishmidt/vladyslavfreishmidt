const container = document.querySelector('.products-box');
let allMeals = document.querySelectorAll('.product-box__item');
const cartQty = document.querySelector('#cart-qty');
const cartPrice = document.querySelector('#cart-price');
const qtyInput = document.querySelector('.qty__item');
const modal = document.querySelector('#modal');
const form = document.querySelector('#form');
const nameInput = form.querySelector('input[type=text]');
const emailInput = form.querySelector('input[type=email]');
let qty;


// Set default meal quantity for all the inputs

let qtyInputAll = document.querySelectorAll('.qty__item');
qtyInputAll = Array.from(qtyInputAll).map(input => {
  input.defaultValue = '1';
})


// Event handlers

document.addEventListener('click', clickHandler);
document.addEventListener('change', qtyChangeHandler);

function clickHandler(e) {
  const {target, type} = e;

  switch(target.dataset.btn) {
    case "add":
      let currentQty = +target.previousElementSibling.firstElementChild.value;
      addToCart(target.parentNode.parentNode, currentQty);
      break;
    case "checkout":
      showModal();
      break;
    case "close":
      closeModal();
      break;
    case "submit":
      formSubmit(e);
      break;
  }
}

function qtyChangeHandler(e) {
  const {target} = e;

  if(target === qtyInput) {
    qty = +target.value;
  }

}


// Update cart info

let mealsInCart = 0;
let totalPrice = 0;

function addToCart(product, qty=1)  {
  let mealPrice = +product.dataset.price;

  mealsInCart += qty;
  totalPrice += (mealPrice * qty);

  cartQty.innerText= mealsInCart;
  cartPrice.innerText = totalPrice;
}


//Filter by category and price

const categoryFilterInput = document.querySelector('#select-category');
const priceFilterInput = document.querySelector('#select-price');

document.addEventListener('change', (e) => {
  if(e.target !== categoryFilterInput && e.target !== priceFilterInput) {
    return;
  }

  selectedCategory = categoryFilterInput.value;
  selectedPrice = +priceFilterInput.value;

  allMeals.forEach(meal => {
    if((meal.dataset.price <= selectedPrice || selectedPrice === 0) &&
        (meal.dataset.category === selectedCategory || selectedCategory === '0')) {
      meal.style.display = "block";
    } else {
      meal.style.display = "none";
    }
  });
});


// Show Modal

function showModal() {
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
  nameInput.value = '';
  emailInput.value ='';
}

function resetCart() {
  mealsInCart = 0;
  totalPrice = 0;
  cartQty.innerText = mealsInCart;
  cartPrice.innerText = totalPrice;
}


// Submit form

function formSubmit(e) {
  e.preventDefault();

  if(!nameInput.value.trim() || !emailInput.validity.valid) {
    alert('Пожалуйста проверьте поля формы');
  } else {
    alert('Спасибо за покупки!');
    resetCart();
    closeModal();
  }
}








