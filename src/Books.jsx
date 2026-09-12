import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Books ({ token }) {
    const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;

        async function getReservations() {
            try {
                const response = await fetch(`${API}/reservations`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error(error);
            }
        }
        getReservations();
    }, [token]);

    async function returnBook(reservationId) {
        try {
            const response = await fetch(`${API}/reservations/${reservationId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                setReservations((prev) => prev.filter((r) => r.id !== reservationId));
                navigate("/");
            } else {
                console.log("Return failed:", response.status);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!token) {
        return <p>You must be logged in to view your reserved books.</p>;
    }

    return (
        <ul className="book-list">
            {reservations.map((reservation) => (
                <li key={reservation.id} className="book-card">
                    <img src={reservation.coverimage} alt="" className="book-cover" />
                    <div className="book-info">
                        <p className="book-title">{reservation.title}</p>
                        <p className="book-author">{reservation.author}</p>
                        <p className="book-description">{reservation.description}</p>
                        <button className="return-button" onClick={() => returnBook(reservation.id)}>
                            Return
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}