import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../components/Input.jsx';
import * as constants from '../constants/input';

describe('Input', () => {

    afterEach(cleanup);

    it('Label when field is not required', () => {
        render(
            <Input name='not-required' label='not-required' isRequired={false} />
        );
        expect(screen.getByLabelText('not-required')).toBeDefined();
    });
    it('Label when field is required', () => {
        render(
            <Input name='required' label='required' isRequired={true} />
        );
        expect(screen.getByLabelText('required *')).toBeDefined();
    });
    it('Show error from parent', () => {
        render(
            <Input name='parent' label='parent' isRequired={true} parentError='The Parent Error' />
        );
        expect(screen.getByText('The Parent Error')).toBeDefined();
    });
    it('Show error when no value was entered', () => {
        const { getByTestId } = render(
            <Input name='name' label='Name' value='Jack Russell' isRequired={true} />
        );

        const input = getByTestId('input');

        // userEvent.type(input,'name');
        // userEvent.focus();
        // input.focus();
        // fireEvent.blur(input);

        userEvent.clear(input);
        input.blur();

        const error = getByTestId('error');

        expect(error).toHaveTextContent(constants.FIELD_REQUIRED);
    });
    it('Show no error when no value was entered and the field is required', () => {
        const { getByTestId, queryByTestId } = render(
            <Input name='name' label='Name' value='Jack Russell' isRequired={false} />
        );

        const input = getByTestId('input');

        userEvent.clear(input);
        input.blur();

        const error = queryByTestId('error');

        expect(error).not.toBeInTheDocument();
    });

});