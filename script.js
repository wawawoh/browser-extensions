async function reqData() {
  try {
    const res = await fetch("./data.json");

    if (!res.ok) {
      throw new Error("http erorr");
    }
    const data = await res.json();
    console.log(data);
    main(data);
  } catch (err) {
    console.log("failute", err);
  }
}
reqData();
container = document.querySelector(".card-container");
moonAndSun = document.querySelectorAll(".searcher");

function main(jsonData) {
  createCard(jsonData);
  const options = document.querySelectorAll(".light-mode");

  cardList = container.querySelectorAll(".card");
  toggleButton();
  filterStatus();
  removeCard();
  colorMode(options);
}

// SEPERATE THE FUCNTIONS
// U CAN SAY ELEMENT INSTEAD OF JSON INDEX
// ADD FILTERNG

function toggleButton() {
  cardList.forEach((card) => {
    const checkbox = card.querySelector("input");
    checkbox.addEventListener("change", () => {
      card.dataset.status = checkbox.checked ? "true" : "false";
      console.log(`Card status: ${card.dataset.status}`);
    });
  });
}

function colorMode(options) {
  moonAndSun.forEach((element) => {
    element.addEventListener("click", () => {
      options.forEach((element) => {
        element.classList.toggle("light-mode");
        element.classList.toggle("dark-mode");
      });
      moonAndSun.forEach((thisOne) => {
        thisOne.style.display = "block";
      });
      element.style.display = "none";
    });
  });
}

function removeCard() {
  //for each card search button
  //if button clicked remove card
  cardList.forEach((card) => {
    const removeButton = card.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
      card.remove();
    });
  });
}

function filterStatus() {
  navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      navButtons.forEach((element) => {
        element.classList.remove("active");
      });
      e.target.classList.add("active");
      filter = button.textContent;

      cardList.forEach((card) => {
        let status = card.dataset.status;
        switch (filter) {
          case "All":
            card.style.display = "flex";
            break;
          case "Active":
            card.style.display = status === "true" ? "flex" : "none";
            break;
          case "Inactive":
            card.style.display = status === "false" ? "flex" : "none";
            break;
        }
      });
    });
  });
  //add event lsitenrers to buttons
  //switch statement
  //if all show entire array
  // if no show data set false
  // if yes show fata set true FILTER
}

function createCard(jsonData) {
  jsonData.forEach((element, index) => {
    console.log(jsonData[index].name);
    card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("light-mode");
    card.dataset.status = "false";
    card.innerHTML = `  <div class="description">

        <div class="description-image">

          <img src="${jsonData[index].logo}">

        </div>

        <div class="description-content">
          <h2>${jsonData[index].name}</h2>
          <p> ${jsonData[index].description}</p>

        </div>
        

      </div>
      <div class="toggle-buttons">
        <button class="remove-button light-mode">REMOVE</button>

        <label class="switch" data-toggle = "active">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>

      </div>`;
    container.appendChild(card);
  });
}
