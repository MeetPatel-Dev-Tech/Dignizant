export const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

export const isPasswordValid = (password: string) => {
  const hasAtSymbol = password.includes('@');
  const isLongEnough = password.length >= 10;
  const hasNumber = /\d/.test(password); // at least one digit
  const hasUppercase = /[A-Z]/.test(password); // at least one uppercase letter

  return hasAtSymbol && isLongEnough && hasNumber && hasUppercase;
};

export const isNameValid = (name: string) => name.trim().length >= 2;
export const isUsernameValid = (username: string) =>
  username.trim().length >= 4;
