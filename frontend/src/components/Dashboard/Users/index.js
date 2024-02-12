import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUserRole } from "../../../store/users";
import UserTableHead from "./UserTableHead";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import UsersButton from "./UsersButton";

export default function Users() {
  const dispatch = useDispatch();
  const { users, count } = useSelector((state) => state.users.users);
  const [changingRole, setChangingRole] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    sortBy: "lastName",
    order: "ASC",
    limit: 10,
    page: 1,
    search: "",
  });

  useEffect(() => {
    if (changingRole) return;
    const searchParams = new URLSearchParams(query).toString();

    dispatch(getUsers(searchParams));
  }, [dispatch, query, changingRole]);

  function handleRoleChange(role, id) {
    setChangingRole(true);
    dispatch(updateUserRole(role, id)).then(() => setChangingRole(false));
  }

  return (
    <div className="px-4">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setQuery({ ...query, search: search });
              }}
              className="flex items-center border border-r-0 border-gray-500 rounded-md opacity-40 focus-within:opacity-100 relative w-full max-w-xl mb-4"
            >
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 focus:ring-0 sm:text-sm"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="border border-y-0 rounded-r-md border-gray-500 px-4 py-1 bg-gray-100">
                Search
              </button>
            </form>
            <table className="min-w-full divide-y divide-gray-300">
              <UserTableHead query={query} setQuery={setQuery} />
              <tbody className="divide-y divide-gray-200 bg-white">
                {users?.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.lastName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {user.firstName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500 hidden md:table-cell">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      <select
                        id="location"
                        name="location"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
                        value={user.role}
                        disabled={changingRole}
                        onChange={(e) =>
                          handleRoleChange(e.target.value, user.id)
                        }
                      >
                        <option>user</option>
                        <option>admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {1 + (query.limit * query.page - query.limit)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {query.page === Math.ceil(count / query.limit)
                ? count
                : 10 + (query.limit * query.page - 10)}
            </span>{" "}
            of <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end items-center">
          <p className="text-sm text-gray-700 hidden lg:block">
            Results per page:
            <span className="ml-3 mr-5 relative inline-block text-left">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
                value={query.limit}
                onChange={(e) => setQuery({ ...query, limit: e.target.value })}
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </span>
          </p>
          <UsersButton
            onClick={() => setQuery({ ...query, page: 1 })}
            disabled={query.page === 1}
          >
            First
          </UsersButton>
          <UsersButton
            onClick={() => setQuery({ ...query, page: query.page - 1 })}
            disabled={query.page === 1}
          >
            Previous
          </UsersButton>
          <UsersButton
            onClick={() => setQuery({ ...query, page: query.page + 1 })}
            disabled={query.page === Math.ceil(count / query.limit)}
          >
            Next
          </UsersButton>
          <UsersButton
            onClick={() =>
              setQuery({ ...query, page: Math.ceil(count / query.limit) })
            }
            disabled={query.page === Math.ceil(count / query.limit)}
          >
            Last
          </UsersButton>
        </div>
      </nav>
    </div>
  );
}
