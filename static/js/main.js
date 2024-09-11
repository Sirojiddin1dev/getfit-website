const elDropDownParent = document.querySelector('.dropdowns');
const elDropDownMain = document.querySelector('.dropdown__main');
const elVideoSection = document.querySelector('.video__main');
const elVideoBack = document.querySelector('.video__go-back');
const elVideoForward = document.querySelector('.video__go-forward');
const elCloseMenuBtn = document.querySelector('.close-menu');
const elOpenMenuBtn = document.querySelector('.open-menu');

// DropDown data

const dropDownData = [
  {
    id: 1,
    name: "Ko'krak va triceps",
    videos: [
      {
        id: 1,
        name: 'Something',
      },
      {
        id: 2,
        name: 'Something',
      },
      {
        id: 3,
        name: 'Something',
      },
    ],
  },
  {
    id: 2,
    name: 'Qanot mashqlari va Biceps',
    videos: [
      {
        id: 4,
        name: 'Something',
      },
      {
        id: 5,
        name: 'Something',
      },
      {
        id: 6,
        name: 'Something',
      },
    ],
  },
  {
    id: 3,
    name: 'Qanot mashqlari',
    videos: [
      {
        id: 7,
        name: 'Something',
      },
      {
        id: 8,
        name: 'Something',
      },
      {
        id: 9,
        name: 'Something',
      },
    ],
  },
  {
    id: 4,
    name: 'Yelka mashqlari',
    videos: [
      {
        id: 10,
        name: 'Something',
      },
      {
        id: 11,
        name: 'Something',
      },
      {
        id: 12,
        name: 'Something',
      },
    ],
  },
  {
    id: 5,
    name: 'Oyoq mashqlari',
    videos: [
      {
        id: 13,
        name: 'Something',
      },
      {
        id: 14,
        name: 'Something',
      },
      {
        id: 15,
        name: 'Something',
      },
    ],
  },
  {
    id: 6,
    name: 'Uy sharoitida mashqlar (Erkaklar uchun)',
    videos: [
      {
        id: 16,
        name: 'Something',
      },
      {
        id: 17,
        name: 'Something',
      },
      {
        id: 18,
        name: 'Something',
      },
    ],
  },
  {
    id: 7,
    name: 'Uy sharoitida mashqlar (Ayollar uchun)',
    videos: [
      {
        id: 19,
        name: 'Something',
      },
      {
        id: 20,
        name: 'Something',
      },
      {
        id: 21,
        name: 'Something',
      },
    ],
  },
  {
    id: 8,
    name: 'Kardio va jismoniy mashqlar',
    videos: [
      {
        id: 22,
        name: 'Something',
      },
      {
        id: 23,
        name: 'Something',
      },
      {
        id: 24,
        name: 'Something',
      },
    ],
  },
  {
    id: 9,
    name: 'Press mashqlari',
    videos: [
      {
        id: 26,
        name: 'Something',
      },
      {
        id: 27,
        name: 'Something',
      },
      {
        id: 28,
        name: 'Something',
      },
    ],
  },
  {
    id: 10,
    name: "Dieta va to'g'ri ovqatlanish: Erkeklar va Ayollar uchun",
    videos: [
      {
        id: 29,
        name: 'Something',
      },
      {
        id: 30,
        name: 'Something',
      },
      {
        id: 31,
        name: 'Something',
      },
    ],
  },
  {
    id: 11,
    name: "Sport qo'shimchalari",
    videos: [
      {
        id: 32,
        name: 'Something',
      },
      {
        id: 33,
        name: 'Something',
      },
      {
        id: 34,
        name: 'Something',
      },
    ],
  },
  {
    id: 12,
    name: 'Farmakalogiya (Ximiya)',
    videos: [
      {
        id: 35,
        name: 'Something',
      },
      {
        id: 36,
        name: 'Something',
      },
      {
        id: 37,
        name: 'Something',
      },
    ],
  },
];

// RENDER DROPDOWN TO PAGE

dropDownData.map(
  (item) =>
    (elDropDownMain.innerHTML += `
  <details id=${item.id}>
    <summary>${item.name}</summary>
    ${item.videos
      .map(
        (item) =>
          `<button class='dropdown__categories' id=${item.id}>${item.name}</button>`
      )
      .join('')}
  </details>
`)
);

// PUT VIDEO BY UNIQUE ID

let videoId = [];

elDropDownMain.addEventListener('click', (evt) => {
  if (evt.target.matches('.dropdown__categories')) {
    elDropDownParent.classList.forEach((item) => {
      if (item == 'open') {
        elDropDownParent.classList.remove('open');
      }
    });

    videoId.push(evt.target.id);
    // IF YOU WANT TO PUT UNIQUE VIDEO YOU JUST EDIT THIS CODE BELOW:
    // src="./videos/video.mp4"

    elVideoSection.innerHTML = `
      <video controls autoplay>
        <source src="./videos/video.mp4" type="video/mp4" />
      </video>
    `;
  }
});

let previousVideo = null;

elVideoBack.addEventListener('click', (evt) => {
  if (previousVideo == 1) {
    elVideoSection.innerHTML = `
      <p>VIDEO TANLANG...</p>
    `;

    return;
  }

  previousVideo = --videoId.length;

  // IF YOU CAN CHANGE VIDEO, JUST EDIT SOURCE VIDEO: src="./videos/video.mp4"

  elVideoSection.innerHTML = `
      <video controls autoplay>
        <source src="./videos/video.mp4" type="video/mp4" />
      </video>
    `;
});

// OPEN-CLOSE MENU IN RESPONSIVE

elOpenMenuBtn.addEventListener('click', (evt) => {
  elDropDownParent.className += ' open';
});

elCloseMenuBtn.addEventListener('click', (evt) => {
  elDropDownParent.classList.remove('open');
});
