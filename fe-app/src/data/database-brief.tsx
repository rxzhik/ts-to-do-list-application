export type Task = {
    id: number,
    title: string,
    content: string,
    status: boolean
}

export type User = {
    id: string,
    username: string,
    email: string,
    password: string
}

export const tasks: Task[] = [
    {
        id: 1,
        title: "cooking breakfast",
        content: "Cook Panner for breakfast",
        status: true
    },
    {
        id: 2,
        title: "cooking dinner",
        content: "Cook Panner for breakfast",
        status: true
    },
    {
        id: 3,
        title: "get grocery",
        content: "Cook Panner for breakfast",
        status: false
    },
    {
        id: 4,
        title: "clean house",
        content: "Cook Panner for breakfast",
        status: true
    },
    {
        id: 5,
        title: "learn coding",
        content: "Cook Panner for breakfast",
        status: true
    },
    {
        id: 6,
        title: "meet abraham",
        content: "Cook Panner for breakfast",
        status: false
    }
]

export const users: User[] = [
    {   
        id: "U1",
        username: "Rashik",
        email: "pommyraj@gmail.com",
        password: "1Rashik@#"
    },
    {   
        id: "U2",
        username: "Kawish",
        email: "rajkawish@gmail.com",
        password: "1Kawish@#"
    }

]