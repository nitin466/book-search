import React, { useState, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce';
import './searchBar.css';
import Suggestions from '../suggestion/suggestions';
import bookData from '../../data.json'
import { NOT_FOUND } from '../../constants';


const SearchInput = ({ onSubmit }) => {

  const { titles, summaries } = bookData;

  const [searchKey, setSearchKey] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error404, setError404] = useState(false);
  const [titleSelected, setTitleSelected] = useState(false)
  const debouncedSearch = useDebounce(searchKey);


  useEffect(() => {
    if (!debouncedSearch) {
      setError404(false);
      setTitleSelected(false)
    }

    if (!titleSelected) {
      if (debouncedSearch) {
        setError404(false);

        /**
        * 1. Based on user's search key, get all the summaries 
        * 2. arrange all the 'titles' of matching summaries based on decresing number of count of occurance 
        *  of search key in the summary
        * 3. set it to suggestion list, for suggestions to be displayed
        */

        //export these fun from utilitiesand import here to use
        const matchingSummary = summaries.filter((item) => {
          return item.summary.toLowerCase().includes(debouncedSearch);
        })


        const sortedSuggestion = matchingSummary.map(({ id, summary }) => {
          var count = summary.toLowerCase().split(debouncedSearch).length - 1;
          return { id, title: titles[id], count }
        }).sort((a, b) => b.count - a.count);
        if (sortedSuggestion.length > 0) {
          setSuggestions(sortedSuggestion);
          setError404(false);
        } else {
          setError404(true);
          setSuggestions(sortedSuggestion);
        }
      }
    } else {
      setSearchKey()
    }



  }, [debouncedSearch])

  /**
   * 
   * @param {*} id 
   * @param {*} title 
   * Once suggestoin is selected 
   * 1) populate input field with selected title
   * 2) set the state of selectedSuggestionId
   * 3) remove suggestion dropdown from DOM
   */

  const handleSelectSuggestion = (id, title) => {
    setSearchKey(title);
    setTitleSelected(true);
    setSelectedId(id);
    setSuggestions([]);
    setError404(false);
  }

  /**
   * On submit : 
   * 1. pass selected id to parent component, which there would be used to filter 
   *  title, summary and authors from the bookData to show books in the list
   */
  const handleSubmit = () => {
    onSubmit(selectedId);
    setSearchKey("");
    setTitleSelected(false);
  }


  return (
    <div className='search-container'>
      <h3 className='heading'>A simple feature to find book based summary search </h3>
      <div className="input-container">
        <div className='input-error'>
          <input type="text" className='search-input'
            placeholder="Please search summary ... "
            data-testid="search-input"
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
          {error404 && <div className='error-msg'>{NOT_FOUND}</div>}
        </div>
        <button className='btn-submit' onClick={handleSubmit}>Submit</button>
        {suggestions.length > 0 && <Suggestions suggestions={suggestions}
          handleSelectSuggestion={handleSelectSuggestion} />}
      </div>
    </div>
  )
}

export default SearchInput;
