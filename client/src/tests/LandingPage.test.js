import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage.jsx';

describe('Landing Page', () => {
    it('should contain the logo text', () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        expect(screen.getAllByText(/BREED EXPLORER/)).toBeDefined();
    });

    it('should contain cta buttons', () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        expect(screen.getAllByRole("button", { name: "Try it free" })).toBeDefined();
    });
})
