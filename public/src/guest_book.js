let db;
async function start_db() {
  const dbReq = await indexedDB.open('guest_book', 1);

  dbReq.addEventListener('success', function (event) {
    db = event.target.result; //event.target: dbReq
    read_db();
  });
  dbReq.addEventListener('error', function (event) {
    const error = event.target.error;
    console.log('error', error.name);
  });
  dbReq.addEventListener('upgradeneeded', function (event) {
    db = event.target.result;
    let oldVersion = event.oldVersion;
    if (oldVersion < 1) {
      db.createObjectStore('topics', { keyPath: 'id', autoIncrement: true });
    }
  });
}

start_db();

function read_db() {
  let guest_book_list = [];
  const store = db.transaction(['topics'], 'readwrite').objectStore('topics');

  store.openCursor().onsuccess = function (event) {
    //openCursor로 cursor를 요청, 요청 성공 -> onsucess함수 실행
    const cursor = event.target.result;
    if (cursor) {
      guest_book_list.push(cursor.value);
      cursor.continue();
    } else {
      const guest_book_list_box = document.getElementById(
        'guest_book_list_box'
      );
      let guest_book_all_list = guest_book_list.reduce((acc, cur) => {
        acc = `${acc}
        <div class="guest_text">
          <p>${cur.message}</p>
          <input id="delete_btn" type="button" value="삭제" onclick="delete_db(${cur.id})"/>
        </div>`;
        return acc;
      }, '');
      guest_book_list_box.innerHTML = guest_book_all_list;
    }
  };
}

function create_db() {
  let pw = document.getElementById('input_password');
  let message = document.getElementById('input_text');
  let store = db.transaction('topics', 'readwrite').objectStore('topics'); // store "topics"에 readwrite가능한 transaction을 생성, 그 transaction을 이용해 .objectStore로 topics에 접근
  let addReq = store.add({
    password: pw.value,
    message: message.value,
  });

  pw.value = '';
  message.value = '';
  read_db();
}

function delete_db(id) {
  let store = db.transaction('topics', 'readwrite').objectStore('topics');
  let delReq = store.get(id);

  delReq.addEventListener('success', function (event) {
    delReq_result = event.target.result; //event.target: dbReq

    let password_confirm = prompt('글을 삭제하기 위해 비밀번호를 입력하세요');

    if (delReq_result.password == password_confirm) {
      store.delete(id);
      alert('삭제되었습니다!');
    } else {
      alert('비밀번호를 확인해주세요!');
    }
  });

  read_db();
}
