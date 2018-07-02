export const validateEmail = (email) => {
  // Example to match all @example.com emails.
  const pattern = /^.+@example\.com$/;
  return email.match(pattern);
}