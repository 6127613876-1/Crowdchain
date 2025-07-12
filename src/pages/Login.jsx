// import React, { useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';

// const Login = () => {
//   const { loginWithRedirect, user, isAuthenticated } = useAuth0();
//   const [password, setPassword] = useState(''); // State to hold password input

//   const storeUserDetails = async () => {
//     if (user && password) { // Ensure password is provided

//   const storeUserDetails = async () => {
//     if (user) {
//       const userDetails = {
//         user: {
//           email: user.email,
//           name: user.name,
//           picture: user.picture, // include picture if needed
//           sub: user.sub, // Auth0 user ID
//         },
//       };

//       try {
//         console.log('Storing user details:', userDetails); // Log user details
//         const response = await axios.post('http://localhost:5000/api/storeUser', userDetails);
//         console.log('Response from server:', response.data); // Log response
//       } catch (error) {
//         console.error('Error storing user details:', error.response?.data || error.message); // Detailed error logging

//         console.error('Error storing user details:', error.response.data || error.message); // Detailed error logging

//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       storeUserDetails();
//     }
//   }, [isAuthenticated, user, password]);

//   }, [isAuthenticated, user];

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Login to Continue</h1>
      
//       {/* Input field for the password */}
//       {isAuthenticated && (
//         <div className="mb-4">
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} // Update password state
//             className="px-4 py-2 border rounded-md"
//           />
//         </div>
//       )}
      

//       <button
//         onClick={() => loginWithRedirect()}
//         className="bg-blue-500 text-white px-6 py-2 rounded-md"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;
