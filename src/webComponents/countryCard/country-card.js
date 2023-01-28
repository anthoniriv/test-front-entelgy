class CountryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.openModal);
  }

  openModal() {
    // create the modal element and add it to the shadow root
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Datos interesantes</h2>
        <p>Nombre: ${name}</p>
        <p>Capital: ${capital}</p>
        <p>Población: ${poblacion}</p>
      </div>
      </div>
    `;
    this.shadowRoot.appendChild(modal);
  }
  
  render() {
    const name = this.getAttribute("name");
    const url = this.getAttribute("url");
    const capital = this.getAttribute("capital");
    const poblacion = this.getAttribute("poblacion");
    this.shadowRoot.innerHTML = `
      <style>
      .card {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 300px;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #FFF;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #ccc;
        transition: all 0.3s ease-in-out;
      }
      
      .card-header {
        width: 100%;
        padding: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .card-flag{
        width: 200px;
        height: 200px;
      }
      
      .card-title {
        margin: 0;
        padding-top: 5px;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
      }
      
      .card-body {
        width: 100%;
        padding: 10px;
        text-align: center;
      }
      
      .card-text {
        margin: 0;
        font-size: 1.2rem;
      }

      .card:hover {
        border: 1px solid #007bff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
      }
      </style>
      <head>
      <link rel="stylesheet" type="text/css" href="../countryCard/country-card.css" />
      </head>
      <div class="card">
        <div class="card-header">
          <img class="card-flag" src=${url}></img>
          <a id="modal-link" class="card-title">${name}</a>
        </div>
        <div class="card-body">
          <p class="card-text">Capital: ${capital}</p>
          <p class="card-text">Poblacion: ${poblacion}</p>
        </div>
      </div>
      <div id="modal" class="modal" style="display: none;">
        <div class="modal-content">
          <span id="close-modal" class="close-modal">&times;</span>
          <p>Información adicional sobre el país</p>
        </div>
      </div>
      <script>
        const modalLink = this.shadowRoot.querySelector("#modal-link");
        const modal = this.shadowRoot.querySelector("#modal");
        const closeModal = this.shadowRoot.querySelector("#close-modal");
        modalLink.addEventListener("click", () => {
          modal.style.display = "block";
        });
        closeModal.addEventListener("click", () => {
          modal.style.display = "none";
        });
      </script>
    `;
  }
}

customElements.define("country-card", CountryCard);
