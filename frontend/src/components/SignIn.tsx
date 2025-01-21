import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import { useAuth } from "../context/AuthContext";

const SignIn: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [executeQuery, { data, isLoading, error }] = useQuery<{
    login: string;
    signup: string;
  }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const mutation = isRegistering
      ? `mutation { signup(email: "${formData.email}", username: "${formData.username}", password: "${formData.password}", confirmPassword: "${formData.confirmPassword}") }`
      : `mutation { login(email: "${formData.email}", password: "${formData.password}") }`;

    await executeQuery(mutation);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    } else if (data) {
      const token = isRegistering ? data.signup : data.login;
      if (token) {
        signIn(token);
      }
    }
  }, [data, error, isRegistering, signIn]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="p-8 w-[495px] rounded-lg border border-gray-300 shadow-sm">
        <h2 className="text-2xl mb-6">Welcome!</h2>
        <h2 className="text-3xl font-bold mb-2">
          {isRegistering ? "Sign up to" : "Sign in to"}
        </h2>
        <h2 className="text-lg mb-12">
          get things done{String.fromCodePoint(0x2728)}
        </h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {isLoading && <p className="text-gray-500">...loading</p>}
        <form onSubmit={handleSubmit}>
          <label>Enter your email</label>
          <input
            type="email"
            name="email"
            placeholder="yours@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-200 p-2 mb-8 w-full rounded"
          />
          {isRegistering && (
            <>
              <label>Enter your username</label>
              <input
                type="text"
                name="username"
                placeholder="task master"
                value={formData.username}
                onChange={handleChange}
                required
                className="border border-gray-200 p-2 mb-8 w-full rounded"
              />
            </>
          )}
          <label>Enter your password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-200 p-2 mb-8 w-full rounded"
          />
          {isRegistering && (
            <>
              <label>Confirm your password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border border-gray-200 p-2 mb-8 w-full rounded"
              />
            </>
          )}
          <button
            type="submit"
            className="bg-teal-400 text-white py-5 font-bold rounded w-full"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <div className="text-center ">
          <span className="text-gray-400 font-light">
            {isRegistering
              ? "Already have an Account?"
              : "Don't have an Account?"}
          </span>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="mt-4 text-teal-400 font-bold px-2"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
