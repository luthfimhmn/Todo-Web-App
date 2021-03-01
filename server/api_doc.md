# Todo App Server
Todo App is an application to manage your todo list. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## Restful endpoints
## Get all Todos
> Get all Todos

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
{
    "id": 1,
    "title": "Makan Siang",
    "description": "Makan siang di rumah",
    "updatedAt": "2021-03-01T09:11:42.253Z",
    "createdAt": "2021-03-01T09:11:42.253Z",
    "completeStatus": false
}
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```


## Create Todo
> Create Todo

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
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "title": "Makan Siang",
    "description": "Makan siang di rumah",
    "updatedAt": "2021-03-01T09:11:42.253Z",
    "createdAt": "2021-03-01T09:11:42.253Z",
    "completeStatus": false
}
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```

## Edit Todo
> Edit Todo


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
    "completeStatus" : <true or false status>
}
```

_Response (200)_
```
{
    "id": 1,
    "title": "Makan Malam",
    "description": "Makan malam di rumah",
    "updatedAt": "2021-03-01T09:11:42.253Z",
    "createdAt": "2021-03-01T09:11:42.253Z",
    "completeStatus": false
}
```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```

## Update Todo Status To Complete
> Update Todo Status To Complete


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
> Delete Todo 


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

```

_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error" 
}
```
