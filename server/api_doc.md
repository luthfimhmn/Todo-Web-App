# Todo App Server
Todo App is an application to manage your todo list. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## Restful endpoints
## Get all Todos
> GET /todos

_Request Header_
```
{
    "acces_token" : "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "title": "Makan malam",
        "description": "Makan pizza di pinggir jalan",
        "status": true,
        "due_date": "2021-03-03",
        "createdAt": "2021-03-01T12:18:09.649Z",
        "updatedAt": "2021-03-01T12:38:59.360Z"
    },
    {
        "id": 2,
        "title": "Makan malam dirumah",
        "description": "Makan nasi goreng",
        "status": false,
        "due_date": "2021-04-02",
        "createdAt": "2021-03-02T04:34:23.371Z",
        "updatedAt": "2021-03-02T04:34:23.371Z"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```


## Create Todo
> POST /todos

_Request Header_
```
{
    "acces_token" : "<your access token>"
}
```

_Request Body_
```
{
    "title" : "<your todo title>",
    "description": "<your desc of your todo>"
    "due_date" : "<due date of your todo>"
}
```

_Response (201 - Created)_
```
{
    "id": 3,
    "title": "Ngoding",
    "description": "Ngoding Autentifikasi",
    "due_date": "2021-04-02",
    "updatedAt": "2021-03-02T04:47:09.594Z",
    "createdAt": "2021-03-02T04:47:09.594Z",
    "status": false
}
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```

## Edit Todo
> PUT /todos/:id


_Request Header_
```
{
    "acces_token" : "<your access token>"
}
```

_Request Body_
```
{
    "title" : "<your todo title>",
    "description": "<your desc of your todo>",
    "due_date" : "<your todo due date>",
    "status" : <true or false status>
}
```

_Response (200)_
```
{
    "id": 2,
    "title": "Ngoding",
    "description": "Ngoding Bareng Malem",
    "status": false,
    "due_date": "2021-03-03",
    "createdAt": "2021-03-02T04:34:23.371Z",
    "updatedAt": "2021-03-02T04:58:01.619Z"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```

## Update Todo Status To Complete
> PATCH /todos/:id


_Request Header_
```
{
    "acces_token" : "<your access token>"
}
```

_Request params_
```
id
```

_Response (200)_
```
{
    "id": 1,
    "title": "Makan Malam",
    "description": "Makan malam di rumah",
    "updatedAt": "2021-03-01T09:11:42.253Z",
    "createdAt": "2021-03-01T09:11:42.253Z",
    "completeStatus": true
}
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```

## Delete Todo
> DELETE /todos/:id 


_Request Header_
```
{
    "acces_token" : "<your access token>"
}
```

_Request params_
```
id
```

_Response (200)_
```
{
    "msg": "Delete Success"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```
