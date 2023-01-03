// const profile_data_dt = ["이름", "출생", "나이", "소속사", "데뷔"]
// const profile_data_dd = [": 이지은, IU", ": 1993.05.16", ": 30세, 만29세",": EDAM 엔터테인먼트",": 2008년 미니 앨범 [Lost and Found]"]

// for( let i=0;i<5;i++){
//     document.write("<div class='info_group'");
//     document.write("<dt>")
//     document.write(profile_data_dt[i])
//     document.write("</dt>")
//     document.write("<dd>")
//     document.write(profile_data_dd[i])
//     document.write("</dd>")
//     document.write("</div>")
// }

const main_profile_data_dt = document.querySelectorAll('.profile_data_dt');
const main_profile_data_dd = document.querySelectorAll('.profile_data_dd');

(async () => {
    const res = await fetch("profile_text.json");
    const profile_data = await res.json()

    for(let i=0;i<5;i++){
        main_profile_data_dt[i].innerHTML = profile_data[i].dt;
        main_profile_data_dd[i].innerHTML = profile_data[i].dd;
    }
})();