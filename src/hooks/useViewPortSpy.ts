/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
// Copied from https://github.com/antonioru/beautiful-react-hooks/blob/master/src/useViewportSpy.ts
// Supressing the errorMessage as it is annoying

import { RefObject, useLayoutEffect, useState } from 'react'
import isClient from 'beautiful-react-hooks/shared/isClient';
import isApiSupported from 'beautiful-react-hooks/shared/isAPISupported'

const defaultOptions: IntersectionObserverInit = {
  rootMargin: '0px',
  threshold: 0,
}

const errorMessage = 'IntersectionObserver is not supported, this could happen both because'
  + ' window.IntersectionObserver is not supported by'
  + ' your current browser or you\'re using the useViewportSpy hook whilst server side rendering.'
  + ' This message is displayed only in development mode'

/**
 * Uses the IntersectionObserverMock API to tell whether the given DOM Element (from useRef) is visible within the
 * viewport.
 */
const useViewportSpy = <T extends HTMLElement>(elementRef: RefObject<T>, options: IntersectionObserverInit = defaultOptions) => {
  if (!isClient || !isApiSupported('IntersectionObserver')) {
    return null
  }

  const [isVisible, setIsVisible] = useState<boolean>()

  useLayoutEffect(() => {
    const observer = new window.IntersectionObserver((entries) => entries.forEach((item) => {
      const nextValue = item.isIntersecting
      setIsVisible(nextValue)
    }), options)

    // @ts-ignore
    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [elementRef])

  return isVisible
}

export default useViewportSpy;
