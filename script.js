const formInput = document.querySelector(".form-input");
const formSubmit = document.querySelector(".submit-btn");
const itemList = document.querySelector(".item-list");
const removeBtn = document.querySelector(".remove-item");

formSubmit.addEventListener("click", addItem);
removeBtn.addEventListener("click", removeItem);

function addItem(e) {
  const value = formInput.value;
  const li = document.createElement("li");
  const removeBtn = document.createElement("button");
  e.preventDefault();

  if (formInput.value === "") {
    alert("Please input Item");
  } else {
    li.innerText = value;
    li.classList.add("items");
    removeBtn.classList.add("remove-item");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    li.appendChild(removeBtn);
    itemList.appendChild(li);
    formInput.value = "";
  }
}

function removeItem(e) {
  console.log(e.target.parentElement);
}
