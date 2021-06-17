import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const debounce = (fn: any, delay: any) => {
  let timer: any;

  return (...args: any) => {
    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

function InfiniteScrolling() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  console.log('Re-render');
  // const { data } = useBookSearch('Lord of the Rings', 1);
  // console.log('Data', data);

  console.log('Query', query);

  const handleBookSearch = (text: any) => {
    // console.log('Value', e.target.value);
    // console.log(e);

    setQuery(text);
    // Api call
  };

  const debouncedSearch = useCallback(debounce(handleBookSearch, 1000), []);

  return (
    <div>
      <h1>Infinite Scrolling</h1>
      <input
        type='text'
        value={query}
        onChange={(e) => {
          e.persist();
          // console.log(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />
      {/* <input type='text' value={query} onChange={handleBookSearch} /> */}
    </div>
  );
}

const useBookSearch = (query: any, pageNumber: any) => {
  const [data, setData] = useState();

  console.log('Called usebooksearch');
  const apiUrl = `https://openlibrary.org/search.json?q=${query}&page=${pageNumber}&limit=10`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response.data.docs);
        const bookData = response.data.docs;
        const filteredData = bookData.map((book: any) => book.title);
        setData(filteredData);
      })
      .catch((error) => console.log(error));
  }, [query, pageNumber, apiUrl]);

  return { data };
};

export default InfiniteScrolling;
