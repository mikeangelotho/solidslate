import { SendHorizontal, Settings } from "lucide-solid";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";

interface ChatMessage {
  userColor: string;
  username: string;
  message: string;
  time: string;
}

export const Mikrochat = () => {
  let messagesWindow!: HTMLDivElement;
  let chatInput!: HTMLInputElement;
  let usernameInput!: HTMLInputElement;
  const [username, setUsername] = createSignal<string>("");
  const [isHidden, setIsHidden] = createSignal(false);
  const [autoScroll, setAutoScroll] = createSignal(true);
  const [showSettings, setShowSettings] = createSignal(false);
  const [scrollTop, setScrollTop] = createSignal(0);
  const [chatStore, setChatStore] = createStore<any>({
    title: "mikrochat",
    userCount: 0,
    messageCount: 0,
    messages: [],
  });

  createEffect(() => {
    if (chatStore.messageCount > 0) {
      if (messagesWindow && autoScroll()) {
        messagesWindow.scrollBy(0, messagesWindow.clientHeight);
        setScrollTop(0);
        setTimeout(() => setAutoScroll(true), 50);
      }
      console.log(chatStore);
    }
  });

  const handleChatScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!scrollTop()) {
      setScrollTop(target.scrollTop);
      setAutoScroll(false);
    } else if (target.scrollTop >= scrollTop()) {
      setScrollTop(0);
      setAutoScroll(true);
    }
  };

  const handleSendMessage = (e: Event) => {
    if (chatInput.value.length === 0) return;
    const date = new Date();
    const time = `${date.toLocaleTimeString()}`;
    const message: ChatMessage = {
      userColor: "red",
      username: username() || "",
      message: chatInput.value,
      time: time,
    };
    setChatStore({
      messages: [...chatStore.messages, message],
      messageCount: chatStore.messages.length + 1,
    });
    chatInput.value = "";
  };

  onMount(() => {
    if (!localStorage.getItem("mikrochatUsername")) {
      const anonUsername = `anon${Math.round(Math.random() * 100000)}`;
      localStorage.setItem("mikrochatUsername", anonUsername);
    }
    setUsername(localStorage.getItem("mikrochatUsername") as string);
    if (localStorage.getItem("mikrochatLog")) {
      setChatStore(localStorage.getItem("mikrochatLog"));
    }
  });
  return (
    <section class="border border-slate-700 bg-slate-900 text-slate-700">
      <div
        class="p-2 w-full flex justify-between hover:text-slate-500 hover:bg-slate-800 transition-all duration-200 ease-in-out cursor-pointer select-none"
        onClick={() => setIsHidden(!isHidden())}
      >
        <div class="w-full flex gap-2 justify-start items-center">
          <div class="w-fit text-[6px] animate-pulse">🟢</div>
          <div class="text-xs px-2 pb-px hover:bg-slate-800 hover:text-slate-500 rounded-md cursor-pointer border">
            {chatStore.title}
          </div>
        </div>
        <div class="w-fit flex justify-end text-xs uppercase">
          {isHidden() ? "▼" : "▽"}
        </div>
      </div>
      <Show when={!isHidden()}>
        <div class="relative w-full border-t bg-slate-900">
          <Show when={!autoScroll()}>
            <div
              class="w-8 p-2 aspect-square absolute -bottom-1 left-1/2 flex justify-center items-center text-slate-500 hover:text-slate-300 transition-all duration-300 ease-in-out animate-bounce cursor-pointer"
              onClick={() => setAutoScroll(true)}
            >
              ↓
            </div>
          </Show>
          <div
            ref={messagesWindow}
            class="flex flex-col gap-px border border-slate-700 m-2  bg-slate-800 h-72 overflow-auto text-white font-mono text-sm rounded-md"
            style="scrollbar-width: none;"
            onMouseEnter={(e) => {
              e.target.addEventListener("scroll", handleChatScroll);
            }}
            onMouseLeave={(e) => {
              e.target.removeEventListener("scroll", handleChatScroll);
            }}
          >
            <For each={chatStore.messages}>
              {(chatMessage) => {
                return (
                  <UserChatMessage
                    username={chatMessage.username}
                    userColor={chatMessage.userColor}
                    message={chatMessage.message}
                    time={chatMessage.time}
                  />
                );
              }}
            </For>
          </div>
        </div>
        <div class="flex flex-col gap-2 p-2 border-t">
          <div class="w-full flex items-center gap-2">
            <div
              class={`p-1 hover:bg-slate-800 hover:text-slate-500 rounded-md cursor-pointer border ${showSettings() ? " border-b border-slate-500 text-slate-500 bg-slate-800" : "border-b-3"}`}
              onClick={() => setShowSettings(!showSettings())}
            >
              <Settings height={16} width={16} />
            </div>
            <input
              ref={chatInput}
              class="pt-2 pb-2.5 text-sm px-4 border border-slate-700 hover:border-slate-500 focus:border-slate-100 w-full rounded-md bg-slate-800 hover:bg-slate-700 focus:bg-slate-700 outline-0 text-slate-300 placeholder:text-slate-500 transition-all duration-150 ease-in-out"
              placeholder="Start typing to chat..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e);
                }
              }}
            />
            <button
              class={`px-2 py-1 bg-slate-300 hover:bg-slate-100 text-slate-800 rounded-md cursor-pointer border border-b-3 border-slate-500`}
              onClick={handleSendMessage}
            >
              <SendHorizontal width={16} height={16} />
            </button>
          </div>
          <Show when={showSettings()}>
            <div class="flex items-center gap-2 px-4">
              <label class="text-xs">Username</label>
              <input
                ref={usernameInput}
                class="pt-1 pb-1.5 text-xs px-2 border border-slate-700 hover:border-slate-500 focus:border-slate-100 w-full rounded-md bg-slate-800 hover:bg-slate-700 focus:bg-slate-700 outline-0 text-slate-300 placeholder:text-slate-500 transition-all duration-150 ease-in-out"
                placeholder={username()}
                onKeyPress={(e) => {
                  if (
                    e.key === "Enter" &&
                    (e.target as HTMLInputElement).value
                  ) {
                    localStorage.setItem(
                      "mikrochatUsername",
                      usernameInput.value,
                    );
                    setUsername(
                      localStorage.getItem("mikrochatUsername") as string,
                    );
                  }
                }}
              />
            </div>
          </Show>
        </div>
      </Show>
    </section>
  );
};

const UserChatMessage = (props: {
  username: string;
  userColor?: string;
  message: string;
  time: string;
}) => {
  const userColor = () => {
    switch (props.userColor) {
      default:
      case "green":
        return "text-green-300";
      case "red":
        return "text-red-300";
      case "blue":
        return "text-blue-300";
    }
  };

  return (
    <div class="w-full flex items-start px-2">
      <div class="flex items-center">
        <div class="text-[8px] w-fit mr-2 text-slate-500">{props.time}</div>
        <div class={`font-bold mr-2 ${userColor()}`}>{props.username}:</div>
      </div>
      <div class="wrap-anywhere">{props.message}</div>
    </div>
  );
};
