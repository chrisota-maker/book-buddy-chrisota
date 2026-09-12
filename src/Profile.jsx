import { useEffect, useState } from "react";

export default function Profile ({ token }) {
    const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
    const [account, setAccount] = useState(null);

    useEffect(() => {
        if (!token) return;

        async function getAccount() {
            try {
                const response = await fetch(`${API}/users/me`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await response.json();
                setAccount(data);
            } catch (error) {
                console.error(error);
            }
        }
        getAccount();
    }, [token]);

    if (!token) {
        return <p>You must be logged in to view this page.</p>;
    }

    if (!account) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-info">
            <h2>Your Account</h2>
            <p>{account.firstname} {account.lastname}</p>
            <p>{account.email}</p>

            <h3>Your Reservations</h3>
            <ul className="reservation-list">
                {account.reservations.map((res) => (
                    <li key={res.id}>{res.title} by {res.author}</li>
                ))}
            </ul>
        </div>
    );
}