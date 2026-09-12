import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function HomePage () {

    const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(()=>{
        async function getBooks(){
            try{
                const response = await fetch (`${API}/books`);
                const data = await response.json();
                console.log(data)
                setBooks(data);
            }catch(error){
                console.error(error);
            }
        }
        getBooks()
    },[])

function renderList(booklist){

    return (
        <ul className="book-list">
            {booklist.map((book)=> (
                <li key={book.id} className="book-card">
                    <img src={book.coverimage} alt="" className="book-cover" />
                    <div className="book-info">
                        <Link to={`/books/${book.id}`} className="book-title">{book.title}</Link>
                        <p className="book-author">{book.author}</p>
                        <p className="book-description">{book.description}</p>
                        <p className="book-availability">
                            {book.available ? "Available" : "Not Available"}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );

}

function setSearchResult(e) {
    e.preventDefault();
    const value = new FormData(e.target).get("booksearch");
    setSearchTerm(value);
}

const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
);

    return(
        <>
            <h2 className="catalog-heading">Catalog</h2>
            <form className="search-form" onSubmit={(e) => setSearchResult(e)}>
                <input type="search" name="booksearch" placeholder="Search for a book..." />
                <button type="submit">Search</button>
            </form>
            {renderList(filteredBooks)}
        </>
    );
}