import React, { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Loading from './Loading';

interface InfiniteScrollProps {
  load: () => void;
  hasMore: boolean;
  endMessage?: React.ReactNode;
  children?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ children, load, hasMore, endMessage = 'No more data' }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    entries => {
      if (entries[0].isIntersecting && hasMore) {
        load();
      }
    },
    [load, hasMore],
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    });

    if (observedRef.current) {
      observerRef.current.observe(observedRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect]);

  useEffect(() => {
    if (observerRef.current && observedRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(observedRef.current);
    }
  }, [hasMore]);

  return (
    <div>
      {children}
      <Observed ref={observedRef}>{hasMore ? <Loading /> : endMessage}</Observed>
    </div>
  );
};

const Observed = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export default InfiniteScroll;
