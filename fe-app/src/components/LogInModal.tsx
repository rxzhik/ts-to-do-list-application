import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { findUser, setCurrentUserId } from '../data/userRepo';
import "./LogInModal.css"
import { Button } from 'react-bootstrap';

type LogInModalProps = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    toggleLoginModal: () => void,
}

interface FormState {
    username: string;
    password: string;
}

type ErrorState = {
    username?: string,
    password?: string,
    invalid_user?: string
}

const LogInModal = (props: LogInModalProps) => {
    const {setIsLoggedIn, toggleLoginModal} = props;
    const [formState, setFormState] = useState<FormState>({
        username: '',
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

        //Validate form fields
        Object.keys(formState).forEach((key)=>{
            const fieldName = key as keyof FormState;
            if(!formState[fieldName]){
                newErrors[fieldName] = `${fieldName} is required`;
            }
        })

        //If there ar errors, set them and prevent form submission
        if(Object.keys(newErrors).length > 0){
            setErrors({...newErrors})
            return
        }

        //If form is valid then proceed with submission logic
        const user_id = findUser(formState.username, formState.password)
        //if user not found
        if(user_id instanceof Error){
            Object.keys(formState).forEach((key)=>{
                const fieldName = key as keyof FormState;
                formState[fieldName] = '';
            })
            setErrors({invalid_user: user_id.message})
        }

        //if user has been found
        if(!(user_id instanceof Error)){
            setErrors({})
            setCurrentUserId(user_id);
            toggleLoginModal();
            setIsLoggedIn(true);
        }

    }

    return (
        <form className="LogIn-Modal-Form" onSubmit={handleSubmit}>
            <div className="LogIn-Modal-Image">
                <img
                    alt=""
                    src={logo}
                    // width="30"
                    // height="30"
                    className="d-inline-block align-top"
                    />
                {errors.invalid_user && <div className="error">{errors.invalid_user}</div>}

            </div>
            <div className="LogIn-Modal-Data">
                <div className="LogIn-Modal-DataEntry">
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

                <div className="LogIn-Modal-DataEntry">
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
            <div className="LogIn-Modal-Buttons">  
                <Button variant="success" type="submit">Submit</Button>
                <Button variant="danger" onClick={toggleLoginModal}>Cancel</Button>
            </div>  

        </form>
    )
}

export default LogInModal