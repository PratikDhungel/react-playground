import axios from 'axios';
import { useRef } from 'react';
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

const InfiniteScrolling = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  let bookData: any;

  const { data, loading, hasMoreData } = useBookSearch(query, pageNumber);
  console.log(hasMoreData);
  bookData = data;

  const observer = useRef<any>();

  const lastElementRef = useCallback(
    (node) => {
      console.log(node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          console.log('Intersecting');
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMoreData]
  );

  const handleBookSearch = useCallback((text: any) => {
    console.log(text);
    setQuery(text);
  }, []);

  const debouncedSearch = useCallback(debounce(handleBookSearch, 1000), []);

  return (
    <div style={{ paddingLeft: '10px' }}>
      <h1>Infinite Scrolling</h1>
      <input
        type='text'
        // value={query}
        onChange={(e) => {
          e.persist();
          debouncedSearch(e.target.value);
        }}
      />
      {bookData?.map((book: any, index: any) => {
        if (bookData.length === index + 1) {
          return (
            <div ref={lastElementRef} key={index}>
              {book}
            </div>
          );
        }
        return <div key={index}>{book}</div>;
      })}
      {loading && <div>LOADING...</div>}
    </div>
  );
};

const useBookSearch = (query: any, pageNumber: any) => {
  const [data, setData] = useState<any>([]);
  const [hasMoreData, setHasMoreData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const apiUrl = `https://openlibrary.org/search.json?q=${query}&page=${pageNumber}&limit=40`;

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response.data.docs);
        const bookData = response.data.docs;
        const filteredData = bookData.map((book: any) => book.title);
        setData((prevData: any) => [...prevData, ...filteredData]);
        setHasMoreData(response.data.docs.length > 0);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [query, pageNumber, apiUrl]);

  return { data, loading, hasMoreData };
};

export default InfiniteScrolling;
