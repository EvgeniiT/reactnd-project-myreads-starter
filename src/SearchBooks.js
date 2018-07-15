import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book.js'

class SearchBooks extends React.Component {
  state= {
    query: '',
    foundedBooks: [],
    noBooksFound: false
  }

  // Helper function for type check
  is = (item, type) =>
  	Object
  	.prototype
  	.toString.call(item)
  	.match(/\s(\w+)]/)[1]
  	.toLowerCase() === type

  // Update state of founded books and state of books on the shelfs
  onUpdateSearchedBookShelf = (book, shelf) => {
    this.setState((state) => ({foundedBooks: state.foundedBooks.map(b => {
      let thisBook = b;
      (thisBook.id === book.id) && (thisBook.shelf = shelf);
      return thisBook;
    })}));
    this.props.onUpdateBookShelf(book, shelf);
  }

  // Update state of query
  updateQuery = (q) => {
    this.setState({ query: q });
    this.updateFoundedBooks(q);
  }

  // Update founded books state
  updateFoundedBooks = (q) => {
    BooksAPI.search(q).then(books =>  {
      if (q === this.state.query) {
        this.setNoBooksFoundState(books);
        if (Array.isArray(books)) {
          this.setBooksShelfs(books);
          this.setState({foundedBooks: books});
        } else {
          this.setState({ foundedBooks: [] });
        }
      }
    });
  }

  // Set flag if no books founded
  setNoBooksFoundState = (b) => {
    if ( this.is(b, 'object')) {
      this.setState({noBooksFound: true});
    } else {
      this.setState({noBooksFound: false});
    }
  }

  // Set bookshelf for a book
  setBooksShelfs = (foundedBooks) => {
    const existingBooks = this.props.booksOnSelfs;
    const usedIDs = this.props.booksOnSelfs.map( b => b.id);
    return foundedBooks.map(b => {
      let i = usedIDs.indexOf(b.id);
      if ( i !== -1) {
        b.shelf = existingBooks[i].shelf;
        return b
      } else {
        b.shelf = 'none';
        return b
      }
    })
  }

  render() {
    const { query, foundedBooks, noBooksFound }= this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(evt) => {
                return this.updateQuery(evt.target.value);}}
            />
          </div>
        </div>
        <div className="search-books-results">
          {
            (noBooksFound) && ( <h2>No books found</h2>)
          }
          <ol className="books-grid">
            {
              (Array.isArray(foundedBooks)) && (foundedBooks.map((book) =>
                <Book book={book} onUpdateBookShelf={this.onUpdateSearchedBookShelf} key={book.id}/>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
