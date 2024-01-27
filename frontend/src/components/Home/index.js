import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getForms } from "../../store/forms";

export default function HomePage() {
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.forms.forms);

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-16">
      {forms?.map((form) => (
        <li
          key={form.id}
          className="relative flex items-center space-x-3 rounded-lg border border-green-300 bg-green-50 px-6 py-5 shadow-md focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-green-400 hover:bg-green-100"
        >
          <div className="min-w-0 flex-1">
            <Link to={`/forms/${form.id}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-green-900">{form.title}</p>
              <p className="truncate text-sm text-green-600">
                {form.description}
              </p>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
