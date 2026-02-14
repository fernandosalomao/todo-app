document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const list = document.getElementById("todo-list");

  function createTodoItem(text) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
            <span class="todo-text">${text}</span>
            <button class="delete-btn">Delete</button>
        `;
    const textSpan = li.querySelector('.todo-text');
    textSpan.addEventListener('click', function () {
      textSpan.classList.toggle('completed');
    });
    li.querySelector(".delete-btn").addEventListener("click", function () {
      list.removeChild(li);
    });
    return li;
  }

  addBtn.addEventListener("click", function () {
    const value = input.value.trim();
    if (value) {
      const todoItem = createTodoItem(value);
      list.appendChild(todoItem);
      input.value = "";
      input.focus();
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });
});
