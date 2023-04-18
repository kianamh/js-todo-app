const noDataSection = document.getElementById("no-data-section");
const submitButton = document.getElementById("add-new-btn");
const cancelButton = document.getElementById("cancel-btn");
const itemsList = document.getElementById("list");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const titleInputError = document.getElementById("title-error");
const modal = document.querySelector(".modal-wrapper");
const openModalBtn = document.getElementById("open-modal-button");
const addNewTaskIcon = document.querySelector(".add-new-task-icon");
const taskItems = document.querySelectorAll(".task-item");

function handleResetForm() {
  titleInput.value = "";
  categoryInput.value = "";
  titleInputError.innerHTML = "";
  titleInput.classList.remove("hass-error");
}

function handleCloseModal() {
  modal.classList.remove("visible-modal");
}

titleInput.addEventListener("change", function () {
  if (!titleInput.value) {
    titleInputError.innerHTML = "Required field!";
    titleInput.classList.add("hass-error");
  } else {
    titleInputError.innerHTML = "";
    titleInput.classList.remove("hass-error");
  }
});

let itemsCount = 0;

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const titleValue = titleInput.value;
  const categoryValue = categoryInput.value;

  const category = categoryValue ? categoryValue : "Uncategorized";

  if (!titleValue) {
    titleInputError.innerHTML = "Required field!";
    titleInput.classList.add("hass-error");
    return;
  }

  itemsCount++;

  noDataSection.classList.remove("visible");
  addNewTaskIcon.classList.add("visible");
  itemsList.classList.add("visible");

  itemsList.append(
    document.createRange().createContextualFragment(
      `<div class="task-item" id="item-${itemsCount}">
            <div class="task-item-title">${titleValue}</div>
            <div class="task-item-right-section">
                <img id="item-${itemsCount}-remove-btn" class="remove-btn" src="assets/icons/trash-icon.svg" />
               <div>${category}</div>
            </div>
        </div>`
    )
  );

  const removeBtn = document.getElementById(`item-${itemsCount}-remove-btn`);

  const currItem = document.getElementById(`item-${itemsCount}`);

  removeBtn.addEventListener("click", function () {
    currItem.remove();
    itemsCount--;

    if (itemsCount === 0) {
      noDataSection.classList.add("visible");
      addNewTaskIcon.classList.remove("visible");
      itemsList.classList.remove("visible");
    }
  });

  handleResetForm();
  handleCloseModal();
});

openModalBtn.addEventListener("click", function () {
  modal.classList.add("visible-modal");
});

addNewTaskIcon.addEventListener("click", function () {
  modal.classList.add("visible-modal");
});

cancelButton.addEventListener("click", function (event) {
  event.preventDefault();
  handleResetForm();
  handleCloseModal();
});
