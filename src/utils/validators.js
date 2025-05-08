export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password) => {
    // At least 6 characters with at least one number
    const re = /^(?=.*\d).{6,}$/;
    return re.test(password);
  };