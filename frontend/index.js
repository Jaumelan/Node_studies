const url = "http://localhost:3000/";
const list = document.getElementById("games");
const createButton = document.getElementById("registerButton");
const apiResponses = document.getElementById("answer");
const updateButton = document.getElementById("updateButton");
const updateName = document.getElementById("nameUpd");
const updatePrice = document.getElementById("priceUpd");
const updateYear = document.getElementById("yearUpd");
let updateID;

axios
  .get(url + "games")
  .then((res) => {
    const { data } = res.data;
    //console.log(data)
    data.forEach((game) => {
      const li = document.createElement("li");
      const deleteBtn = document.createElement("button");
      const updateBtn = document.createElement("button");
      li.setAttribute("dataId", game.id);
      li.innerText = `${game.id}: ${game.title} - Price: $${game.price}`;
      deleteBtn.innerText = "Delete";
      updateBtn.innerText = "Update";
      deleteBtn.className = "delBtn";
      updateBtn.className = "updateBtn";
      deleteBtn.addEventListener("click", (event) => {
        const id = event.target.parentNode.getAttribute("dataId");
        axios
          .delete(url + "game/" + id)
          .then((res) => {
            const { data } = res.data;
            apiResponses.innerText = data;
            event.target.parentNode.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      updateBtn.addEventListener("click", (event) => {
        const id = event.target.parentNode.getAttribute("dataId");
        updateID = id;
        axios
          .get(url + "game/" + id)
          .then((res) => {
            const { data } = res.data;
            const { title, price, year } = data;
            updateName.value = title;
            updatePrice.value = price;
            updateYear.value = year;
          })
          .catch((err) => {
            console.log(err);
          });
      });
      li.appendChild(deleteBtn);
      li.appendChild(updateBtn);

      list.appendChild(li);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const createGame = (event) => {
  event.preventDefault();
  const title = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;
  const data = {
    title,
    price,
    year,
  };
  console.log(data);
  axios
    .post(url + "game", data)
    .then((res) => {
      if (res.status == 200) {
        apiResponses.innerText = "Game created successfully";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateGame = (event) => {
  event.preventDefault();
  const title = updateName.value;
  const price = updatePrice.value;
  const year = updateYear.value;
  const data = {
    title,
    price,
    year,
  };

  axios
    .put(url + "game/" + updateID, data)
    .then((res) => {
      if (res.status == 200) {
        apiResponses.innerText = "Game updated successfully";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

createButton.addEventListener("click", createGame);
updateButton.addEventListener("click", updateGame);
