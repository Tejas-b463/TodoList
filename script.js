// Add Task

const addUser = document.getElementById("addUser");
const btn = addUser.innerText;
const taskUser = document.getElementById("taskUser");
const displaytask = document.getElementById("displaytask")
let edit = null;
let userArray = [];

// get data
let objString = localStorage.getItem('users');
if (objString != null) {
    userArray = JSON.parse(objString);
}
DisplayInfo();
addUser.onclick = () => {
    const name = taskUser.value;
    if (edit != null) {
        userArray.splice(edit, 1, { 'name': name })
        edit = null;
    } else {

        userArray.push({ 'name': name })
    }

    SaveInfo(userArray)
    taskUser.value = "";


    addUser.innerText = btn

}

function SaveInfo(arr) {
    let str = JSON.stringify(arr)
    localStorage.setItem('users', str)
    DisplayInfo()


}
// Display Task
function DisplayInfo() {
    let statement = '';
    userArray.forEach((user, index) => {
        statement += ` <tr>
            <th> <input type="checkbox" class="task-checkbox"> </th>
            <td>${user.name}</td>
            <td><i class='btn bx bxs-edit-alt  fs-4' onclick='EditInfo(${index})'></i>
            <i class='btn bx bx-trash-alt fs-4' onclick='DeleteInfo(${index})'></i></td>
        </tr>`
    });
    displaytask.innerHTML = statement;
}
// Update Task
function EditInfo(id) {
    edit = id;
    taskUser.value = userArray[id].name;
    addUser.innerText = "CHANGE";
}
// Delete Task
function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);
}

// Search
const trAll = document.querySelectorAll("#displaytask tr")
const searchInput = document.getElementById("search")
searchInput.addEventListener('input', function(e) {
    const searchTask = e.target.value.toLowerCase();
    displaytask.innerHTML = '';
    trAll.forEach(tr => {
        const tdIntr = tr.querySelectorAll('td')
        if (tdIntr[0].innerText.toLowerCase().indexOf(searchTask) > -1) {
            displaytask.appendChild(tr);
        }
    })
    if (displaytask.innerHTML == '') {
        displaytask.innerHTML = "No Task found❗"
    }
})

// Check Box
const checkboxes = document.querySelectorAll('.task-checkbox');

checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
        // Store the state on local storage
        localStorage.setItem(`task${index}`, checkbox.checked);
    });

    // checkbox from local storage
    const storedValue = localStorage.getItem(`task${index}`);
    if (storedValue === 'true') {
        checkbox.checked = true;
    }
});