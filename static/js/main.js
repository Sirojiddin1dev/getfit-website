// Elementlarni olish
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
        id: '16f102b7690440beb5b030b8f9df2aaf',
        name: 'Video 1',
        otp: '20160313versASE323nFtynCqN5DALtZRpAVC5Da0fFP7GkZwLXuifHgron36UGq',
        playbackInfo: 'eyJ2aWRlb0lkIjoiZmY3NDY1ZGZjZDViNGFhN2ExNmQzZWNkMzgxZGViY2QifQ=='
      },
      {
        id: 2,
        name: 'Video 2',
        otp: '20160313versASE323RkHxY8onuA2ClI3JxY8yemRktRBhzFthNPDpVLvZnaN0ie',
        playbackInfo: 'eyJ2aWRlb0lkIjoiZmY3NDY1ZGZjZDViNGFhN2ExNmQzZWNkMzgxZGViY2QifQ=='
      },
      {
        id: '16f102b7690440beb5b030b8f9df2aaf',
        name: 'Video 3',
        otp: '20160313versASE323PkbeVN4jcAUUFHtQXyINGkW5igLMc4NjhTRrsHKqlF914O',
        playbackInfo: 'eyJ2aWRlb0lkIjoiMTZmMTAyYjc2OTA0NDBiZWI1YjAzMGI4ZjlkZjJhYWYifQ=='
      },
    ],
  },
  {
    id: 2,
    name: 'Qanot mashqlari va Biceps',
    videos: [
      {
        id: 4,
        name: 'Video 4',
        otp: 'otp_example_4',
        playbackInfo: 'playbackInfo_example_4'
      },
      {
        id: 5,
        name: 'Video 5',
        otp: 'otp_example_5',
        playbackInfo: 'playbackInfo_example_5'
      },
      {
        id: 6,
        name: 'Video 6',
        otp: 'otp_example_6',
        playbackInfo: 'playbackInfo_example_6'
      },
    ],
  },
  {
    id: 3,
    name: 'Qanot mashqlari',
    videos: [
      {
        id: 7,
        name: 'Video 7',
        otp: 'otp_example_7',
        playbackInfo: 'playbackInfo_example_7'
      },
      {
        id: 8,
        name: 'Video 8',
        otp: 'otp_example_8',
        playbackInfo: 'playbackInfo_example_8'
      },
      {
        id: 9,
        name: 'Video 9',
        otp: 'otp_example_9',
        playbackInfo: 'playbackInfo_example_9'
      },
    ],
  },
  {
    id: 4,
    name: 'Yelka mashqlari',
    videos: [
      {
        id: 10,
        name: 'Video 10',
        otp: 'otp_example_10',
        playbackInfo: 'playbackInfo_example_10'
      },
      {
        id: 11,
        name: 'Video 11',
        otp: 'otp_example_11',
        playbackInfo: 'playbackInfo_example_11'
      },
      {
        id: 12,
        name: 'Video 12',
        otp: 'otp_example_12',
        playbackInfo: 'playbackInfo_example_12'
      },
    ],
  },
  {
    id: 5,
    name: 'Oyoq mashqlari',
    videos: [
      {
        id: 13,
        name: 'Video 13',
        otp: 'otp_example_13',
        playbackInfo: 'playbackInfo_example_13'
      },
      {
        id: 14,
        name: 'Video 14',
        otp: 'otp_example_14',
        playbackInfo: 'playbackInfo_example_14'
      },
      {
        id: 15,
        name: 'Video 15',
        otp: 'otp_example_15',
        playbackInfo: 'playbackInfo_example_15'
      },
    ],
  },
  {
    id: 6,
    name: 'Uy sharoitida mashqlar (Erkaklar uchun)',
    videos: [
      {
        id: 16,
        name: 'Video 16',
        otp: 'otp_example_16',
        playbackInfo: 'playbackInfo_example_16'
      },
      {
        id: 17,
        name: 'Video 17',
        otp: 'otp_example_17',
        playbackInfo: 'playbackInfo_example_17'
      },
      {
        id: 18,
        name: 'Video 18',
        otp: 'otp_example_18',
        playbackInfo: 'playbackInfo_example_18'
      },
    ],
  },
  {
    id: 7,
    name: 'Uy sharoitida mashqlar (Ayollar uchun)',
    videos: [
      {
        id: 19,
        name: 'Video 19',
        otp: 'otp_example_19',
        playbackInfo: 'playbackInfo_example_19'
      },
      {
        id: 20,
        name: 'Video 20',
        otp: 'otp_example_20',
        playbackInfo: 'playbackInfo_example_20'
      },
      {
        id: 21,
        name: 'Video 21',
        otp: 'otp_example_21',
        playbackInfo: 'playbackInfo_example_21'
      },
    ],
  },
  {
    id: 8,
    name: 'Kardio va jismoniy mashqlar',
    videos: [
      {
        id: 22,
        name: 'Video 22',
        otp: 'otp_example_22',
        playbackInfo: 'playbackInfo_example_22'
      },
      {
        id: 23,
        name: 'Video 23',
        otp: 'otp_example_23',
        playbackInfo: 'playbackInfo_example_23'
      },
      {
        id: 24,
        name: 'Video 24',
        otp: 'otp_example_24',
        playbackInfo: 'playbackInfo_example_24'
      },
    ],
  },
  {
    id: 9,
    name: 'Press mashqlari',
    videos: [
      {
        id: 26,
        name: 'Video 26',
        otp: 'otp_example_26',
        playbackInfo: 'playbackInfo_example_26'
      },
      {
        id: 27,
        name: 'Video 27',
        otp: 'otp_example_27',
        playbackInfo: 'playbackInfo_example_27'
      },
      {
        id: 28,
        name: 'Video 28',
        otp: 'otp_example_28',
        playbackInfo: 'playbackInfo_example_28'
      },
    ],
  },
  {
    id: 10,
    name: "Dieta va to'g'ri ovqatlanish: Erkeklar va Ayollar uchun",
    videos: [
      {
        id: 29,
        name: 'Video 29',
        otp: 'otp_example_29',
        playbackInfo: 'playbackInfo_example_29'
      },
      {
        id: 30,
        name: 'Video 30',
        otp: 'otp_example_30',
        playbackInfo: 'playbackInfo_example_30'
      },
      {
        id: 31,
        name: 'Video 31',
        otp: 'otp_example_31',
        playbackInfo: 'playbackInfo_example_31'
      },
    ],
  },
  {
    id: 11,
    name: "Sport qo'shimchalari",
    videos: [
      {
        id: 32,
        name: 'Video 32',
        otp: 'otp_example_32',
        playbackInfo: 'playbackInfo_example_32'
      },
      {
        id: 33,
        name: 'Video 33',
        otp: 'otp_example_33',
        playbackInfo: 'playbackInfo_example_33'
      },
      {
        id: 34,
        name: 'Video 34',
        otp: 'otp_example_34',
        playbackInfo: 'playbackInfo_example_34'
      },
    ],
  },
  {
    id: 12,
    name: 'Farmakalogiya (Ximiya)',
    videos: [
      {
        id: 35,
        name: 'Video 35',
        otp: 'otp_example_35',
        playbackInfo: 'playbackInfo_example_35'
      },
      {
        id: 36,
        name: 'Video 36',
        otp: 'otp_example_36',
        playbackInfo: 'playbackInfo_example_36'
      },
      {
        id: 37,
        name: 'Video 37',
        otp: 'otp_example_37',
        playbackInfo: 'playbackInfo_example_37'
      },
    ],
  }
];


