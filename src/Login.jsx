import { Link, useNavigate } from "react-router-dom";

export default function LogIn ({ setToken }) {
    const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
    const navigate = useNavigate();

    function handleLoginCommit (e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        logInAPI(email, password);
    }

    async function logInAPI (email, password){
        try{
            const response = await fetch(`${API}/users/login`,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({
                    "email": email,
                    "password": password
                })
            });

            if(response.ok){
                const data = await response.json();
                setToken(data.token);
                navigate("/");
            } else {
                console.log("Login failed:", response.status);
            }

        }catch(error){
            console.log("Something went wrong:", error);
        }
    }

    return (
        <>
            <h2 className="login-heading">Log In To Your Account</h2>
            <form className="login-form" onSubmit={(e)=> handleLoginCommit(e)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" />
                <button type="submit" className="login-button">Login</button>
            </form>
            <Link to="/newaccount" className="login-link">Need an account? Register here.</Link>
        </>
    );
}