import { useRef, useEffect } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useEventListener = (eventName, handler, element = global) => {
  const savedHandler = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useIsomorphicLayoutEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
