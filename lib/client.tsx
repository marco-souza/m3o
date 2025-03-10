import { IS_BROWSER } from "fresh/runtime";
import { useEffect, useState } from "preact/hooks";
import { VNode } from "preact";

export type ClientSideProps = {
  children: VNode;
  fallback?: VNode;
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
