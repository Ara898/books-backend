const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = new FormData(form);
  fetch("http://localhost:3000/books", {
    method: 'POST',
    headers: {
      
    },
    body: newBook
  }).then(res => res.json()).then(res => console.log(res)).catch(err => console.error(err));
});

