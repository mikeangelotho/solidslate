import { Plus, Trash } from "lucide-solid";
import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  onMount,
  Setter,
  Show,
} from "solid-js";

export const List = (props: {
  data?: any[];
  canCreate?: boolean;
  canDelete?: boolean;
  showDebug?: boolean;
  signal?: { get: Accessor<any>; set: Setter<any> };
}) => {
  const [canCreate, setCanCreate] = createSignal(props.canCreate || false);
  const [canDelete, setCanDelete] = createSignal(props.canDelete || false);

  const [termList, setTermList] = createSignal<any[]>(
    props.data || ["Oranges", "Orangutans", "Tangerines"],
  );
  const [selectedTerm, setSelectedTerm] = createSignal<string>("");
  const [searchTerm, setSearchTerm] = createSignal<string>("");
  const [showMenu, setShowMenu] = createSignal<boolean>(false);

  function toggleDebug() {
    setCanCreate(!canCreate());
    setCanDelete(!canDelete());
  }

  const casedTermList = createMemo(() => {
    return termList().map((item) => item.toLowerCase());
  });

  const sortedTermList = createMemo(() => {
    return termList().filter((item) => item.includes(searchTerm()));
  });

  let inputElement!: HTMLInputElement;
  let menuElement!: HTMLUListElement;
  let selectElement!: HTMLDivElement;

  function clearAll(options?: { focus: boolean }) {
    setSearchTerm("");
    setSelectedTerm("");
    props.signal?.set("");
    inputElement.value = "";
    if (options?.focus) inputElement.focus();
  }

  onMount(() => {
    createEffect(() => {
      if (showMenu())
        requestAnimationFrame(() => {
          menuElement.classList.add("opacity-100", "translate-y-2");
          if (menuElement.getBoundingClientRect().bottom > window.innerHeight) {
            menuElement.style.top = `${(window.innerHeight - menuElement.getBoundingClientRect().top) * -3.5}px`;
          }
        });
    });

    createEffect(() => {
      if (props.signal?.get().length === 0) {
        clearAll({ focus: false });
      }
    });

    createEffect(() => {
      if (selectedTerm().length > 0) {
        props.signal?.set(selectedTerm());
        inputElement.value = selectedTerm();
        setSearchTerm(selectedTerm());
      }
    });
  });

  return (
    <>
      <Show when={props.showDebug}>
        <div
          class="fixed bottom-4 text-xs text-neutral-500 hover:underline cursor-pointer"
          onClick={() => toggleDebug()}
        >
          {`${canCreate() ? "Disable" : "Enable"} Editing`}
        </div>
      </Show>
      <div
        ref={selectElement}
        class="flex w-full max-w-60 items-center text-sm text-black"
      >
        <div class="w-full flex flex-col relative cursor-pointer">
          <div
            class={`border border-b-2 group hover:border-neutral-500 transition-all duration-300 ease-out flex justify-between items-center rounded-md overflow-hidden ${showMenu() ? "border-neutral-500" : "border-neutral-300"}`}
          >
            <input
              ref={inputElement}
              type="text"
              placeholder="Search list..."
              onFocusIn={() => {
                if (inputElement.value.length > 0)
                  setSearchTerm(inputElement.value);
                setShowMenu(true);
              }}
              onFocusOut={() => {
                setShowMenu(false);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter" && searchTerm().length > 0) {
                  if (termList().includes(searchTerm())) {
                    setSelectedTerm(searchTerm());
                  } else {
                    setTermList([...termList(), searchTerm()]);
                    setSelectedTerm(searchTerm());
                  }
                  inputElement.blur();
                }
                setSearchTerm(inputElement.value);
              }}
              class={`outline-0 px-2 w-full h-full min-h-6 placeholder-neutral-300 ${!showMenu() ? "cursor-pointer" : ""}`}
            />
            <div class="px-2 w-fit min-h-6 aspect-square flex justify-center items-center">
              <Show when={searchTerm().length > 0}>
                <div
                  class="text-neutral-300 text-[8px] hover:text-neutral-500 cursor-pointer transition-all duration-300 ease-out"
                  onClick={() => clearAll()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  ✕
                </div>
              </Show>
            </div>
            <div
              class={`w-8 aspect-square flex items-center justify-center ${showMenu() ? "text-neutral-500 bg-neutral-100" : "text-neutral-300"} select-none hover:bg-neutral-100 group-hover:text-neutral-500 transition-all duration-300 ease-out text-xs`}
              onClick={() => {
                if (!showMenu()) {
                  if (inputElement.value.length > 0) {
                    setSearchTerm("");
                    inputElement.value = "";
                  }
                  setShowMenu(true);
                  inputElement.focus();
                } else {
                  setShowMenu(false);
                }
              }}
            >
              ▼
            </div>
          </div>
          <Show when={showMenu()}>
            <ul
              ref={menuElement}
              class="absolute top-4 p-2 border border-b-2 border-neutral-300 bg-white mt-2 select-none rounded-md overflow-auto w-fit opacity-0 transition-all duration-1000 ease-out"
            >
              <Show
                when={
                  canCreate() &&
                  searchTerm().length > 0 &&
                  !termList().includes(searchTerm())
                }
              >
                <Li class="bg-neutral-100 text-neutral-500 hover:bg-neutral-50">
                  <div
                    class="w-full flex gap-2 items-center pr-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (
                        searchTerm().length > 0 &&
                        !termList().includes(searchTerm())
                      ) {
                        setTermList([...termList(), searchTerm()]);
                        inputElement.blur();
                      }
                    }}
                  >
                    <Plus width={16} height={16} />
                    {`Add ${searchTerm().length > 12 ? `entry` : `"${searchTerm()}"`}`}{" "}
                    to list
                  </div>
                </Li>
              </Show>
              <Show
                when={sortedTermList().length > 0}
                fallback={
                  <div class="text-xs text-neutral-300 p-2">No Items</div>
                }
              >
                <For each={sortedTermList()}>
                  {(item) => {
                    return (
                      <Li class="flex justify-between items-center w-full">
                        <div
                          class="pb-1 w-full pr-2"
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          onClick={() => {
                            setSelectedTerm(item);
                            inputElement.blur();
                            setShowMenu(false);
                          }}
                        >
                          {item}
                        </div>
                        <Show when={canDelete()}>
                          <Trash
                            class="transition-all duration-150 ease-out text-neutral-300 rounded hover:bg-neutral-100 hover:text-neutral-500 p-1.5"
                            width={24}
                            height={24}
                            onMouseDown={(e) => {
                              e.preventDefault();
                            }}
                            onClick={() => {
                              setTermList(
                                termList().filter(
                                  (listItem) => listItem !== item,
                                ),
                              );
                            }}
                          />
                        </Show>
                      </Li>
                    );
                  }}
                </For>
              </Show>
            </ul>
          </Show>
        </div>
      </div>
    </>
  );
};

const Li = (props: {
  children: JSX.Element;
  class?: string;
  onClick?: () => void;
}) => {
  return (
    <li
      class={`rounded hover:bg-neutral-50 px-2 py-1 transition-all duration-150 ease-out ${props.class}`}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
};
