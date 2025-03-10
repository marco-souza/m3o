import { IS_BROWSER } from "fresh/runtime";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

export type ClientSideProps = {
  children: FunctionalComponent;
  fallback?: FunctionalComponent;
};

export function useEffectOnce(cb: () => void) {
  return useEffect(cb, []);
}

export function ClientSide({ children, fallback }: ClientSideProps) {
  const [isBrowser, setIsBrowser] = useState(IS_BROWSER);

  useEffectOnce(() => {
    setIsBrowser(IS_BROWSER);
  });

  return isBrowser ? children : fallback;
}
