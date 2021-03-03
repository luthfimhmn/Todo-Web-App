const baseURL = 'http://localhost:3000'
$("document").ready(function () {
    checkLocalStorage()

    $("#btn-login").on("click", (e) => {
        e.preventDefault();
        login()
    })

    $("#btn-logout").on("click", () => {
        logout()
    })

    $("#btn-addTodo").on("click", (e) => {
        e.preventDefault();
        addTodo()
    })

    $("#link-addTodo").on("click", (e) => {
        e.preventDefault();
        $("#page-login").hide();
        $("#page-add-todo").show();
        $("#page-todos").hide();
    })
})


function checkToken() {
    if (localStorage.getItem.access_token) {
        $("#page-login").hide()
        $("#page-todos").show()
    }
}

function login() {
    const email = $("#email").val();
    const password = $("#password").val();

    $.ajax({
        url: baseURL + "/login",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            localStorage.setItem("access_token", response.access_token)
            checkLocalStorage();
        })
        .fail((err) => {
            console.log(err);
        })
        .always(() => {
            $("#email").val("")
            $("#password").val("")
        })
}

function register(params) {

}

function fetchTodos() {
    $("#tbl-todos").empty();
    $.ajax({
        url: baseURL + '/todos',
        method: "GET",
        headers: {
            access_token: localStorage.access_token,
        }
    })
        .done((response) => {
            const todos = response.todos
            todos.forEach((todo, i) => {
                $("#tbl-todos").append(
                    `
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${todo.title}</td>
                        <td>${todo.description}</td>
                        <td>${todo.due_date}</td>
                        <td>
                            <button class="btn btn-primary" onclick="deleteTodo(${todo.id})">Delete</button>
                            <button class="btn btn-primary">Edit</button>
                        </td>
                    </tr>
                    `
                )
            });
        })
        .fail((err) => {
            console.log(err);
        })

}

function addTodo() {
    const title = $("#todo-title").val();
    const description = $("#todo-desc").val();
    const due_date = $("#todo-due_date").val();
    $.ajax({
        url: baseURL + '/todos',
        method: 'POST',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(() => {
            fetchTodos()
            checkLocalStorage()
        })
        .fail((err) => {
            console.log(err);
        })
        .always(() => {
            $("#todo-title").val("");
            $("#todo-desc").val("");
            $("#todo-due_date").val("");
        })
}

function editTodo(params) {

}

function deleteTodo(id) {
    $.ajax({
        url: baseURL + '/todos/' + id,
        method: 'DELETE',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(() => {
            fetchTodos()
        })
        .fail(err => {
            console.log(err);
        })
}

function logout(params) {
    localStorage.removeItem("access_token");
    checkLocalStorage();
}

function checkLocalStorage() {
    if (localStorage.access_token) {
        $("#page-login").hide();
        $("#page-add-todo").hide();
        $("#page-todos").show();
        fetchTodos();
    } else {
        $("#page-login").show();
        $("#page-add-todo").hide();
        $("#page-todos").hide();
    }
}