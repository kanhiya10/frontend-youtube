// utils/lazyImport.ts
import { lazy } from "react";

export function lazyImport<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(factory);
}

// for named exports
export function lazyNamedImport<T extends React.ComponentType<any>>(
  factory: () => Promise<any>,
  name: string
) {
  return lazy(() => factory().then((module) => ({ default: module[name] })));
}
