/************네비게이션 기능************/
const nav_a = document.querySelectorAll('header a');
for (let i = 0; i < nav_a.length; i++) {
  nav_a[i].onclick = function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      behavior: 'smooth',
      top: target.offsetTop,
    });
  };
}

/************그래픽 차트 기능************/
const ctx = document.getElementById('UAENA_Chart');

const data = {
  labels: ['1기', '2기', '3기', '4기', '5기'],
  datasets: [
    {
      barPercentage: 0.6,
      base: 0,
      label: '기수별 인원',
      data: [10557, 18600, 30500, 50301, 45200],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      hoverBackgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ],
      borderRadius: 8,
      borderWidth: 2,
    },
  ],
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: false,
  },
};

new Chart(ctx, config);

/************클릭 이미지 슬라이더 기능************/
document.querySelector('.right_arrow').onclick = function () {
  let current_slide = document.querySelector(
    '.main_drama .drama_poster.active'
  );
  let next_slide = current_slide.nextElementSibling;
  if (next_slide === null) {
    next_slide = current_slide.parentElement.firstElementChild;
  }
  current_slide.animate(
    {
      opacity: [1, 0],
    },
    {
      duration: 1500,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );

  current_slide.classList.remove('active');
  next_slide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 1500,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );

  next_slide.classList.add('active');
};

document.querySelector('.left_arrow').onclick = function () {
  let current_slide = document.querySelector(
    '.main_drama .drama_poster.active'
  );
  let previous_slide = current_slide.previousElementSibling;
  if (previous_slide === null) {
    previous_slide = current_slide.parentElement.lastElementChild;
  }
  current_slide.animate(
    {
      opacity: [1, 0],
    },
    {
      duration: 1500,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );

  current_slide.classList.remove('active');
  previous_slide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 1500,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );

  previous_slide.classList.add('active');
};

/************ 반복 UI 처리 ************/
const profile_data = document.querySelector('#profile_data');
const album_data = document.querySelector('#album_list_info');
const drama_data = document.querySelector('#drama_data');
const career_data = document.querySelector('#career_data > ul');
const award_data = document.querySelector('#award_data > ul');

(async () => {
  const res = await fetch('data.json');
  const content = await res.json();

  const profile_data_list = content.profile_text
    .map(
      ({ dt, dd }) =>
        `<div class="info_group"><dt>${dt}</dt><dd>${dd}</dd></div>`
    )
    .join('');
  profile_data.innerHTML = profile_data_list;

  //const album_data_list_dl = content.album_content_dl.map(([{dt, dd}]) => `<div class='info_group'><dt>${dt}</dt><dd>${dd}</dd></div>`).join('');
  const album_data_list = content.album_content
    .map(
      ({
        img,
        strong,
        alt,
        dt_one,
        dd_one,
        dt_two,
        dd_two,
        dt_three,
        dd_three,
      }) =>
        `<section class="album_box"><section class="album_image_box"><div class="album_image"><img src="${img}" alt="${alt}"></div><div class="album_image_hover"></div></section><section class="album_content"><div class="album_explain"><strong>${strong}</strong><dl class="info"><div class="info_group"><dt>${dt_one}</dt><dd>${dd_one}</dd></div><div class="info_group"><dt>${dt_two}</dt><dd>${dd_two}</dd></div><div class="info_group"><dt>${dt_three}</dt><dd>${dd_three}</dd></div></dl></div></section></section>`
    )
    .join('');
  album_data.innerHTML = album_data_list;

  const drama_data_list = content.drama_text
    .map(
      ({ h3, span, p }) =>
        `<div class="drama_explain"><h3>${h3}<span class="role">${span}</span></h3><p>${p}</p></div>`
    )
    .join('');
  drama_data.innerHTML = drama_data_list;

  const career_data_list = content.career_text
    .map(
      ({ span, li }) => `<li><span class="info_date">${span}</span>${li}</li>`
    )
    .join('');
  career_data.innerHTML = career_data_list;

  const award_data_list = content.award_text
    .map(
      ({ span, li }) => `<li><span class="info_date">${span}</span>${li}</li>`
    )
    .join('');
  award_data.innerHTML = award_data_list;
})();

/************ 맨 위로 가는 버튼 구현 ************/
const top_button = document.querySelector('.top_button');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) top_button.classList.add('active');
  else top_button.classList.remove('active');
});

top_button.addEventListener('click', () => {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});
