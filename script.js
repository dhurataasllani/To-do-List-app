const allList = document.querySelector(".main_lists");
const selectEl = document.querySelector(".form__input--type-importance");
const inputDescription = document.querySelector(".form__input--description");
const inputDate = document.querySelector(".form__input--date");
const inputCompletion = document.querySelector(".form__input--type-completion");

const btnEl = document.querySelector(".btn__submit");
const formEl = document.querySelector(".form");
const secondSection = document.getElementById("second-section");
const btnCompleted = document.querySelector(".btn__completed");
const list = document.querySelectorAll(".list");
const deleteBtn = document.querySelector(".btn__delete");

class SubmitTask {
  constructor() {
    this._setNewTask = this._setNewTask.bind(this);
    this._enterSubmit = this._enterSubmit.bind(this);
    this._sortCompleted = this._sortCompleted.bind(this);

    btnEl.addEventListener("click", this._setNewTask);
    inputCompletion.addEventListener("keydown", this._enterSubmit);
    btnCompleted.addEventListener("click", this._sortCompleted);
    deleteBtn.addEventListener("click", this._deleteCancelled.bind(this));
  }
  _hideInputData() {
    selectEl.value =
      inputDescription.value =
      inputDate.value =
      inputCompletion.value =
        "";
  }
  _setNewTask(e) {
    if (e) {
      e.preventDefault();
    }
    const description = inputDescription.value;
    const date = inputDate.value;
    const completion = inputCompletion.value;
    const importance = selectEl.value;

    if (!description || !date || !completion || !importance) {
      return alert("fill all the fields with valid inputs");
    }

    const html = `
    <li class="list">
          <h2 class="task__title">
             🆕 ${description}
          </h2>
          <div class="list__details">
            <span class="list__icon">${
              completion === "completed"
                ? "✔️"
                : completion === "in-progress"
                ? "🔃"
                : "✖️"
            } </span>
            <span class="list__value">${date}</span>
          </div>
          <div class="list__details">
            <span class="list__icon"></span>
            <span class="list__value"> ${
              importance === "very-important" ? "🔔" : "🔕"
            } ${importance}</span>
          </div>
         
          <div class="list__details">
            <span class="list__icon"></span>
            <span class="${
              completion === "completed"
                ? "completed"
                : completion === "in-progress"
                ? "in-progress"
                : "cancelled"
            }">${
      completion === "completed"
        ? "completed"
        : completion === "in-progress"
        ? "in-progress"
        : "cancelled"
    }</span>
          </div>
        </li>
    `;

    allList.insertAdjacentHTML("beforeend", html);
    this._hideInputData();
  }
  _sortCompleted(e) {
    e.preventDefault();
    const list = document.querySelectorAll(".list");
    list.forEach((item) => {
      const completedItem = item.querySelector(".completed");
      console.log(completedItem);
      if (completedItem) {
        secondSection.appendChild(item);
      }
    });
  }
  _enterSubmit(e) {
    if (e.key === "Enter") {
      this._setNewTask(e);
    }
  }
  _deleteCancelled(e) {
    e.preventDefault();
    const list = document.querySelectorAll(".list");
    list.forEach((item) => {
      const cancelledItem = item.querySelector(".cancelled");
      console.log(cancelledItem);
      if (cancelledItem) {
        item.remove();
      }
    });
  }
}
const newTask = new SubmitTask();
console.log(newTask);
