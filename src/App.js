import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import BookShelfs from './BookShelfs'




class BooksApp extends React.Component {
  state = {
    books: []
  }

  // Get all books on the shelfs from server
  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books: books });
    }
    );
  }

  // Update books on the shelfs and update books on the server
  updateBookShelf = (book, shelf) => {
    const booksIDs = this.state.books.map(b => b.id);
    if (booksIDs.indexOf(book.id) !== -1) {
      this.setState((state) => ({books : state.books.map(b => {
        // let thisBook = b;
        (b.id === book.id) && (b.shelf = shelf);
        return b;
      })}));
    } else {
      this.setState( state => state.books.push(book));
    }
    BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelfs books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks onUpdateBookShelf={this.updateBookShelf} booksOnSelfs={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
