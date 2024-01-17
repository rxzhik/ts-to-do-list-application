import {User} from './database-brief'
import http from '../http-common'
import { AxiosResponse } from 'axios';

//constants
const CURRENT_USER_ID: string ="current_user"


//AddUser Types
type AddUserSuccessResponse = {
    userID: string
}

type AddUserErrorResponse = {
    message: string
}

type AddUserResponse = AddUserSuccessResponse | AddUserErrorResponse

type AddUserParameters = {
    username: string, 
    email: string, 
    password: string
}

export const addUser: (user: AddUserParameters) => Promise<string | Error> = async (user) => {
    // const response: string | null = localStorage.getItem(USER_LIST);
    // let userList: User[] = []
    // if(response){
    //     //parse
    //     userList = JSON.parse(response)
    //     //Create User Id
    //     const userId: string = format(new Date(), 'yyyyMMddmmss');
    //     const newUser: User = {id: userId, ...user}
    //     //Add to User List
    //     userList.push(newUser)
    //     //set User List
    //     localStorage.setItem(USER_LIST, JSON.stringify(userList))
    //     //return User Id
    //     return userId
    // }
    // return new Error("Couldn't add the User")
    try{
        const response: AxiosResponse<AddUserResponse> = await http.post("/users/createUser", user);
        const responseData: AddUserResponse = response.data;

        if ('userID' in responseData) {
            return responseData.userID;
          } else {
            return new Error(responseData.message)
          }
    }catch (error) {
        console.error("Error:", error);
        return new Error("Error in post request.") // or handle the error accordingly
    }
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


type findUserSuccessfulResponse = {
    userID: string
}

type findUserErrorResponse = {
    message: string
}

type findUserResponse = findUserErrorResponse | findUserSuccessfulResponse

export const findUser: (username: string, password: string) => Promise<string | Error> = async (username, password) => {
    // const response = localStorage.getItem(USER_LIST);
    // let user_id: string | null = null;
    // if(response){
    //     const users: User[] = JSON.parse(response);
    //     console.log(users)
    //     users.forEach((user) => {
    //         if(user.username === username && user.password === password){
    //             user_id =  user.id
    //         }
    //     })
    // }

    //We need to encode the special characters in the password before
    //we use it in the URL.
    password = encodeURIComponent(password)
    try{
        const response: AxiosResponse<findUserResponse> = await http.get(`/users/findUser?username=${username}&password=${password}`)
        const responseData = response.data
        if('userID' in responseData){
            return responseData.userID
        }else{
            return new Error(responseData.message)
        }
    }catch(error){
        console.error("Error:", error);
        return new Error("Error in get request.") 
    }
}
