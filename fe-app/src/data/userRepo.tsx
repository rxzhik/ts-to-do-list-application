import { format } from 'date-fns'
import {User, users} from './database-brief'

//constants
const USER_LIST: string = "user"
const CURRENT_USER_ID: string ="current_user"

export const initUsers = () => {
    if(localStorage.getItem(USER_LIST) !== null){
        return
    }else{
        localStorage.setItem(USER_LIST, JSON.stringify(users))
    }
}

type AddUserInput = {
    username: string, 
    email: string, 
    password: string
}

export const addUser: (user: AddUserInput) => string | Error = (user) => {
    const response: string | null = localStorage.getItem(USER_LIST);
    let userList: User[] = []
    if(response){
        //parse
        userList = JSON.parse(response)
        //Create User Id
        const userId: string = format(new Date(), 'yyyyMMddmmss');
        const newUser: User = {id: userId, ...user}
        //Add to User List
        userList.push(newUser)
        //set User List
        localStorage.setItem(USER_LIST, JSON.stringify(userList))
        //return User Id
        return userId
    }
    return new Error("Couldn't add the User")
}

export const getCurrentUserId = ()=>{
    const currUserId: string  | null =  localStorage.getItem(CURRENT_USER_ID);
    if(currUserId){
        const currUser: {id: string} = JSON.parse(currUserId)
        return currUser
    };

    return null
}

export const setCurrentUserId = (id: string)=>{
    localStorage.setItem(CURRENT_USER_ID, JSON.stringify({id: id}))
}

export const findUser: (username: string, password: string) => string | Error = (username, password) => {
    const response = localStorage.getItem(USER_LIST);
    let user_id: string | null = null;
    if(response){
        const users: User[] = JSON.parse(response);
        console.log(users)
        users.forEach((user) => {
            if(user.username === username && user.password === password){
                user_id =  user.id
            }
        })
    }
    if(!user_id){
        return new Error("User not Found")
    }else{
        return user_id
    }
}
