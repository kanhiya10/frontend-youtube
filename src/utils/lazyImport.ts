import { lazy } from 'react';

export const lazyImport = (factory) => {
  return lazy(factory);
};
