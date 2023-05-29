import "./styles.css";

const btn = document.getElementById("btn");
const nameInput = document.getElementById("myid");
const ngayInput = document.getElementById("ngay");
const thangInput = document.getElementById("thang");
const namInput = document.getElementById("nam");
const resultEle = document.getElementById("result");

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
        <p>${data[0].mode}: ${data[i].mode}</p>
        <p>${data[0].timeFrom}: ${data[i].timeFrom}</p>
        <p>${data[0].timeTo}: ${data[i].timeTo}</p>
        <p>${data[0].note}: ${data[i].note}</p>
        <p>${data[0].numberOfDays}: ${data[i].numberOfDays}</p>
        <p class="${
          data[i].result === 1 ? "done" : data[i].result === -1 ? "fal" : "wait"
        }">${data[0].management1}: ${data[i].management1}</p>
        <p class="${
          data[i].result === 1 ? "done" : data[i].result === -1 ? "fal" : "wait"
        }"> ${data[i].status1}</p>
        <p class="${
          data[i].result === 1 ? "done" : data[i].result === -1 ? "fal" : "wait"
        }">${data[0].management2}: ${data[i].management2}</p>
        <p class="${
          data[i].result === 1 ? "done" : data[i].result === -1 ? "fal" : "wait"
        }"> ${data[i].status2}</p>
    </div>
    <br>
    <hr />
    `;
  }
  console.log(innerHtml);
  resultEle.innerHTML = innerHtml;
}

const search = (e) => {
  e.preventDefault();
  var name = nameInput.value;
  var date = new Date(+namInput.value, +thangInput.value, +ngayInput.value);
  var idate = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const URL =
    "https://script.google.com/macros/s/AKfycbz2NqrJI1NbV_kuG0qxbevVYKvMFp39LCj_RHjSxh43c88cjPKZ7bi0XQeFOQPSeyyF/exec";
  let submitData = {
    type: "check",
    data: {
      name,
      idate
    }
  };
  console.log(submitData);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // p data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      render(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra, hãy thử lại");
    });
};

btn.addEventListener("click", search);
