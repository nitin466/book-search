import { render, screen, fireEvent , act, waitFor } from '@testing-library/react';
import SearchInput from './searchBar';
import Suggestions from '../suggestion/suggestions';
import { mockedHandleSelectSuggestion, mockedSubmitFn, mockedSuggestions, mockedEmptyArray} from '../../mockTestData'


describe("SearchBar", () => {
    it('should render input element', async () => {
        render(<SearchInput />)

        const placeholderElement = screen.getByPlaceholderText(/Please search summary .../i);
        expect(placeholderElement).toBeInTheDocument();
    })

    it('should be able to type in input', async () => {
        render(<SearchInput />);
        const inputElement = screen.getByPlaceholderText(/Please search summary .../i);
        fireEvent.change(inputElement, { target: { value: "history" } });
        expect(inputElement.value).toBe("history")
    })

    it('should be able to find if button is present', () => {
        const { getByText } = render(<SearchInput />)

        const buttonElement = getByText("Submit");
        expect(buttonElement).toBeTruthy();

    })

       it('should have empty input element when Submit button is clicked', async () => {
         render(<SearchInput onSubmit={mockedSubmitFn} />)
         render(<Suggestions suggestions={mockedSuggestions} handleSelectSuggestion={mockedHandleSelectSuggestion} />)

        const inputElement = screen.getByPlaceholderText(/Please search summary/i);
        const buttonElement = screen.getByRole("button", { name : "Submit" });
        const suggestionElements = screen.getAllByTestId("suggestion-item");
        
        fireEvent.click(suggestionElements[0]);
        fireEvent.click(buttonElement);

        waitFor(() => expect(inputElement.value).toBe(""))
    })

    // it('should display "Not Found !" if search result is empty', () => {

    //     render(<SearchInput onSubmit={mockedSubmitFn} />)
    //      render(<Suggestions suggestions={mockedEmptyArray} handleSelectSuggestion={mockedHandleSelectSuggestion} />)

    //     const divElement = screen.getByText(/Not Found/i, { exact: false });
    //     // waitFor(() => expect(divElement).toBeInTheDocument())

    // } )
})
