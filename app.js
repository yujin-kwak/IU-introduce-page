/************네비게이션 기능************/
const nav_a = document.querySelectorAll('header a');
for(let i = 0; i < nav_a.length; i++) {
  nav_a[i].onclick = function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      'behavior': 'smooth',
      'top': target.offsetTop
    })
  }
}

/************그래픽 차트 기능************/
const ctx = document.getElementById('UAENA_Chart');

const data = {
  labels: ["1기", "2기", "3기", "4기", "5기"],
  datasets: [{
    barPercentage: 0.6,
    base: 0,
    label: '기수별 인원',
    data: [10557, 18600, 30500, 50301, 45200],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)'
    ],
    hoverBackgroundColor:
    ['rgba(255, 99, 132, 0.4)',
      'rgba(255, 159, 64, 0.4)',
      'rgba(255, 205, 86, 0.4)',
      'rgba(75, 192, 192, 0.4)',
      'rgba(54, 162, 235, 0.4)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)'
    ],
    borderRadius : 8,
    borderWidth: 2
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    responsive :false
  }
};

new Chart(ctx, config);

/************클릭 이미지 슬라이더 기능************/
document.querySelector('.right_arrow').onclick = function () {
  let current_slide = document.querySelector('.main_drama .drama_poster.active');
  let next_slide = current_slide.nextElementSibling;
  if( next_slide === null ) {
    next_slide = current_slide.parentElement.firstElementChild;
  }
  current_slide.animate({
    opacity: [1,0]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill:'both'
  });

  current_slide.classList.remove('active');
  next_slide.animate({
    opacity:[0,1]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill: 'both'
  })

  next_slide.classList.add('active');
}

document.querySelector('.left_arrow').onclick = function () {
  let current_slide = document.querySelector('.main_drama .drama_poster.active');
  let previous_slide = current_slide.previousElementSibling;
  if( previous_slide === null ) {
    previous_slide = current_slide.parentElement.lastElementChild;
  }
  current_slide.animate({
    opacity: [1,0]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill:'both'
  });

  current_slide.classList.remove('active');
  previous_slide.animate({
    opacity:[0,1]
  }, {
    duration: 1500,
    easing: 'ease',
    iterations: 1,
    fill: 'both'
  })

  previous_slide.classList.add('active');
}

/************ 프로필 js *********/

// const main_profile_data_dt = document.querySelectorAll('#profile_data_dt');
// const main_profile_data_dd = document.querySelectorAll('#profile_data_dd');

// const profile_data_dt = ["이름", "출생", "나이", "소속사", "데뷔"]
// const profile_data_dd = [": 이지은, IU", ": 1993.05.16", ": 30세, 만29세",": EDAM 엔터테인먼트",": 2008년 미니 앨범 [Lost and Found]"]

// for(let i=0;i<5;i++){
//   main_profile_data_dt[i].innerHTML = profile_data_dt[i];
//   main_profile_data_dd[i].innerHTML = profile_data_dd[i];
// }

