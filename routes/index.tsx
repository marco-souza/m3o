import { useSignal } from "@preact/signals";
import { define } from "#/utils.ts";
import Counter from "#/islands/Counter.tsx";

import { t } from "#/contants.tsx";
import AuthWeb3, { ClientSide } from "#/islands/AuthWeb3.tsx";

export default define.page(function Home() {
  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto min-h-screen fresh-gradient">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />

        <h1 class="text-4xl font-bold">
          {t.title}
        </h1>
        <p class="my-4">
          {t.heroTitle}
        </p>

        <Counter count={count} />

        <ClientSide>
          <AuthWeb3 />
        </ClientSide>
      </div>
    </div>
  );
});
