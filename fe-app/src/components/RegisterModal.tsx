import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { addUser, setCurrentUserId } from '../data/userRepo';
import { Button } from 'react-bootstrap';
import "./RegisterModal.css"


type RegisterModalProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    toggleRegisterModal: () => void,
}

interface FormState {
    username: string;
    email: string;
    password: string;
}

type ErrorState = {
    username?: string,
    email?: string,
    password?: string,
}

const RegisterModal = (props: RegisterModalProps) => {
    const {setIsLoggedIn, toggleRegisterModal} = props;

    const [formState, setFormState] = useState<FormState>({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<ErrorState>({});
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: ''})); // Clear error when the field is changed
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event)=>{
        event.preventDefault(); 
        const newErrors: { [key in keyof FormState]?: string } = {};

        //Validate form fields for required specification
        Object.keys(formState).forEach((key)=>{
            const fieldName = key as keyof FormState;
            if(!formState[fieldName]){
                newErrors[fieldName] = `${fieldName} is required`;
            }
        })

        //Validation for Email
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(formState.email){
            if(!emailPattern.test(formState.email)){
                newErrors.email = `Wrong Email Format`
            }
        }

        //Validation for Password Specifications
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(formState.password){
            if(!passwordPattern.test(formState.password)){
                newErrors.password = `At least 1 alphabet, 1 digit & min 8 characters`
            }
        }

        //If there ar errors, set them and prevent form submission
        if(Object.keys(newErrors).length > 0){
            setErrors({...newErrors})
            return
        }

        //If form is valid then proceed with submission logic
        //Add User to User List
        const currUserId = addUser({...formState})
        //setCurrentUser
        if(!(currUserId instanceof Error)){
            setCurrentUserId(currUserId);
        }else{
            console.log(currUserId.message)
        }
        //toggleModal
        toggleRegisterModal();
        //setIsLoggedIn
        setIsLoggedIn(true);
    }

    return (
        <form className="Register-Modal-Form" onSubmit={handleSubmit}>
            <div className="Register-Modal-Image">
                <img
                    alt=""
                    src={logo}
                    // width="30"
                    // height="30"
                    className="d-inline-block align-top"
                    />
            </div>
            <div className="Register-Modal-Data">
                <div className="Register-Modal-DataEntry">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    />
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>

                <div className="Register-Modal-DataEntry">
                    <label htmlFor="email">Email</label>
                    <input
                    type="text"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>

                <div className="Register-Modal-DataEntry">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
            </div>
            <div className="Register-Modal-Buttons">  
                <Button variant="success" type="submit">Register</Button>
                <Button variant="danger" onClick={toggleRegisterModal}>Cancel</Button>
            </div>  

        </form>
    )
}

export default RegisterModal