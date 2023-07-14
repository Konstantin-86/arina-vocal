const mainBtn = document.querySelector(".item-btn");
const formClose = document.querySelector(".form__close");
const form = document.querySelector(".form");
const formInput = document.querySelector(".form-input");
const sucsess = document.querySelector(".sucsess");
const burger = document.querySelector(".burger");
const list = document.querySelector(".list");
const body = document.querySelector("body");
const youTubeLink1 = document.querySelector(".covers__item1");
const youTubeLink2 = document.querySelector(".covers__item2");
const youTubeLink3 = document.querySelector(".covers__item3");
const youTubeLink4 = document.querySelector(".covers__item4");
const formContainer = document.querySelector(".form__container");
const lessonsBtn = document.querySelectorAll(".lessons__item-iner");
const lessonsText = document.querySelector(".lessons__item-text");
const lessonsItem = document.querySelectorAll(".lessons__item");
const lessonsItemImg = document.querySelector(".lessons__item-img");

///////////// Табы Взрослые-Дети
const priceAdultsBtn = document.querySelector(".price-adults");
const priceChildrenBtn = document.querySelector(".price-children");
const priceAdultsBox = document.querySelector(".price-adults__box");
const priceChildrenBox = document.querySelector(".price-children__box");
priceAdultsBtn.addEventListener("click", () => {
  priceChildrenBtn.classList.remove("active");
  priceAdultsBtn.classList.add("active");
  priceAdultsBox.style.display = "flex";
  priceChildrenBox.style.display = "none";
});
priceChildrenBtn.addEventListener("click", () => {
  priceChildrenBtn.classList.add("active");
  priceAdultsBtn.classList.remove("active");
  priceChildrenBox.style.display = "flex";
  priceAdultsBox.style.display = "none";
});
////////////////// Табы форма
const priceAdultsBoxItem = document.querySelectorAll(".price-adults__box-item");
const formTitle = document.querySelector(".form__title");
priceAdultsBoxItem.forEach((item) => {
  item.addEventListener("click", () => {
    let title = item.querySelector("h3");
    formTitle.textContent = `Записаться на ${title.textContent}`;
    form.classList.add("active");
    body.classList.add("lock");
    formContainer.style.display = "block";
  });
});
const priceChildrenBoxItem = document.querySelectorAll(
  ".price-children__box-item"
);
priceChildrenBoxItem.forEach((item) => {
  item.addEventListener("click", () => {
    let title = item.querySelector("h3");
    formTitle.textContent = `Записаться на ${title.textContent}`;
    form.classList.add("active");
    body.classList.add("lock");
    formContainer.style.display = "block";
  });
});
//////////////Buger//////////
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  list.classList.toggle("active");
  body.classList.toggle("lock");
  if (burger.classList.contains("active")) {
    mainBtn.style.display = "block";
  } else {
    mainBtn.style.display = "none";
  }
});
//////////////Buger//////////

////////////слайдер
let swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 35,
  speed: 700,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  // },
  breakpoints: {
    1220: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    850: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});
//////////////Ютуб кнопки сцылки
youTubeLink1.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "https://www.youtube.com";
});
youTubeLink2.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "https://www.youtube.com";
});
youTubeLink3.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "https://www.youtube.com";
});
youTubeLink4.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "https://www.youtube.com";
});

///////главная кнопка

if (burger.classList.contains("active")) {
  mainBtn.style.display = "block";
}
mainBtn.addEventListener("click", () => {
  form.classList.add("active");
  body.classList.add("lock");
  burger.style.display = "none";
  list.classList.remove("active");
  formContainer.style.display = "block";
  formTitle.textContent = `Записаться на пробное занятие`;
});
formClose.addEventListener("click", () => {
  form.classList.remove("active");
  body.classList.remove("lock");
  burger.classList.remove("active");
  formContainer.style.display = "none";
  if (window.innerWidth <= 830) {
    mainBtn.style.display = "none";
    burger.style.display = "block";
  }
});
////////вк кнопка

