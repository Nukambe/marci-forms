export default function UsersButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 enabled:hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
