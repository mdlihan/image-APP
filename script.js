let search = document.querySelector("#search");
let more_button = document.querySelector("#more_button");
let grid = document.querySelector("#grid");
const footer_button = document.querySelector('#footer_button');
// api calling start
let center_p = document.querySelector('#center_p');
let pages = 1;
const key = "Vb-7bLrJ6lonZcpBwxRiuEvsLvlyWi1NsqiIEeIEhPM";

  


function apiData() {
let para = search.value;
  if (para) {
    center_p.style='display:none'
  }
const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${para}&client_id=${key}`;
  
axios(url)
.then((res)=>{
  let results =  res.data.results;
  let html = ''; 
  results.forEach((el)=>{
    html += `<div>
            <div
              class="max-sm:w-full max-sm:h-50 m-auto p-2 border-2 rounded-sm shadow-sm bg-slate-50"
            >
              <img
                class="m-auto rounded-sm max-sm:w-full max-sm:h-full h-48"
                src="${el.urls.small}"
                alt="no_image"
              />
              
              <div>
                <p class="text-sm text-start p-2 font-medium">
                  ${el.alt_description}
                </p>
              </div>
              
            </div>
        
          </div>`
  })
  grid.innerHTML += html;
  document.querySelector('#footer_button').style='display: flex'
 pages++
}).catch((err)=>{
  console.log(err)
})
}

more_button.addEventListener('click',()=>{
  apiData()
})
// search time start
let typingTimer;
search.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  let data = e.target.value;
  typingTimer = setTimeout(() => {
    pages=1;
    grid.innerHTML=''
    apiData();
  }, 2000);
});
// search time end
