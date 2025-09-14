import api from "./axios";

// Helper to save auth tokens
const saveAuthTokens = (access, refresh, user_id, phone, has_shop) => {
  // Clear old keys
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_id");
  localStorage.removeItem("phone");
  localStorage.removeItem("has_shop");

  // Store clean values
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("user_id", user_id);
  localStorage.setItem("phone", phone);
  localStorage.setItem("has_shop", has_shop);
};

// Login with email/phone and password
const login = async (identifier, password) => {
  try {
    const isEmail = identifier.includes('@');
    const requestData = {
      [isEmail ? 'email' : 'phone']: identifier,
      password,
      is_signup: false
    };
    
    const response = await api.post('/api/auth/login/', requestData);

    const { access, refresh, user_id, phone: userPhone, has_shop } = response.data;
    
    // Save tokens and user data
    saveAuthTokens(access, refresh, user_id, userPhone, has_shop);
    
    return {
      access,
      refresh,
      userId: user_id,
      phone: userPhone,
      hasShop: has_shop
    };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 400 || error.response.status === 401) {
        throw new Error('Invalid phone number or password');
      }
      throw new Error(error.response.data?.error || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      throw new Error('Request failed. Please try again.');
    }
  }
};

// Signup with phone, email and password
const signup = async (phone, password, email) => {
  try {
    const response = await api.post('/api/auth/login/', {
      phone,
      email,
      password,
      is_signup: true
    });

    const { access, refresh, user_id, phone: userPhone, has_shop } = response.data;
    
    // Save tokens and user data
    saveAuthTokens(access, refresh, user_id, userPhone, has_shop);
    
    return {
      access,
      refresh,
      userId: user_id,
      phone: userPhone,
      hasShop: has_shop
    };
  } catch (error) {
    if (error.response) {
      // Handle specific error messages from the server
      if (error.response.data?.error) {
        throw new Error(error.response.data.error);
      }
      if (error.response.data?.phone) {
        throw new Error(`Phone number: ${error.response.data.phone[0]}`);
      }
      if (error.response.data?.email) {
        throw new Error(`Email: ${error.response.data.email[0]}`);
      }
      if (error.response.data?.password) {
        throw new Error(`Password: ${error.response.data.password[0]}`);
      }
      throw new Error('Registration failed. Please try again.');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Request failed. Please try again.');
    }
  }
};

// Password Reset
const requestPasswordReset = async (email) => {
  const response = await api.post('/api/auth/password-reset-request/', { email });
  return response.data;
};

const verifyOTP = async (email, otp) => {
  const response = await api.post('/api/auth/verify-otp/', { email, otp });
  return response.data;
};

const confirmPasswordReset = async (email, otp, newPassword) => {
  // First verify the OTP
  await verifyOTP(email, otp);
  
  // If OTP verification succeeds, proceed with password reset
  const response = await api.post('/api/auth/password-reset-confirm/', {
    email,
    otp,
    new_password: newPassword
  });
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_id");
  localStorage.removeItem("phone");
  localStorage.removeItem("has_shop");
};

export { login, signup, requestPasswordReset, confirmPasswordReset };

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

// Get current user data
export const getCurrentUser = () => {
  return {
    userId: localStorage.getItem("user_id"),
    phone: localStorage.getItem("phone"),
    hasShop: localStorage.getItem("has_shop") === 'true'
  };
};
