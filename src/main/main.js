//VARS
let countries = [];
let country;

//FUNCION PRINCIPAL
function main() {
  obtenerPaises();
}

//FUNCION PRINCIPAL PARA OBTENER SOLO 12 PAISES
async function obtenerPaises() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/region/ame");
    const data = await response.json();
    while (countries.length < 12) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!countries.includes(data[randomIndex])) {
        countries.push({
          name: data[randomIndex].name.common,
          flag: data[randomIndex].flags.png,
          capital: data[randomIndex].capital[0],
          population: data[randomIndex].population,
        });
      }
    }
    renderWebComponent(countries);
    return countries;
  } catch (error) {
    console.log(error);
  }
}

function renderWebComponent(data) {
  const container = document.getElementById("web-component-container");
  data.forEach((item) => {
    console.log('Pais', item)
    const webComponent = document.createElement("country-card");
    webComponent.setAttribute("name", item.name);
    webComponent.setAttribute("url", item.flag);    
    webComponent.setAttribute("capital", item.capital);
    webComponent.setAttribute("poblacion", item.population);
    container.appendChild(webComponent);
  });
}

window.addEventListener("load", main);
