import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="rounded-full px-4 py-2 text-sm placeholder:text-stone-400  sm:w-64 sm:focus:w-72 transition:width duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
