document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const list = document.getElementById("todo-list");
  const themeToggle = document.getElementById("theme-toggle");

  // Dark mode toggle
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

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
      li.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => {
        list.removeChild(li);
      }, 300);
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
