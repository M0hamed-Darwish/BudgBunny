particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00f2fe" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#00f2fe", "opacity": 0.3, "width": 1 },
        "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 1 } }
        }
    }
});

const todoForm = document.getElementById("todo-form");
const inputArea = document.getElementById("input-area");
const taskList = document.getElementById("task-list");
const numbers = document.getElementById("numbers");
const progressBar = document.getElementById("progress-bar");
const emptyImg = document.getElementById("empty-img");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    
    numbers.innerText = `${completed} / ${total}`;
    const percentage = total === 0 ? 0 : (completed / total) * 100;
    progressBar.style.width = percentage + "%";

    // الاحتفال 
    if (total > 0 && completed === total) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00f2fe', '#ffffff'] });
    }
}
//تحديث الواجه
function renderTasks() {
    taskList.innerHTML = "";
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task);
        const li = document.createElement("li");
        if (task.completed) li.classList.add("checked");

        li.innerHTML = `
            <div style="display:flex; align-items:center;">
                <div class="check-circle"></div>
                <span>${task.text}</span>
            </div>
            <div class="actions">
                <i class="fa-solid fa-pen-to-square edit-btn"></i>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        `;

        li.querySelector(".check-circle").addEventListener("click", () => {
            tasks[originalIndex].completed = !tasks[originalIndex].completed;
            saveAndRender();
        });

        li.querySelector(".edit-btn").addEventListener("click", () => {
            const newVal = prompt("Edit Task:", task.text);
            if (newVal !== null && newVal.trim() !== "") {
                tasks[originalIndex].text = newVal.trim();
                saveAndRender();
            }
        });

        li.querySelector(".delete-btn").addEventListener("click", () => {
            tasks.splice(originalIndex, 1);
            saveAndRender();
        });

        taskList.appendChild(li);
    });

    emptyImg.style.display = filteredTasks.length === 0 ? "block" : "none";
    updateStats();
}

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderTasks();
    });
});

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = inputArea.value.trim();
    if (val) {
        tasks.push({ text: val, completed: false });
        inputArea.value = "";
        saveAndRender();
    }
});

renderTasks();