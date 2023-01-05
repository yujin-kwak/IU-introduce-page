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
