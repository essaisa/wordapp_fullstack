import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Reg from '../layouts/Reg';

describe('Reg Component', () => {

  const mockHandleChangePage = jest.fn();
  const mockSetName = jest.fn();

  beforeEach(() => {
    render(
      <Reg 
        handleChangePage={mockHandleChangePage} 
        name="" 
        setName={mockSetName} 
      />
    );
  });

  test('renders username and password inputs', () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('updates input values when typed into', async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
  
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'mypassword');
  
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('mypassword');
  });
  

  test('calls handleChangePage and setName on successful submit', async () => {
  // Mock fetch
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ token: 'fake-token' }),
  });

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign up/i });

  // Await typing so the state updates correctly
  await userEvent.type(usernameInput, 'testuser');
  await userEvent.type(passwordInput, 'mypassword');

  // Await clicking the submit button
  await userEvent.click(submitButton);

  // Wait for async fetch call
  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:5003/auth/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'mypassword' }),
      })
    );

    expect(mockSetName).toHaveBeenCalledWith('testuser');
    expect(mockHandleChangePage).toHaveBeenCalledWith(1);
  });

  fetchMock.mockRestore();
});


});
