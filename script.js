let search = document.querySelector("#search");
let more_button = document.querySelector("#more_button");
let grid = document.querySelector("#grid");
// api calling start

function apiData(para) {
  const key = "Vb-7bLrJ6lonZcpBwxRiuEvsLvlyWi1NsqiIEeIEhPM";
  let Pages = 1;

  more_button.addEventListener("click", () => {
    Pages += 1;
    para = para;
    pageses(Pages);
  });

  function pageses(pages = 1) {
    let html = "";
    for (let i = 1; i < pages + 1; i++) {
      const url = `https://api.unsplash.com/search/photos?page=${i}&query=${
        para || "car"
      }&client_id=${key}`;
      axios(url)
        .then((res) => {
          let results = res.data.results;
          results.forEach((el) => {
            let imges = el.urls.small;
            let alt_description = el.alt_description;
            html += `
            <div>
              
              <div
                class="max-sm:w-10/12 m-auto p-2 border-2 rounded-sm shadow-sm bg-slate-50"
              >
                <img
                  class="m-auto rounded-sm max-sm:w-full h-44"
                  src="${imges}"
                  alt="no_image"
                />
              
                <div>
                  <p class="text-sm text-start p-2 font-medium">
                    ${alt_description}
                  </p>
                </div>
                
              </div>
             
            </div>
           `;
            grid.innerHTML = html;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  pageses();
}

// search time start
let typingTimer;
search.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  let data = e.target.value;
  typingTimer = setTimeout(() => {
    apiData(data);
  }, 1000);
});
// search time end

apiData();

// api calling end

//If more button is clicked then it goes to car and again goes to para solve this code
