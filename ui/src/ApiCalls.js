const server = "https://localhost:7043/api"

export const RegisterUser = async(userObj) => {
    const result = await fetch(server + "/user", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(userObj)
    })

    var resultJson = await result.json();
    return resultJson;
}

export const LoginUser = async(userObj) => {
    const result = await fetch(server + "/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(userObj)
    })

    var resultJson = await result.json();
    return resultJson;
}

export const GetUserTodos = async(userId) => {
    const result = await fetch(server + "/user/todo/" + userId, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
    })

    var resultJson = await result.json();
    return resultJson;
}

export const CreateTodo = async(todoObject) => {
    console.log(todoObject)
    const result = await fetch(server + "/todo", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(todoObject)
    })

    var resultJson = await result.json();
    console.log(resultJson)
    return resultJson;
}

export const UpdateTodo = async(todoObject) => {
    const result = await fetch(server + "/todo/"+todoObject.todoId, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(todoObject)
    })

    var resultJson = await result.json();
    return resultJson;
}

export const DeleteTodo = async(todoObject) => {
    const result = await fetch(server + "/todo/"+todoObject.todoId, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(todoObject.todoId)
    })

    var resultJson = await result.json();
    return resultJson;
}