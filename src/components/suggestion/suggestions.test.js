import React from 'react';
import { render, fireEvent, screen, getByTestId, getAllByTestId, waitFor } from '@testing-library/react'
import Suggestions from './suggestions';
import SearchInput from '../searchBar/searchBar';

import { mockedHandleSelectSuggestion, mockedSubmitFn, mockedSuggestions} from '../../mockTestData'


describe('Suggestions', () => {

    it('should render list of suggestions', () => {
        render(<Suggestions suggestions={mockedSuggestions} handleSelectSuggestion={mockedHandleSelectSuggestion} />)

        const divElement = screen.getByText(/great/i, { exact: false });
        
        expect(divElement).toBeInTheDocument()
    });

    it('should render match count ', () => {
        render(<Suggestions suggestions={mockedSuggestions} handleSelectSuggestion={mockedHandleSelectSuggestion} />)

        const matchCountText = screen.getAllByText(/match count/i, { exact: false });
        
        expect(matchCountText.length).toBe(3);
    });

    it('should render all the suggestions', () => {
        render(<Suggestions suggestions={mockedSuggestions} handleSelectSuggestion={mockedHandleSelectSuggestion} />)
        
        const suggestionElements = screen.getAllByTestId("suggestion-item");
        
        expect(suggestionElements.length).toBe(3)
    })

    it('should select clicked suggestion', async () => {
        render(<Suggestions suggestions={mockedSuggestions} handleSelectSuggestion={mockedHandleSelectSuggestion} />)
        render(<SearchInput onSubmit={mockedSubmitFn} />);

        const inputElement = screen.getByPlaceholderText(/Please search summary .../i);
        const suggestionElements = screen.getAllByTestId("suggestion-item");
        fireEvent.click(suggestionElements[0]);

        waitFor(() => expect(inputElement.value).toHaveValue("Psychology of money"))
    })


})