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

function DisplayInfo() {
    let statement = '';
    userArray.forEach((user, index) => {
        statement += ` <tr>
            <th scope="row">${index + 1}</th>
            <td>${user.name}</td>
            <td><i class='btn bx bxs-edit-alt  fs-4' onclick='EditInfo(${index})'></i>
            <i class='btn bx bx-trash-alt fs-4' onclick='DeleteInfo(${index})'></i></td>
        </tr>`
    });
    displaytask.innerHTML = statement;
}

function EditInfo(id) {
    edit = id;
    taskUser.value = userArray[id].name;
    addUser.innerText = "Changes";
}

function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);

}