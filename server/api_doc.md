# Todo App Server
Todo App is an application to manage your todo list. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;



## Restful endpoints

### Create User


- ***URL***

  ```
  /register
  ```

- ***Method***

  ```
  POST
  ```

- ***Request Header***
    ```
    not needed
    ```

- ***_Request Body_***
    ```
    {
        "email": "<your email account>", //string
        "password": "<your password>" //string
    }
    ```

- ***_Response (201)_***
    ```
    {
        "success": true,
        "message": "user created",
        "user": {
            "id": 1,
            "email": "luthfi@mail.com"
        }
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Illegal arguments: undefined, string"
    }
    ```

### Login User

- ***URL***

  ```
  /login
  ```

- ***Method***

  ```
  POST
  ```

- ***_Request Header_***
    ```
    not needed
    ```

- ***_Request Body_***
    ```
    {
        "email": "<your email account>", //string
        "password": "<your password>" //string
    }
    ```

- ***_Response (200)_***
    ```
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiZGFzZUBtYWlsLmNvbSIsImlhdCI6MTYxNTEwNjUwOH0.HmwZFgn7S8L3viB8d15JMY07nM3-47UVNJEv9xFv1M8"
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Invalid email or password"
    }
    ```

### POST Google Login

logs user into the system with Google account

- ***URL***

  ```
  /loginGoogle
  ```

- ***Method***

  ```
  POST
  ```

- ***Request Header***

  ```javascript
  not needed
  ```
  
- ***Request Body***

  ```javascript
  {
   	 token: googleUser.getAuthResponse().id_token
  }
  ```
  
- ***Success Response (200 - OK)***

  ```javascript
  {
      "access_token": "<your access token>"
  }
  ```
  
- **Error Response**

  *Response (500 - Internal Server Error)*

  ```javascript
  {
  	"message": "Internal Server Error"
  }
  ```

## Get all Todos
> GET /todos


- ***URL***

  ```
  /todos
  ```

- ***Method***

  ```
  GET
  ```

- ***_Request Header_***
    ```
    {
        "acces_token" : "<your access token>"
    }
    ```

- ***_Request Body_***
    ```
    not needed
    ```

- ***_Response (200)_***
    ```
    {
        "todos": [
            {
                "id": 1,
                "title": "Ngoding",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type hehehe",
                "status": true,
                "due_date": "2021-03-31",
                "createdAt": "2021-03-07T08:02:26.989Z",
                "updatedAt": "2021-03-07T08:18:02.029Z",
                "UserId": 2
            },
            {
                "id": 2,
                "title": "Ngoding",
                "description": "Testing",
                "status": true,
                "due_date": "2021-03-08",
                "createdAt": "2021-03-07T08:02:14.709Z",
                "updatedAt": "2021-03-07T08:11:56.304Z",
                "UserId": 2
            }
        ],
        "user": "luthfi@mail.com"
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Unauthorized" 
    }
    ```

## Find One Todo
GET /todos/:id
- ***URL***

  ```
  /todos/:id
  ```

- ***Method***

  ```
  GET
  ```

- ***_Request Header_***
    ```
    {
        "acces_token" : "<your access token>"
    }
    ```

- ***_URL Params_***
    ```
    "id" : "<todo id>"
    ```

- ***_Request Body_***
    ```
    not needed
    ```

- ***_Response (200)_***
    ```
    {
        "id": 1,
        "title": "Ngoding",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type hehehe",
        "status": true,
        "due_date": "2021-03-31",
        "createdAt": "2021-03-07T08:02:26.989Z",
        "updatedAt": "2021-03-07T08:18:02.029Z",
        "UserId": 2
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Not Found" 
    }
    ```

## Create Todo
> POST /todos

- ***_Request Header_***
    ```
    {
        "acces_token" : "<your access token>"
    }
    ```

- ***_Request Body_***
    ```
    {
        "title" : "<your todo title>", // string
        "description": "<your desc of your todo>" //string
        "due_date" : "<due date of your todo>" //date
    }
    ```

- ***_Response (201 - Created)_***
    ```
    {
        "id": 3,
        "title": "Ngoding Todo lagi",
        "description": "Selesaikan error handling",
        "due_date": "2021-03-10",
        "UserId": 2,
        "updatedAt": "2021-03-07T08:48:05.951Z",
        "createdAt": "2021-03-07T08:48:05.951Z",
        "status": false
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Internal Server Error" 
    }
    ```

## Edit Todo
> PUT /todos/:id

- ***URL***

  ```
  /todos/:id
  ```

- ***Method***

  ```
  PUT
  ```

- ***_Request Header_***
    ```
    {
        "acces_token" : "<your access token>"
    }
    ```

- ***_Request Body_***
    ```
    {
        "title" : "<your todo title>", //string
        "description": "<your desc of your todo>", //string
        "due_date" : "<your todo due date>", //date
        "status" : <true or false status> // boolean
    }
    ```

- ***_Response (200)_***
    ```
    {
        "id": 3,
        "title": "Ngoding",
        "description": "Semangat",
        "status": false,
        "due_date": "2021-03-20",
        "createdAt": "2021-03-07T08:48:05.951Z",
        "updatedAt": "2021-03-07T08:49:07.342Z",
        "UserId": 2
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Internal Server Error" 
    }
    ```

## Update Todo Status To Complete
> PATCH /todos/:id
- ***URL***

  ```
  /todos/:id
  ```

- ***Method***

  ```
  PATCH
  ```

- ***_Request Header_***
    ```
    {
        "acces_token" : "<your access token>"
    }
    ```

- ***_Request params_***
    ```
    id
    ```

- ***_Request body_***
    ```
    {
        "status":"<true or false status>"
    }
    ```

- ***_Response (200)_***
    ```
    {
        "id": 4,
        "title": "Ngoding",
        "description": "Semangat",
        "status": true,
        "due_date": "2021-03-20",
        "createdAt": "2021-03-07T08:48:05.951Z",
        "updatedAt": "2021-03-07T08:52:10.856Z",
        "UserId": 2
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Internal Server Error" 
    }
    ```

## Delete Todo
> DELETE /todos/:id 
- ***URL***

  ```
  /todos/:id
  ```

- ***Method***

  ```
  DELETE
  ```

- ***_Request Header_***
    ```
    {
        "acces_token" : "<your access token>"
    }
    ```

- ***_URL Params_***
    ```
    "id" : "<todo id>"
    ```


- ***_Response (200)_***
    ```
    {
        "msg": "Delete Success"
    }
    ```

- ***_Response (500 - Internal Server Error)_***
    ```
    {
        "message" : "Internal Server Error" 
    }
    ```
