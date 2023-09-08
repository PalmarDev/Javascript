document.addEventListener("DOMContentLoaded", () => {
  const dataContainer = document.getElementById("root");
  const url = "https://digimon-api.vercel.app/api/digimon";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const dataList = data;
        const content = dataList
          .map((item) => {
            return `
                <div class="flex flex-col align-center justify-center ">
                  <h1 class="text-center lg:text-2xl text-bold text-slate-100 min-[200px]:text-6xl max-[776px]:text-6xl">${item.name}</h1>
                  <img class="rounded-full" src="${item.img}" alt="${item.name}">
                  <p class="lg:text-xl text-center text-slate-100 min-[200px]:text-4xl max-[776px]:text-4xl">${item.level}</p>
                </div>`;
          })
          .join("");
        dataContainer.innerHTML = content;
      } else {
        console.error("No se encontraron resultados en los datos de la API.");
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos", error);
    });
});
