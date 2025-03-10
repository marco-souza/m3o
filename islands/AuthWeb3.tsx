import { metamask } from "#/lib/ethers.ts";
import { useState } from "preact/hooks";
import { useEffectOnce } from "#/lib/client.tsx";

export default function AuthWeb3() {
  const [account] = useAccounts();

  if (!metamask.isMetaMaskInstalled) {
    return <p class="text-red-500">Please install MetaMask</p>;
  }

  if (!account) {
    return (
      <button
        type="button"
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
  const [accounts, setAcconts] = useState<string[]>([]);

  useEffectOnce(() => {
    metamask.getAccounts().then((acc: string[]) => {
      console.log({ acc });
      setAcconts(acc);
    });
  });

  return accounts;
}
