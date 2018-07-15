import React from 'react'
import Book from './Book.js'


class BookShelf extends React.Component {
  render() {
    const {books, bookShelfTitle, onUpdateBookShelf} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) =>
              <Book book={book} onUpdateBookShelf={onUpdateBookShelf} key={book.id}/>
            )}
          </ol>
        </div>
      </div>
    )
  }
}
export default BookShelf
