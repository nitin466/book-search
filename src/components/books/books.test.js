import { fireEvent, render, screen, getByTestId, waitFor } from '@testing-library/react'

import Books from './books';
import Suggestions from '../suggestion/suggestions';

import { mockedHandleSelectSuggestion, mockedSuggestions } from '../../mockTestData'

describe('Books', () => {

    it('should render list of books passed to it', () => {

        render(<Suggestions suggestions={mockedSuggestions} handleSelectSuggestion={mockedHandleSelectSuggestion} />)
        render(<Books />)

        const inputElement = screen.getByPlaceholderText(/Please search summary .../i);
        const suggestionElements = screen.getAllByTestId("suggestion-item");
        fireEvent.click(suggestionElements[0]);
        const bookListElement = screen.getByTestId("book-list");

        waitFor(() => expect(bookListElement).not.toContain(inputElement.nodeValue))

    });

});