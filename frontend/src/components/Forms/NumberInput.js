export default function NumberInput({ id, question, input }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {question}
      </label>
      <div className="relative mt-2">
        <input
          type={input}
          name={id}
          id={id}
          className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-green-600"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
