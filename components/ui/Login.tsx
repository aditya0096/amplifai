'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-2xl font-semibold text-gray-800">FlowState</span>
            </div>
          </div>

          {/* Login Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <p className="text-gray-600 mb-8">Enter your email below to login to your account.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="space-y-6">

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleCredentialsLogin}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>

              {/* Demo Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
                <p className="text-sm text-blue-700">Email: admin@example.com</p>
                <p className="text-sm text-blue-700">Password: password123</p>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600">
                "Don't have an account?"{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section (Same as before) */}
      <div className="flex-1 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-40 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-40 left-40 w-8 h-8 border border-white rounded-full"></div>
          <div className="absolute top-32 left-16 w-20 h-px bg-white transform rotate-45"></div>
          <div className="absolute bottom-32 right-16 w-16 h-px bg-white transform -rotate-45"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full p-16">
          <div className="text-center">
            <div className="mb-12">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <div className="w-10 h-10 bg-white rounded-lg transform rotate-45"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Drive Better Decisions<br />
              with Centralized<br />
              Performance &<br />
              Account Intelligence.
            </h2>
            <div className="absolute bottom-16 right-16 opacity-20">
              <div className="relative">
                <div className="w-24 h-24 border-2 border-white"></div>
                <div className="w-24 h-24 border-2 border-white absolute top-2 left-2 -z-10"></div>
                <div className="w-24 h-24 border-2 border-white absolute top-4 left-4 -z-20"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-16 left-1/4 w-2 h-16 bg-white/20 transform rotate-12"></div>
          <div className="absolute bottom-24 left-1/3 w-1 h-12 bg-white/20 transform -rotate-12"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-20 bg-white/20 transform rotate-45"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage