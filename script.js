const items = [
  {
    title: "Музыкальный мобиль",
    description: "Cтанет любимой забавой Вашего крохи с рождения!",
    tags: ["0-1"],
    price: 100,
    img: "./img/1.jpg",
    rating: 3.9,
  },
  {
    title: "Пальчиковый театр 'Домашние животные и птицы'",
    description: "Ребенок с удовольствием будет смотреть свой первый театр!",
    tags: ["0-1", "1-3"],
    price: 15,
    img: "./img/2.jpeg",
    rating: 4.5,
  },
  {
    title: "Развивающая игрушка-подвеска 'Кубик'",
    description: "Станет прекрасным подарком для крохи!",
    tags: ["0-1"],
    price: 40,
    img: "./img/3.jpg",
    rating: 4.1,
  },
  {
    title: "Пианино 'Слонёнок'",
    description: "Создаст прекрасное настроение юному дарованию!",
    tags: ["0-1", "1-3"],
    price: 30,
    img: "./img/4.jpg",
    rating: 5.0,
  },
  {
    title: "Каталка-автомобиль",
    description: "Стать обладателем автомобиля - предмет достоинства многих детей!",
    tags: ["1-3"],
    price: 130,
    img: "./img/5.jpg",
    rating: 4.8,
  },
  {
    title: "Велосипед детский трехколесный",
    description: "Комфортно, безопасно и  весело покорять новые маршруты!",
    tags: ["1-3"],
    price: 140,
    img: "./img/6.jpg",
    rating: 3.7,
  },
  {
    title: "Набор для лепки из легкого пластилина 'Веселая выпечка'",
    description: "Порадует всех юных кулинаров!",
    tags: ["1-3"],
    price: 25,
    img: "./img/7.jpg",
    rating: 4.0,
  },
  {
    title: "Мягкая игрушка 'Глазастик Кошечка'",
    description: "Подарите Вашему малышу маленькую плюшевую радость!",
    tags: ["0-1", "1-3"],
    price: 45,
    img: "./img/8.jpg",
    rating: 3.9,
  },
  {
    title: "Деревянная развивающая игрушка 'Бизиборд'",
    description: "Самый настоящий развивающий центр для малыша!",
    tags: ["0-1", "1-3"],
    price: 85,
    img: "./img/9.jpg",
    rating: 4.9,
  },
  {
    title: "Погремушка-прорезыватель",
    description: "Поможет снять напряжение малышу и весело проводить время!",
    tags: ["0-1"],
    price: 11,
    img: "./img/10.jpg",
    rating: 4.2,
  },
  {
    title: "Юла",
    description: "Придётся по душе как малышам, так и детишкам постарше!",
    tags: ["0-1", "1-3"],
    price: 15,
    img: "./img/11.jpg",
    rating: 4.0,
  },
  {
    title: "Кукла",
    description: "Прекрасный подарок для девочки!",
    tags: ["1-3"],
    price: 35,
    img: "./img/12.jpg",
    rating: 4.3,
  },
];

const itemTemplate = document.querySelector('#item-template');
const shopItems = document.querySelector('#shop-items');
const nothingFound = document.querySelector('#nothing-found');

function makeProductCard(shopItem) {
  const {title, description, tags, price, img, rating} = shopItem;

  const item = itemTemplate.content.cloneNode(true);
  item.querySelector('h1').textContent = title;
  item.querySelector('p').textContent = description;
  item.querySelector('.price').textContent = `${price}BYN`;
  item.querySelector('img').src = img;

  const ratingContainer = item.querySelector('.rating');

  for (let i = 0; i < rating; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    ratingContainer.append(star);
  };

  const tagsContainer = item.querySelector('.tags');

  tags.forEach((tag) => {
    const tagsWindow = document.createElement('span');
    tagsWindow.textContent = tag;
    tagsWindow.classList.add('tag');
    tagsContainer.append(tagsWindow);
  });

  return item;
};

function makeRender(arr) {
  nothingFound.textContent = "";
  shopItems.innerHTML = "";
  
  for (let item of arr) {
    shopItems.append(makeProductCard(item));
  }

  if (arr.length === 0) {
    nothingFound.textContent = "Ничего не найдено";
  }
};

let currentItems = [...items];
makeRender(currentItems.sort((a, b) => sortByAlphabet(a, b)));

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
};

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;

  switch (selectedOption) {
    case "expensive": {
      currentItems.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentItems.sort((a, b) => a.price - b.price);
      break;
    }
    case "alphabet": {
      currentItems.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
    case "rating": {
      currentItems.sort((a, b) => b.rating - a.rating);
      break;
    }
  }

  makeRender(currentItems);
});

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentItems = items.filter((elem) => elem.title.toLowerCase().includes(searchString));
  currentItems.sort((a, b) => sortByAlphabet(a, b));
  sortControl.selectedIndex = 0;

  makeRender(currentItems);
};

searchButton.addEventListener('click', applySearch);
searchInput.addEventListener('search', applySearch);