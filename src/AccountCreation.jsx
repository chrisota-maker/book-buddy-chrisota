import { Link, useNavigate } from "react-router-dom";

export default function AccountCreation ({ setToken }) {
    const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
    const navigate = useNavigate();

    function handleRegistrationSubmit (e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email");
        const password = formData.get("password");
        registerAPI(firstname, lastname, email, password);
    }

    async function registerAPI (firstname, lastname, email, password){
        try{
            const response = await fetch(`${API}/users/register`,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "password": password
                })
            });

            if(response.ok){
                const data = await response.json();
                setToken(data.token);
                navigate("/");
            } else {
                console.log("Registration failed:", response.status);
            }

        }catch(error){
            console.log("Something went wrong:", error);
        }
    }

    return (
        <>
            <h2 className="login-heading">Register for an account</h2>
            <form className="login-form" onSubmit={(e)=> handleRegistrationSubmit(e)}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" name="firstname" />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" name="lastname" />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" />
                <button type="submit" className="login-button">Register</button>
            </form>
            <Link to="/login" className="login-link">Already have an account? Log in here.</Link>
        </>
    );
}