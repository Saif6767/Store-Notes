import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../constants/constant';

const Login = () => {

  const [email, setEmail]=useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e: React.FormEvent)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}Auth/login`,{
        email,
        password
      });

      const {token} = response.data;

      localStorage.setItem('token',token);

      toast.success("Login successful!");
      navigate('/dashboard')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials. Try again.';
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Not registered?{' '}
            <Link to="/signup" className="underline text-blue-500 cursor-pointer">
              Signup
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
