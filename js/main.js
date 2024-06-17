// інпут сьогоднішньої дати
document.getElementById('myDate').valueAsDate = new Date();

//Інпути (дата - верхнє значення - нижнє значення - серцевий ритм) та кнопка створення запису
const inputDate = document.querySelector("#myDate");
const inputUp = document.querySelector("#tyskUp");
const inputDown = document.querySelector("#tyskDown");
const inputHb = document.querySelector("#tyskHb");
const submitBtn = document.querySelector("#submitBtn");

const form = document.querySelector("#form"); // блок форми з усіма інпутами та кнопкою 
const recList = document.querySelector("#recList"); // cписок записів
const emptyList = document.querySelector("#emptyList");


//масив даних (записів) для зберігання в локал сторедж
let records = [];

if (localStorage.getItem("records")) {
    records = JSON.parse(localStorage.getItem("records"));
    records.forEach((record) => renderRecord(record))
}

checkEmptyList()

// додавання/створення запису
form.addEventListener("submit", addRecord);

// видалення запису
recList.addEventListener("click", deleteRecord);

// функції
function addRecord(e) {
    e.preventDefault();

    // переводимо значення інпутів в об’єкт щоб зберегти данні в локал сторедж
    const newRecord = {
        id: Date.now(),
        date: inputDate.value,
        up: inputUp.value,
        down: inputDown.value,
        hb: inputHb.value,
    }
    // пушимо в масив
    records.push(newRecord)

    saveToLocalStorage()

    renderRecord(newRecord)

    // очищуємо інпути 
    inputUp.value = "";
    inputDown.value = "";
    inputHb.value = "";

    checkEmptyList()
}

function deleteRecord(e) {
    //перевіряємо чи натиснули ми кнопку "видалити" і видаляємо запис
    if (e.target.dataset.action === "delete") {
        const parentNode = e.target.closest("li")
        //визначаємо ід запису
        let id = Number(parentNode.id);

        // знаходимо індекс запису в масиві даних
        const index = records.findIndex((record) => record.id === id);

        records.splice(index, 1);

        saveToLocalStorage()

        parentNode.remove();

        checkEmptyList()
    }

}

function checkEmptyList() {
    if (records.length === 0) {
        console.log(records.length);
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
            <img src="./img/tono.svg" alt="Empty" width="64" class="mt-3" />
            <div class="empty-list__title">Записів немає</div>
          </li>`;
        recList.insertAdjacentHTML("afterbegin", emptyListHTML);
    }

    if (records.length > 0) {
        const emptyListEl = document.querySelector("#emptyList");
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem("records", JSON.stringify(records));
}

function renderRecord(record) {

    let recordHTML = `<li id="${record.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${record.date}: ${record.up}/${record.down} ♥${record.hb}</span>
            <div class="task-item__buttons">
              
              <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18" />
              </button>
            </div>
          </li>`;

    // додаємо розмітку запису в список записів
    recList.insertAdjacentHTML("beforeEnd", recordHTML);
}