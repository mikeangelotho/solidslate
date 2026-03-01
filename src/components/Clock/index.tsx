import { Settings } from "lucide-solid";
import { createSignal } from "solid-js";

export const Clock = () => {
  const [showSettings, setShowSettings] = createSignal(false);

  return (
    <section class="w-full border border-neutral-800 p-2 flex flex-col gap-2 text-sm">
      <div class="flex gap-2 justify-between items-center">
        <div class="w-full p-2 flex flex-col gap-2 justify-center items-center">
          <div class="w-full flex justify-center items-center uppercase text-xs tracking-widest">
            Title
          </div>
          <div class="w-full flex justify-center items-center">
            <div class="w-full max-w-36 aspect-square rounded-full border"></div>
          </div>
          <div class="w-full flex justify-center items-center text-3xl font-bold font-mono">
            12:20PM
          </div>
        </div>
        <div class="w-full p-2 flex flex-col gap-2 justify-center items-center">
          <div class="w-full flex justify-center items-center uppercase text-xs tracking-widest">
            Title
          </div>
          <div class="w-full flex justify-center items-center">
            <div class="w-full max-w-36 aspect-square rounded-full border"></div>
          </div>
          <div class="w-full flex justify-center items-center text-3xl font-bold font-mono">
            12:20PM
          </div>
        </div>
        <div class="w-full p-2 flex flex-col gap-2 justify-center items-center">
          <div class="w-full flex justify-center items-center uppercase text-xs tracking-widest">
            Title
          </div>
          <div class="w-full flex justify-center items-center">
            <div class="w-full max-w-36 aspect-square rounded-full border"></div>
          </div>
          <div class="w-full flex justify-center items-center text-3xl font-bold font-mono">
            12:20PM
          </div>
        </div>
      </div>
      <div class="w-full border border-neutral-800 p-2 flex justify-between">
        <div class="text-xs px-2 pb-px hover:bg-slate-800 hover:text-slate-500 rounded-md cursor-pointer border">
          mikroclock
        </div>
        <div>
          <div
            class={`p-1 hover:bg-neutral-800 hover:text-neutral-500 rounded-md cursor-pointer border ${showSettings() ? " border-b border-neutral-500 text-neutral-500 bg-neutral-800 mb-0.5 translate-y-0.5" : "border-b-3"}`}
            onClick={() => setShowSettings(!showSettings())}
          >
            <Settings
              class={`${showSettings() ? "" : ""}`}
              height={16}
              width={16}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
