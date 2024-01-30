import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/session";

export default function SignInPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState({ message: "", errors: [] });

  function handleSubmit(e) {
    e.preventDefault();
    setLoggingIn(true);
    dispatch(login({ credential: form.email, password: form.password })).catch(
      (err) =>
        err.json().then((err) => {
          setError(err);
          setLoggingIn(false);
        })
    );
  }

  function handleGuestLogin(credential, password) {
    setForm({ email: credential, password });
    setLoggingIn(true);
    dispatch(login({ credential, password })).catch((err) =>
      err.json().then((err) => {
        setError(err);
        setLoggingIn(false);
      })
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-green-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-green-900">
          Marci Forms
        </h2>
        <p className="mt-2 text-center text-3xl font-extrabold leading-9 text-green-600">
          {error.message}
        </p>
        <ul className="mt-2 text-center text-lg font-semibold leading-9 text-green-600">
          {error.errors?.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loggingIn}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={loggingIn}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              disabled={loggingIn}
            >
              Log In
            </button>
          </div>
        </form>

        <button
          type="button"
          className="flex w-full mt-8 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          disabled={loggingIn}
          onClick={() =>
            handleGuestLogin("user.test@marci-forms.org", "password")
          }
        >
          Log In with Guest Account
        </button>
        <button
          type="button"
          className="flex w-full mt-2 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm enabled:hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          disabled={loggingIn}
          onClick={() =>
            handleGuestLogin("admin@marci-forms.org", "administrator")
          }
        >
          Log In with Guest Admin Account
        </button>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-green-600 enabled:hover:text-green-500"
            disabled={loggingIn}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
