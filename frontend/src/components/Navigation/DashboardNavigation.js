import { useLocation, Link } from "react-router-dom";
import {
  DocumentTextIcon,
  HomeIcon,
  UsersIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import DashboardHome from "../Dashboard/DashboardHome";
import DashboardForms from "../Dashboard/Forms";
import CreateForm from "../Dashboard/Forms/Create";
import Users from "../Dashboard/Users";

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    page: <DashboardHome />,
  },
  {
    name: "Forms",
    href: "/dashboard/forms",
    icon: DocumentTextIcon,
    page: <DashboardForms />,
  },
  {
    name: "Create",
    href: "/dashboard/forms/create",
    icon: DocumentPlusIcon,
    page: <CreateForm />,
  },
  { name: "Users", href: "/dashboard/users", icon: UsersIcon, page: <Users /> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardNavigation() {
  const { pathname } = useLocation();

  if (!pathname.includes("dashboard")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 md:top-0 md:left-0 h-16 md:h-full w-full md:w-16 bg-green-800 z-40 flex items-center md:items-start shadow-[rgba(0,0,15,0.5)_0px_-2px_10px_0px] md:shadow-[rgba(0,0,15,0.5)_2px_0px_8px_0px]">
      <ul className="flex flex-row md:flex-col justify-evenly items-center md:space-y-4 md:pt-20 w-full">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={classNames(
                pathname === item.href
                  ? "bg-green-800 text-white"
                  : "text-green-400 hover:text-white hover:bg-green-800",
                "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
              )}
            >
              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              <span className="sr-only">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
