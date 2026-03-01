import { Menu } from "lucide-solid";
import {
  createEffect,
  createSignal,
  For,
  JSXElement,
  Match,
  Show,
  Switch,
} from "solid-js";
import { ComponentInfo, Components } from "~/components/Components";
import { List } from "~/components/List";

export default function Home() {
  const [allComponents, setAllComponents] =
    createSignal<ComponentInfo[]>(Components());
  const [displayedComponent, setDisplayedComponent] = createSignal("");
  const [menuIsHidden, setMenuIsHidden] = createSignal(true);

  return (
    <main class="flex flex-col gap-18 w-full items-center justify-center">
      <Show
        when={!menuIsHidden()}
        fallback={
          <div
            class="fixed bottom-0 left-0 z-10 backdrop-blur bg-white text-neutral-300 hover:text-neutral-500 border-neutral-300 hover:border-neutral-500 m-2 border border-b-2 p-2 rounded flex flex-col gap-3 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setMenuIsHidden(false)}
          >
            <Menu width={16} height={16} />
          </div>
        }
      >
        <div class="fixed bottom-0 left-0 z-10 backdrop-blur bg-white border-neutral-300 m-2 border border-b-2 p-2 rounded flex flex-col gap-3 transition-all duration-300 ease-out">
          <h1 class="text-2xl font-bold">Components</h1>
          <List
            data={allComponents().map((item) => item.name)}
            signal={{ get: displayedComponent, set: setDisplayedComponent }}
          />
          <ul class="w-full flex gap-2 items-center text-xs text-neutral-300">
            <li
              class="hover:text-neutral-500 transition-all duration-300 ease-out cursor-pointer w-fit"
              onClick={() => setDisplayedComponent("")}
            >
              Clear
            </li>
            <li
              class="hover:text-neutral-500 transition-all duration-300 ease-out cursor-pointer w-fit"
              onClick={() => setMenuIsHidden(true)}
            >
              Hide
            </li>
          </ul>
        </div>
      </Show>

      <section class="p-6 w-full flex h-screen justify-center items-center relative text-xs text-neutral-300">
        <Show
          when={displayedComponent().length > 0}
          fallback={"No component selected."}
        >
          <For each={allComponents()}>
            {(compInfo) => {
              if (compInfo.name === displayedComponent()) {
                let componentData;
                switch (compInfo.name) {
                  case "List":
                    componentData = ["t", "sooo"];
                    break;
                  default:
                    componentData = null;
                }
                return (
                  <compInfo.component showDebug={true} data={componentData} />
                );
              }
            }}
          </For>
        </Show>
      </section>
    </main>
  );
}
