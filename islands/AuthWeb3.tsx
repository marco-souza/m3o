import { metamask } from "#/lib/ethers.ts";
import { IS_BROWSER } from "fresh/runtime";
import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";

export default function AuthWeb3() {
  const [account] = useAccounts();

  if (!metamask.isMetaMaskInstalled) {
    return <p class="text-red-500">Please install MetaMask</p>;
  }

  if (!account) {
    return (
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={metamask.requestAccounts}
      >
        Authorize with MetaMask
      </button>
    );
  }

  return (
    <div class="flex gap-8 py-6">
      Authorize with MetaMask {account}
    </div>
  );
}

function useAccounts() {
  const [accounts, setAcconts] = useState([]);

  useEffect(() => {
    metamask.getAccounts().then((acc) => {
      console.log({ acc });
      setAcconts(acc as any as string[]);
    });
  }, []);

  return accounts;
}

export function ClientSide({ children }: { children: FunctionalComponent }) {
  const [isBrowser, setIsBrowser] = useState(IS_BROWSER);

  useEffect(() => {
    setIsBrowser(IS_BROWSER);
  }, []);

  return isBrowser ? children : null;
}
