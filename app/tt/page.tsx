"use client"
import React, { useState, useEffect } from 'react';

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = () => {
    setLoading(true);
    // 模拟异步加载数据
    setTimeout(() => {
      const newItems = Array.from({ length: 30}, (_, index) => (page-1) * 10 + index + 1);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
      setPage(page + 1);
    }, 1000);
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handleScroll = () => {
    console.log('scroll',window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight);
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight
    ) {
      if (!loading) {
        loadMore();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;