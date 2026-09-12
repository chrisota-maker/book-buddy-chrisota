import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Book({ token }) {
    const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getBook() {
            try {
                const response = await fetch(`${API}/books/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error(error);
            }
        }
        getBook();
    }, [id]);

    async function reserveBook() {
        try {
            const response = await fetch(`${API}/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ bookId: id })
            });

            if (response.ok) {
                console.log("Book reserved!");
                navigate("/books");
            } else {
                console.log("Reservation failed:", response.status);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className="book-detail">
            <img src={book.coverimage} alt="" className="book-cover" />
            <div className="book-info">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-description">{book.description}</p>
                <p className="book-availability">
                    {book.available ? "Available" : "Not Available"}
                </p>
                {token && book.available && (
                    <button className="reserve-button" onClick={reserveBook}>
                        Reserve
                    </button>
                )}
            </div>
        </div>
    );
}