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

    $(".cancel").on("click", (e) => {
        e.preventDefault();
        checkLocalStorage()
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
        $("#footerAddTodo").hide();
    })

    $("#link-addTodo").on("click", (e) => {
        e.preventDefault();
        $("#navbar").show();
        $("#page-login").hide();
        $("#page-add-todo").show();
        $("#page-todos").hide();
        $("#footerAddTodo").hide();
    })

})


function onSignIn(googleUser) {
    $.ajax({
        method: "POST",
        url: baseURL + '/loginGoogle',
        data: {
            token: googleUser.getAuthResponse().id_token
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
            Swal.fire(
                'Login Success!',
                'success'
            )
            checkLocalStorage();
        })
        .fail((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email or password is wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
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
            Swal.fire(
                'Register Success!',
                'success, Lets login!!'
            )
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
            const userEmail = response.user
            $("#welcome").html(`Welcome <span><h3>${userEmail}</h3></span>`)
            const todos = response.todos
            let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            todos.forEach((todo) => {
                if (todo.status === true) {
                    todo.status = 'Finished'
                } else {
                    todo.status = 'Unfinished'
                }
                let date = new Date(todo.due_date)
                $("#tbl-todos").append(
                    `
                <tr>
                    <td onclick="getEditTodo(${todo.id})">${todo.status}</td>
                    <td onclick="getEditTodo(${todo.id})">${todo.title}</td>
                    <td onclick="getEditTodo(${todo.id})" class="descriptiontodo">${todo.description}</td>
                    <td onclick="getEditTodo(${todo.id})">${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}</td>
                    <td>
                    <button class="btn btn-primary" onclick="completeTodo(${todo.id})">Complete</button> &nbsp; &nbsp;
                    <img onclick="deleteTodo(${todo.id})" src="./img/trash.png" alt="" width="20px" height="25" >
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
            Swal.fire({
                icon: 'error',
                title: 'Something is wrong',
                text: `${err.responseJSON.message}`
            })
            console.log(err.responseJSON.message);
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
            $("#footerAddTodo").hide();
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
            Swal.fire({
                icon: 'error',
                title: 'Something is wrong',
                text: `${err.responseJSON.message}`
            })
            console.log(err.responseJSON.message);
        })
}

function deleteTodo(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: baseURL + '/todos/' + id,
                method: 'DELETE',
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .done(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your todo has been deleted.',
                        'success'
                    )
                    fetchTodos()
                })
                .fail(err => {
                    console.log(err);
                })
        }
    })
}

function logout() {
    localStorage.removeItem("access_token");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
    })
    Swal.fire(
        `You've logged out`,
        'logout success'
    )
    checkLocalStorage();
}

function checkLocalStorage() {
    if (localStorage.access_token) {
        $("#page-login").hide();
        $("#page-add-todo").hide();
        $("#page-todos").show();
        $("#page-edit-todo").hide();
        $("#page-register").hide();
        $("#footerAddTodo").show();
        fetchTodos();
    } else {
        $("#page-login").show();
        $("#page-add-todo").hide();
        $("#page-todos").hide();
        $("#page-edit-todo").hide();
        $("#page-register").hide();
        $("#footerAddTodo").hide();
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
            Swal.fire('Saved!', 'Todo Completed!', 'success')
            fetchTodos()
        })
        .fail((err) => {
            console.log(err);
        })

}


