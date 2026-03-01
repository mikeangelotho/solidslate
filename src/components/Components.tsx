import { Shopper } from "~/routes/shopper";
import { Chat } from "./Chat";
import { Clock } from "./Clock";
import { List } from "./List";
import { JSXElement } from "solid-js";

export interface ComponentInfo {
  name: string;
  component: (props: any) => JSXElement;
}

export const Components = (): ComponentInfo[] => {
  return [
    { name: "Chat", component: Chat },
    { name: "Clock", component: Clock },
    { name: "Shopper", component: Shopper },
    { name: "List", component: List },
  ];
};
