import React from 'react'



class Book extends React.Component {
  render() {
    const {book, onUpdateBookShelf}  = this.props;
    let strAuthors = '';
    book.authors ? strAuthors = book.authors.join(', ') : strAuthors = '';
    let imgURL = '';
    ('imageLinks' in book) ? (("thumbnail" in book.imageLinks) && (imgURL = `url(${book.imageLinks.thumbnail})`)) : imgURL = '';
    let bookTitle = '';
    ('title' in book) ? (bookTitle = book.title) : (bookTitle = '');

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imgURL }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(evt) => onUpdateBookShelf(book, evt.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookTitle}</div>
          <div className="book-authors">{strAuthors}</div>
        </div>
      </li>
    )
  }
}

export default Book
