import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";

const columns = [
  { name: "lastName", label: "Last Name" },
  { name: "firstName", label: "First Name" },
  { name: "email", label: "Email" },
  { name: "role", label: "Role" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserTableHead({ query, setQuery }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.name}
            scope="col"
            className={classNames(
              column.name === "email" ? "hidden md:table-cell" : "table-cell",
              "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            )}
          >
            <div className="flex items-center gap-x-2">
              <div
                className="group inline-flex"
                onClick={() => {
                  if (query.sortBy === column.name) {
                    setQuery({
                      ...query,
                      sortBy: column.name,
                      order: query.order === "ASC" ? "DESC" : "ASC",
                    });
                  } else {
                    setQuery({ ...query, sortBy: column.name, order: "ASC" });
                  }
                }}
              >
                {column.label}
                <span
                  className={classNames(
                    query.sortBy === column.name ? "opacity-100" : "opacity-50",
                    "ml-2 flex-none rounded text-gray-400 hover:opacity-100 transition ease-in-out duration-150"
                  )}
                >
                  {query.sortBy !== column.name ? (
                    <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                  ) : query.order === "ASC" ? (
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
