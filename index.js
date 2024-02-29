const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const imgAll = document.querySelectorAll("img");
const cardAll = document.querySelectorAll(".col-md-4");
const btnHide = document.querySelectorAll(".btn-danger");
const allText = document.querySelectorAll(".text-id");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.onsubmit = function (e) {
  e.preventDefault();
  call(input.value);
};

console.log(allText);

btn1.onclick = function () {
  call("liguria");
};
btn2.onclick = function () {
  call("toscano");
};

function call(nome) {
  fetch(`https://api.pexels.com/v1/search?query=[${nome}]`, {
    method: "GET",
    headers: {
      Authorization: "A6HFkBEGNJXaLFL26I4o4aMj1s558AX09slicg3LuXquoD2eIoDKZR9N",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE NEL REPERIMENTO DATI");
      }
    })
    .then((oggetti) => {
      imgAll.forEach((img, index) => {
        img.setAttribute("src", oggetti.photos[index].src.tiny);
      });
      allText.forEach((id, index) => {
        id.textContent = oggetti.photos[index].id;
      });

      //   console.log(oggetti.photos);
    })
    .catch((error) => console.log(error));
}

// funzione che elimina le card
btnHide.forEach((btnhide, index) => {
  btnhide.onclick = () => {
    cardAll[index].remove();
  };
});
