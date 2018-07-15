import React from 'react'
import BookShelf from './BookShelf.js'

class BookShelfs extends React.Component {
  render() {
    const {books, onUpdateBookShelf} = this.props;
    const bookShelfKeys = ['currentlyReading', 'wantToRead', 'read'];
    const bookShelfTitles = ['Currently reading', 'Want to read', 'Read']
    let filteredBooks = [];
    return(
      <div className="list-books-content">
        <div>
          {
            bookShelfKeys.map((bookShelfKey, index) => {
              filteredBooks = books.filter(b => b.shelf === bookShelfKey);
              return <BookShelf
                books={filteredBooks}
                bookShelfTitle={bookShelfTitles[index]}
                onUpdateBookShelf={onUpdateBookShelf}
                key={bookShelfKey}
              />
            })
          }
        </div>
      </div>
    )
  }
}

export default BookShelfs
