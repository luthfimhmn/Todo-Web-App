const baseURL = 'http://localhost:3000'
$("document").ready(function () {
    checkLocalStorage()

    $("#btn-login").on("click", (e) => {
        e.preventDefault();
        login();
    })

    $("#btn-logout").on("click", () => {
        logout();
    })

    $("#btn-addTodo").on("click", (e) => {
        e.preventDefault();
        addTodo();
    })

    $("#btn-editTodo").on("click", (e) => {
        e.preventDefault();
        postEdit()
    })

    $("#btn-register").on("click", (e) => {
        e.preventDefault();
        register();
    })

    $("#link-register").on("click", (e) => {
        e.preventDefault();
        $("#page-login").hide();
        $("#page-add-todo").hide();
        $("#page-todos").hide();
        $("#page-register").show();
    })

    $("#link-addTodo").on("click", (e) => {
        e.preventDefault();
        $("#navbar").show();
        $("#page-login").hide();
        $("#page-add-todo").show();
        $("#page-todos").hide();
    })

    $("#link-todos").on("click", (e) => {
        e.preventDefault();
        checkLocalStorage();
    })

})


// function onSignIn(googleUser) {
//     $.ajax({
//         method: "POST",
//         url: baseURL + '/loginGoogle',
//         data: {
//             token: googleUser.getAuthResponse().id_token
//         },
//         headers: {
//             access_token: localStorage.access_token
//         }
//     })
//         .done((response) => {
//             localStorage.setItem("access_token", response.access_token)
//             checkLocalStorage();
//         })
//         .fail((err) => {
//             console.log(err);
//         })
//         .always(() => {
//             $("#email").val("")
//             $("#password").val("")
//         })
// }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log("User signed out.");
//     })
// }


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

function register() {
    const email = $("#email-regis").val();
    const password = $("#password-regis").val();

    $.ajax({
        url: baseURL + "/register",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            console.log(response);
            checkLocalStorage();
        })
        .fail((err) => {
            console.log(err);
        })
}

function fetchTodos() {
    $("#tbl-todos").empty();
    $.ajax({
        url: baseURL + '/todos',
        method: "GET",
        headers: {
            access_token: localStorage.access_token
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
                        <td>${todo.status}</td>
                        <td>
                            <button class="btn btn-primary" onclick="deleteTodo(${todo.id})">Delete</button>
                            <button class="btn btn-primary" onclick="getEditTodo(${todo.id})">Edit</button>
                            <button class="btn btn-primary" onclick="completeTodo(${todo.id})">Complete</button>
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

function getEditTodo(id) {
    $.ajax({
        url: baseURL + '/todos/' + id,
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done((response) => {
            let todo = response
            localStorage.setItem("idTodo", `${todo.id}`)
            $("#page-login").hide();
            $("#page-add-todo").hide();
            $("#page-todos").hide();
            $("#page-edit-todo").show();
            $("#title-edit").val(`${todo.title}`)
            $("#desc-edit").val(`${todo.description}`)
            $("#due_date-edit").val(`${todo.due_date}`)
        })
        .fail(err => {
            console.log(err);
        })
}

function postEdit() {
    const title = $("#title-edit").val();
    const description = $("#desc-edit").val();
    const due_date = $("#due_date-edit").val();
    const id = localStorage.idTodo
    $.ajax({
        url: baseURL + '/todos/' + id,
        method: 'PUT',
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
            localStorage.removeItem("idTodo");
            checkLocalStorage();
        })
        .fail((err) => {
            console.log(err);
        })
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

function logout() {
    localStorage.removeItem("access_token");
    checkLocalStorage();
}

function checkLocalStorage() {
    if (localStorage.access_token) {
        $("#page-login").hide();
        $("#page-add-todo").hide();
        $("#page-todos").show();
        $("#page-edit-todo").hide();
        $("#page-register").hide();
        fetchTodos();
    } else {
        $("#page-login").show();
        $("#page-add-todo").hide();
        $("#page-todos").hide();
        $("#page-edit-todo").hide();
        $("#page-register").hide();
    }
}

function completeTodo(id) {
    $.ajax({
        url: baseURL + '/todos/' + id,
        method: 'PATCH',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            status: true
        }
    })
        .done((response) => {
            fetchTodos()
        })
        .fail((err) => {
            console.log(err);
        })

}