import { api, setAuthHeader } from './index';
import { loginSuccess, setLoading, setError } from '../store/authSlice';
import { setProgress } from '../store/progressSlice';

// Login function
export const login = async (dispatch, email, password) => {
    dispatch(setLoading());
    try {
        const response = await api.post('/login', { email, password });

        if (response.data.success) {
            const { token, user } = response.data;

            setAuthHeader(token);
            dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));

            const progressResponse = await api.get('/user/progress');
            dispatch(setProgress(progressResponse.data));

            return { success: true, message: '' }; // Return success for the login page to handle

        } else {
            // Return failure with the message if login is unsuccessful
            return { success: false, message: response.data.message || 'Login failed' };
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message || 'An error occurred.' };
        } else if (error.request) {
            return { success: false, message: 'No response from server.' };
        } else {
            return { success: false, message: error.message || 'An error occurred.' };
        }
    }
};




// Signup function
export const signup = async (dispatch, name, email, password, confirmPassword) => {
    dispatch(setLoading());
    try {

        // Ensure you include password_confirmation in the API request
        const response = await api.post('/signup', {
            name,
            email,
            password,
            password_confirmation: confirmPassword // Send confirmation password
        });

        if (response.data.success) {

            // Handle the response if signup is successful
            const { token, user } = response.data;
            console.log(response.data);
            console.log(token);

            // Set the token in axios headers for future requests
            setAuthHeader(token);

            // Store the token and user in the Redux store
            // dispatch(loginSuccess({ token, user }));
            dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));


            // Optionally, fetch user progress after signup
            const progressResponse = await api.get('/user/progress');
            dispatch(setProgress(progressResponse.data));

            return { success: true, message: '' }; // Return success for the login page to handle

        } else {
            // Return failure with the message if login is unsuccessful
            return { success: false, message: response.data.message || 'Signup failed' };
        }

    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message || 'An error occurred.' };
        } else if (error.request) {
            return { success: false, message: 'No response from server.' };
        } else {
            return { success: false, message: error.message || 'An error occurred.' };
        }
    }
};

// Logout function
export const logout = async (dispatch) => {
    try {
        // Optional: Make a server request to log out if required
        const response = await api.post('/logout');

        // Clear user session and progress in Redux
        setAuthHeader(null);
        dispatch(loginSuccess({ token: null, user: null }));
        dispatch(logout());
        dispatch(setProgress(null));

        return response;
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
};

