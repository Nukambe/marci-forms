import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/session";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState({ message: "", errors: [] });
  const [signingUp, setSigningUp] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setSigningUp(true);
    if (form.password !== form.confirmPassword) {
      setError({ message: "Passwords do not match", errors: [] });
      setSigningUp(false);
      return;
    }
    dispatch(signup(form)).catch((error) =>
      error.json().then((err) => {
        setError(err);
        setSigningUp(false);
      })
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-green-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-green-900">
          Marci Forms
        </h2>
        <p className="mt-2 text-center text-2xl font-semibold leading-9 text-green-600">
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
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                disabled={signingUp}
                value={form.firstName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstName:
                      e.target.value.length !== 0
                        ? e.target.value[0]?.toUpperCase() +
                          e.target.value?.slice(1).toLowerCase()
                        : "",
                  })
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                disabled={signingUp}
                value={form.lastName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastName:
                      e.target.value.length !== 0
                        ? e.target.value[0]?.toUpperCase() +
                          e.target.value?.slice(1).toLowerCase()
                        : "",
                  })
                }
              />
            </div>
          </div>

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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                disabled={signingUp}
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                disabled={signingUp}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                disabled={signingUp}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              disabled={signingUp}
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold leading-6 text-green-600 hover:text-green-500"
            disabled={signingUp}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
