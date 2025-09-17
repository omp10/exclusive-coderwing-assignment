import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

export function Signup() {
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  function validate(values) {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Valid email is required';
    if (values.password.length < 6) nextErrors.password = 'Min 6 characters';
    return nextErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues(v => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(formValues);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // Placeholder: integrate with backend later
      alert(`Welcome, ${formValues.name}! Account created.`);
    }
  }

  return (
    <section className="mx-auto my-10 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image Column */}
        <div className="hidden md:block">
          <img
            src="/images/signup-image.jpg"
            alt="Shopping cart with a phone and bags"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Column */}
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-sm text-gray-500">Enter your details below</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <input
                  className="mt-1 w-full border-b border-gray-300 bg-transparent py-2 outline-none"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <input
                  className="mt-1 w-full border-b border-gray-300 bg-transparent py-2 outline-none"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Email or Phone Number"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <input
                  className="mt-1 w-full border-b border-gray-300 bg-transparent py-2 outline-none"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <button type="submit" className="w-full rounded-md bg-red-500 py-3 font-semibold text-white transition-colors hover:bg-red-600">
                Create Account
              </button>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100">
                <FaGoogle />
                <span>Sign up with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
