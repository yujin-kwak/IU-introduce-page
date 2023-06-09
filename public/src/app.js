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
        `<div class="info_group">
          <dt>${dt}</dt>
          <dd>${dd}</dd>
        </div>`
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
        `<section class="album_box">
          <section class="album_image_box">
            <div class="album_image">
              <img src="${img}" alt="${alt}">
            </div>
            <div class="album_image_hover">
            </div>
          </section>
          <section class="album_content">
            <div class="album_explain">
              <strong>${strong}</strong>
              <dl class="info">
                <div class="info_group">
                  <dt>${dt_one}</dt>
                  <dd>${dd_one}</dd>
                </div>
                <div class="info_group">
                  <dt>${dt_two}</dt>
                  <dd>${dd_two}</dd>
                </div>
                <div class="info_group">
                  <dt>${dt_three}</dt>
                  <dd>${dd_three}</dd>
                </div>
              </dl>
            </div>
          </section>
        </section>`
    )
    .join('');
  album_data.innerHTML = album_data_list;

  const drama_data_list = content.drama_text
    .map(
      ({ h3, span, p }) =>
        `<div class="drama_explain">
          <h3>${h3}<span class="role">${span}</span></h3>
          <p>${p}</p>
        </div>`
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
