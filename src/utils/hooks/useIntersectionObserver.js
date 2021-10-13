import { useState, useEffect } from 'react';

const defaultOption = {
  root: null,
  rootMargin: '1px',
  threshold: 0,
};

const useIntersectionObserver = ({
  onIntersect,
  targetElement,
  options = defaultOption,
  changeDetection,
}) => {
  const [target, setTarget] = useState(targetElement);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    }, options);

    if (target) observer.observe(target.current);

    return () => observer?.disconnect();
  }, [onIntersect, target, options, changeDetection]);

  return [target, setTarget];
};

export default useIntersectionObserver;
