// src/utils/sanitize.js
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    // Remove potentially harmful characters
    return input.replace(/[<>"'`]/g, '');
  };
  
  export const sanitizeFormData = (data) => {
    const sanitized = {};
    Object.keys(data).forEach(key => {
      sanitized[key] = typeof data[key] === 'string' 
        ? sanitizeInput(data[key]) 
        : data[key];
    });
    return sanitized;
  };