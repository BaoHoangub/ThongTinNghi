const btn = document.getElementById("btn");
const nameInput = document.getElementById("myid");
const dateInput = document.getElementById("mydate");
const resultEle = document.getElementById("result");
const modal = document.querySelector(".modal");

function render(data) {
  var innerHtml = "";
  for (var i = 1; i < data.length; i++) {
    innerHtml += `
    <div class="render">
        <h2 class ="${
          data[i].result === 1 ? "done" : data[i].result === -1 ? "fal" : "wait"
        }"> ${
      data[i].result === 1
        ? "ĐƯỢC DUYỆT"
        : data[i].result === -1
        ? "KHÔNG ĐƯỢC DUYỆT"
        : "ĐANG CHỜ"
    } </h2>
        <p>${data[0].id}: ${data[i].id}</p>
        <p>${data[0].name}: ${data[i].checkID}</p>
        <p>${data[0].dateFrom}: ${data[i].dateFrom}</p>
        <p>${data[0].dateTo}: ${data[i].dateTo}</p>
        <p>${data[0].numberOfDays}: ${data[i].numberOfDays}</p>
        <p>${data[0].mode}: ${data[i].mode}</p>
        <p>${data[0].timeFrom}: ${data[i].timeFrom}</p>
        <p>${data[0].timeTo}: ${data[i].timeTo}</p>
        <p>${data[0].note}: ${data[i].note}</p>
        <p class="${
          data[i].status1 == "Duyệt"
            ? "done"
            : data[i].status1 == "Không"
            ? "fal"
            : "wait"
        }">${data[0].management1}: ${data[i].management1} _${
      data[i].status1
    }</p>
        <p class="${
          data[i].status2 == "Duyệt"
            ? "done"
            : data[i].status2 == "Không"
            ? "fal"
            : "wait"
        }">${data[0].management2}: ${data[i].management2} _${
      data[i].status2
    }</p>
    </div>
    <br>
    <hr />
    `;
  }
  resultEle.innerHTML = innerHtml;
}

const search = (e) => {
  e.preventDefault();
  var name = nameInput.value;
  var date = dateInput.value; // new Date(+namInput.value, +thangInput.value, +ngayInput.value);
  var idate = parseInt(date.split("-").join(""));
  const URL =
    "https://script.google.com/macros/s/AKfycbz7Aq3Ktm4xrnuXyuI-_3h12_8SbeiK2m9QVUeSolqc8tbiJ9kjjz5YXL-IcjO_Cv4E/exec";
  let submitData = {
    type: "check",
    data: {
      name,
      idate,
    },
  };
  modal.classList.add("display");
  console.log(submitData);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(submitData), // p data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      modal.classList.remove("display");
      render(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      modal.classList.remove("display");
      alert("không có kết quả nào, hãy kiểm tra thông tin tra cứu và thử lại");
    });
};

btn.addEventListener("click", search);
