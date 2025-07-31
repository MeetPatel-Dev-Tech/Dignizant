import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

jest.mock('../services/api', () => ({
  registerUser: jest.fn(() => Promise.resolve({ status: 201 })),
}));

import { registerUser } from '../services/api';
import SignUp from '../screens/SignUp';

describe('SignUp Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('I read and accept the Terms of Service')).toBeTruthy();
    expect(getByText('I read and accept the Privacy Policy')).toBeTruthy();
  });

  it('shows alert when email is invalid', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidemail');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Invalid Email');
    });
  });

  it('shows alert when passwords do not match', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Password@1');
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'Password@2',
    );
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Passwords do not match');
    });
  });

  it('shows alert when Terms of Service or Privacy Policy is not accepted', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Password@1');
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'Password@1',
    );

    // Checkboxes NOT toggled
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Please accept Terms and Privacy Policy',
      );
    });
  });

  it('submits form successfully and navigates', async () => {
    // Optional: ensure registerUser resolves here explicitly
    (registerUser as jest.Mock).mockResolvedValue({ status: 201 });

    const { getByPlaceholderText, getByText, getAllByRole } = render(
      <SignUp />,
    );

    fireEvent.changeText(getByPlaceholderText('First Name'), 'meet');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'shekhat');
    fireEvent.changeText(getByPlaceholderText('Username'), 'meetshekhat');
    fireEvent.changeText(
      getByPlaceholderText('Email'),
      'meetshekhat@gmail.com',
    );
    fireEvent.changeText(getByPlaceholderText('Password'), 'Meetshekhat@1A');
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'Meetshekhat@1A',
    );

    const checkboxes = getAllByRole('checkbox');
    fireEvent.press(checkboxes[0]);
    fireEvent.press(checkboxes[1]);

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        first_name: 'meet',
        last_name: 'shekhat',
        username: 'meetshekhat',
        email: 'meetshekhat@gmail.com',
        password: 'Meetshekhat@1A',
        tos_accept: true,
        privacy_policy_accept: true,
      });
      expect(mockNavigate).toHaveBeenCalledWith('OtpVerification', {
        email: 'meetshekhat@gmail.com',
        action: 'register', // match actual string value used in code
      });
    });
  });

  it('shows alert when API call fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    (registerUser as jest.Mock).mockRejectedValue({
      response: { data: { message: 'Email already taken' } },
    });

    const { getByPlaceholderText, getByText, getAllByRole } = render(
      <SignUp />,
    );

    fireEvent.changeText(
      getByPlaceholderText('Email'),
      'meetshekhat@gmail.com',
    );
    fireEvent.changeText(getByPlaceholderText('Password'), 'Meetshekhat@1A');
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'Meetshekhat@1A',
    );

    const checkboxes = getAllByRole('checkbox');
    fireEvent.press(checkboxes[0]);
    fireEvent.press(checkboxes[1]);

    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error', 'Email already taken');
    });
  });
});
