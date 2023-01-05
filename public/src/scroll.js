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
