import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import lazyWithRetry from "./LazyWithRetry";

const LazyLoader = (
  Page: () => Promise<{ default: React.ComponentType }>,
  Fallback?: React.FC,
) => {
  const LazyPage = lazyWithRetry(Page);

  return function Lazied<T extends object>(props: T) {
    return (
      <ErrorBoundary>
        <Suspense fallback={Fallback ? <Fallback /> : null}>
          <LazyPage {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
};

export default LazyLoader;
