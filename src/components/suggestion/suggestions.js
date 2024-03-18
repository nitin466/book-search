
import './suggestions.css';

const Suggestions = ({ suggestions, handleSelectSuggestion }) => {

    return (
        <div className="suggestion-container">
            { suggestions.map(({id, title, count }) => {
                return(
                    <div key={id} className="suggestion" data-testid="suggestion-item"  onClick={() => handleSelectSuggestion(id, title)} >
                        <span >{title} </span><span className='count'>{`match count : ${count}`}</span>
                    </div>
                )
            })}
        </div>
    )
}
export default Suggestions;