import React, { useState } from 'react';
import SearchInput from '../searchBar/searchBar';
import bookData from '../../data.json'
import './books.css';
import { colors, ALREADY_EXIST_MSG } from '../../constants';
import { generateRandomNum } from '../../utils'
import TombstoneUI from '../loader/tombstone';

//Component to display individual book
const Card = ({ bookDetail, bgColor }) => {
  const { title, author, summary } = bookDetail;
  
  return (
    <div className="book" >
      <div className="book-cover" style={{background: bgColor}}>
        <div className="effect">
          <div className="book-title">
            {title}
          </div>
          <div className="book-author">{author.author}</div>
        </div>
      </div>
      <div className="book-inside">
        <p className="heading">Summary</p>
        <p className="summary">{summary.summary}</p>
      </div>
    </div>
  )
}

//Book list: which will show all the added books
const Books = () => {
  const { titles, summaries, authors } = bookData;

  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState("");
  

  const onSubmit = (id) => {
    setLoading(true);
    const book = {
      title: titles[id],
      summary: summaries.filter((summary) => summary.id === id)[0],
      author: authors.filter((author) => author.book_id === id)[0],
    }

    //append book to list, if already not added

      for (let i = 0; i < selectedBooks.length; i++) {
        if (selectedBooks[i].title === titles[id]) {
          //show dialogue if already present in the list
          setDialogue(ALREADY_EXIST_MSG)
          setLoading(false);
          setTimeout(() => {
            setDialogue("");
          }, 1000)
          return;
        } 
      }

      setTimeout(() => {
        setSelectedBooks([...selectedBooks, book])
        setLoading(false)
      }, 1000);

    }
 

  return (
    <div>
      <SearchInput
        onSubmit={onSubmit}
      />

      <div className='horizontal-line'></div>
      { loading && <TombstoneUI /> }

      { dialogue && <div className='dialogue'>{dialogue}</div> }

      { !loading && 
        <div className="container" data-testid="book-list">
          {selectedBooks.map((book) => {
            return <Card bookDetail={book} bgColor={colors[generateRandomNum()]} />
          })}
        </div> 
      }
    </div>
      
  )
}

export default Books;