// DROPDOWN RENDERING

dropDownData.map(
  (item) =>
    (elDropDownMain.innerHTML += `
  <details id=${item.id}>
    <summary>${item.name}</summary>
    ${item.videos
      .map(
        (video) =>
          `<button class='dropdown__categories' data-otp='${video.otp}' data-playbackInfo='${video.playbackInfo}'>${video.name}</button>`
      )
      .join('')}
  </details>
`)
);

// Video ko'rsatish
elDropDownMain.addEventListener('click', (evt) => {
  if (evt.target.matches('.dropdown__categories')) {
    elDropDownParent.classList.remove('open');  // Menuni yopish

    const otp = evt.target.getAttribute('data-otp');  // OTP olish
    const playbackInfo = evt.target.getAttribute('data-playbackInfo');  // PlaybackInfo olish

    // Vdocipher videosini yuklash
    elVideoSection.innerHTML = `
<iframe src="https://player.vdocipher.com/v2/?otp=20160313versASE323PkbeVN4jcAUUFHtQXyINGkW5igLMc4NjhTRrsHKqlF914O&playbackInfo=eyJ2aWRlb0lkIjoiMTZmMTAyYjc2OTA0NDBiZWI1YjAzMGI4ZjlkZjJhYWYifQ==" style="border:0;height:360px;width:640px;max-width:100%" allowFullScreen="true" allow="encrypted-media"></iframe>    `;
  }
});

// MENU RESPONSIVE

elOpenMenuBtn.addEventListener('click', () => {
  elDropDownParent.classList.add('open');
});

elCloseMenuBtn.addEventListener('click', () => {
  elDropDownParent.classList.remove('open');
});
