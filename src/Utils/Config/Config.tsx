import axios from "axios";


const apiURL = "https://crudproject-0nhl.onrender.com";



const apiClient = axios.create({
    baseURL : apiURL,
    headers : {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }
});

apiClient.interceptors.request.use(
    (config:any) => {
      const token =  localStorage.getItem('token')
      return {
        ...config,
        headers: {
          ...(token !== null && { Authorization: `${token}` }),
          ...config.headers,
        },
      };
    },
    (error) => {
      console.log(error);
      
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    response => {
      // If the request succeeds, return the response
      console.log(response);
      
      return response;
    },
    error => {
      // If there's an error (e.g., network error, 4xx, 5xx)
      if (error.response) {
        // Check if the error status is 401 (Unauthorized)
        if (error.response.status === 401) {
          // Redirect to login page or handle unauthorized access
          // Example with React Router
         window.location.pathname=""
        }
      }
      // Return the error
      return Promise.reject(error);
    }
  );
export default apiClient;