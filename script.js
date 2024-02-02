const formInput = document.querySelector(".form-input");
const itemList = document.querySelector(".item-list");
const itemForm = document.querySelector("#item-form");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector("#clear");
const filter = document.querySelector(".filter");
const filterInput = document.querySelector(".form-input-filter");
let isEditMode = false;

//Event-Listeners
itemForm.addEventListener("submit", addItemList);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
filterInput.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", showItems);

//Functions
function addItemList(e) {
  const value = formInput.value;

  e.preventDefault();

  if (isEditMode) {
    const itemEdit = itemList.querySelector(".edit-mode");
    removeStorageItem(itemEdit.textContent);
    itemEdit.classList.remove("edit-mode");
    itemEdit.remove();
    isEditMode = false;
  } else if (checkDup(value)) {
    alert("Duplicate Item!");
    return;
  }

  if (formInput.value === "") {
    alert("Please input Item");
  } else {
    addItemDom(value);
  }

  hideCheck();
  addStorage(value);
}

function checkDup(item) {
  const storageItems = getStorage();
  return storageItems.includes(item);
}

function addItemDom(item) {
  const li = document.createElement("li");
  const removeBtn = document.createElement("button");
  li.innerText = item;
  li.classList.add("items");
  removeBtn.classList.add("remove-item");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  li.appendChild(removeBtn);
  itemList.appendChild(li);
  formInput.value = "";
}

function onClickItem(e) {
  if (e.target.classList.contains("remove-item")) {
    removeItem(e.target);
  } else if (e.target.classList.contains("items")) {
    editItem(e.target);
  }
}

function editItem(item) {
  isEditMode = true;
  const items = itemList.querySelectorAll("li");
  items.forEach((i) => {
    i.classList.remove("edit-mode");
  });

  item.classList.add("edit-mode");
  submitBtn.innerHTML = `<i class='fa-solid fa-pen'></i> Edit Item`;
  submitBtn.style.backgroundColor = "#228b22";
  formInput.value = item.innerText;
}

function removeItem(item) {
  item.parentElement.remove();
  removeStorageItem(item.parentElement.innerText);
  hideCheck();
}

function removeStorageItem(item) {
  let storageItems = getStorage();
  storageItems = storageItems.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(storageItems));
}

function clearItems(e) {
  itemList.innerHTML = "";
  localStorage.removeItem("items");
  hideCheck();
}

function hideCheck() {
  const itemNumber = itemList.querySelectorAll("li").length;
  if (itemNumber === 0) {
    filter.classList.add("hidden");
    clearBtn.classList.add("hidden");
  } else {
    filter.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
  }

  submitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  submitBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

function filterItems(e) {
  const input = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const itemName = item.innerText.toLowerCase();
    if (itemName.indexOf(input) != -1) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

function addStorage(item) {
  const storageItem = getStorage();

  storageItem.push(item);

  localStorage.setItem("items", JSON.stringify(storageItem));
}

function getStorage() {
  let storageItem;
  if (localStorage.getItem("items") === null) {
    storageItem = [];
  } else {
    storageItem = JSON.parse(localStorage.getItem("items"));
  }
  return storageItem;
}

function showItems() {
  const storageItem = getStorage();
  storageItem.forEach((item) => addItemDom(item));
  filterInput.value = "";
  hideCheck();
}

//On Startup
hideCheck();
