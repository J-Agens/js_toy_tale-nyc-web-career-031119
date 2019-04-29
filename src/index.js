const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.getElementById('toy-collection')
const TOYS_URL = 'http://localhost:3000/toys'
const addToyForm = document.querySelector('.add-toy-form');
const nameInput = document.getElementById('toy-name-input');
const imageInput = document.getElementById('toy-img-input');

// YOUR CODE HERE
function fetchToys(url) {
  fetch(url)
  .then(res => res.json())
  .then(toys => renderToys(toys))
}

function renderToys(toys) {
  toys.forEach(function(toy) {
    renderToy(toy);
  })
}

function renderCardInterior(toy) {
  const card = document.body.querySelector(`[data-toy='${toy.id}']`)
  card.innerHTML = '';
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p data-likes=${toy.likes}>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
}

function renderToy(toy) {
  let card = document.createElement("div");
  card.dataset.toy = toy.id;
  card.className = "card";
  toyCollection.appendChild(card);

  renderCardInterior(toy);
  //
  // card.innerHTML = `
  // <h2>${toy.name}</h2>
  // <img src=${toy.image} class="toy-avatar" />
  // <p>${toy.likes} Likes </p>
  // <button class="like-btn">Like <3</button>
  // `

  // toyCollection.innerHTML += `
  // <div class="card" data-toy="${toy.id}">
  // <h2>${toy.name}</h2>
  // <img src=${toy.image} class="toy-avatar" />
  // <p>${toy.likes} Likes </p>
  // <button class="like-btn">Like <3</button>
  // </div>
  // `
}

function submitData(toyName, toyImg, toyLikes) {
  let formData = {
    name: toyName,
    image: toyImg,
    likes: toyLikes
  }

  let configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(TOYS_URL, configObj)
  .then(res => res.json())
  .then(toy => renderToy(toy))
}

function increaseLikes(toyID, toyLikes) {

  let likes = {likes: toyLikes};

  let configObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(likes)
  };

  fetch(TOYS_URL+`/${toyID}`, configObj)
  .then(res => res.json())
  .then(toy => renderCardInterior(toy))
}

fetchToys(TOYS_URL);

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


addToyForm.addEventListener('submit', function(e) {
  e.preventDefault();
  submitData(nameInput.value, imageInput.value, 0);

});

toyCollection.addEventListener('click', function(e) {
  if (e.target.className === "like-btn") {
    let toyCard = e.target.parentNode
    let currentLikes = parseInt(toyCard.querySelector('p').dataset.likes)
    currentLikes += 1
    increaseLikes(toyCard.dataset.toy, currentLikes)
  }
});


// OR HERE!