//////////отправка в телеграмм
const TOKEN = "6093158422:AAHT2xcxBLxjA5A74y1ryIg5wPCyHq5W9Is";
const ChatID = "-1001928993703";
const URI_API = `https://api.telegram.org/bot6093158422:AAHT2xcxBLxjA5A74y1ryIg5wPCyHq5W9Is/sendMessage`;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let message = `<b>Заявка с сайта</b>\n`;
  message += `<b>Категория:</b> ${formTitle.textContent}\n`;
  message += `<b>Отправитель:</b> ${this.name.value}\n`;
  message += `<b>Телефон:</b> ${this.tel.value}\n`;
  message += `<b>Информация:</b> ${this.text.value}`;

  if (this.name.value.length < 3) {
    this.name.classList.add("wrong");
    sucsess.style.display = "block";
    sucsess.innerHTML = "Напишите правильно Имя";
    setTimeout(function () {
      sucsess.style.display = "none";
      formInput.classList.remove("wrong");
    }, 2000);
  } else if (this.tel.value.length !== 16) {
    this.tel.classList.add("wrong");
    sucsess.style.display = "block";
    sucsess.innerHTML = "Напишите правильно Телефон";
    setTimeout(() => {
      this.tel.classList.remove("wrong");
      sucsess.style.display = "none";
    }, 2000);
  } else {
    axios
      .post(URI_API, {
        chat_id: ChatID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        this.name.value = "";
        this.tel.value = "";
        this.text.value = "";
        sucsess.style.display = "block";
        sucsess.innerHTML = "Спасибо, я вам перезвоню!";
        setTimeout(function () {
          form.classList.remove("active");
          body.classList.remove("lock");
          mainBtn.style.display = "block";
          sucsess.innerHTML = "";
          sucsess.style.display = "none";
          formContainer.style.display = "none";
        }, 2000);
      });
  }
});

//////////////////////// Маска телефона

let phoneMask = IMask(document.getElementById("form__tel"), {
  mask: "+{7}(000)000-00-00",
});
////////////////

lessonsItem.forEach((item) => {
  item.addEventListener("click", () => {
    let text = item.querySelector(".lessons__item-text");
    let img = item.querySelector(".lessons__item-img");
    item.classList.toggle("width");
    img.classList.toggle("rotate");
    text.classList.toggle("active");
  });
});
///////////////

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

////////////////Навигация меню
const educationID = document.getElementById("educationID");
const coversID = document.getElementById("coversID");
const priceID = document.getElementById("priceID");
const aboutMeID = document.getElementById("aboutMeID");
const subSublink = document.querySelectorAll(".sub__sublink");

const itemlLinkeducationID = document.querySelector(".item__link-educationID");
const itemLinkCoversID = document.querySelector(".item__link-coversID");
const itemLinkPriceID = document.querySelector(".item__link-priceID");
const itemLinkAboutMeID = document.querySelector(".item__link-aboutMeID");
////обо мне
itemLinkAboutMeID.addEventListener("click", function (e) {
  e.preventDefault();
  body.classList.remove("lock");

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: "#aboutMeID", ease: "power4" },
  });
  burger.classList.remove("active");
  list.classList.remove("active");
  mainBtn.style.display = "none";
});
///////мое образование
itemlLinkeducationID.addEventListener("click", function (e) {
  e.preventDefault();
  body.classList.remove("lock");

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: "#educationID", ease: "power4" },
  });
  burger.classList.remove("active");
  list.classList.remove("active");
  mainBtn.style.display = "none";
});
//////////видео
itemLinkCoversID.addEventListener("click", function (e) {
  e.preventDefault();
  body.classList.remove("lock");

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: "#coversID", ease: "power4" },
  });
  burger.classList.remove("active");
  list.classList.remove("active");
  mainBtn.style.display = "none";
});
///////цены
itemLinkPriceID.addEventListener("click", function (e) {
  e.preventDefault();
  body.classList.remove("lock");

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: "#priceID", ease: "power4" },
  });
  burger.classList.remove("active");
  list.classList.remove("active");
  mainBtn.style.display = "none";
});
subSublink.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    body.classList.remove("lock");

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#priceID" },
    });
    burger.classList.remove("active");
    list.classList.remove("active");
    mainBtn.style.display = "none";
  });
});
/////цены на моб
if (window.innerWidth < 830) {
  const btnLessonsInMob = document.querySelector(".item__link-priceID2");
  btnLessonsInMob.addEventListener("click", function (e) {
    e.preventDefault();
    body.classList.remove("lock");

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#lessonsID", ease: "power4" },
    });
    burger.classList.remove("active");
    list.classList.remove("active");
    mainBtn.style.display = "none";
  });
}