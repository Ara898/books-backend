const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = new FormData(form);
  fetch("http://localhost:3000/books", {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkZlZGVyaWNvIFRlcnJhemFzIiwiZW1haWwiOiJlbGZlZGVAdGVycmF6YXMuY29tIiwiaWF0IjoxNzAxMTk0NzExLCJleHAiOjMzMjM3MTk0NzExfQ.J8JL_l1Ft0Q2ppnliJtwO2xiU-yDGQPAMxobRDgA3C4'
    },
    body: newBook
  }).then(res => res.json()).then(res => console.log(res)).catch(err => console.error(err));
});

fetch("http://localhost:3000/books").then(res => res.json())
  .then(books => {
    const html = books.map(b => {
      return `
      <article data-id="${b.id}">
        
          <img src="${b.poster}" loading="lazy">
          <h3>${b.title}</h2>
          <p>${b.year}</p>
          <p>${b.director}</p>              
                   
          <button>Eliminar</button>              
      </article>
          `;
    }).join('');
    document.querySelector("main").innerHTML = html;
    document.addEventListener("click", e => {
      if (e.target.matches("button")) {
        const article = e.target.closest("article");
        const id = article.dataset.id;
        fetch(`http://localhost:3000/book/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkZlZGVyaWNvIFRlcnJhemFzIiwiZW1haWwiOiJlbGZlZGVAdGVycmF6YXMuY29tIiwiaWF0IjoxNzAxMTk0NzExLCJleHAiOjMzMjM3MTk0NzExfQ.J8JL_l1Ft0Q2ppnliJtwO2xiU-yDGQPAMxobRDgA3C4'
          },
        })
          .then(res => {
            if (res.ok) {
              article.remove();
            }
          });
      }
    });
  })

