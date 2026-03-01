import {
  ScanBarcode,
  ShoppingBasket,
  ShoppingCart,
  Shovel,
} from "lucide-solid";
import { createSignal, For, onCleanup, onMount } from "solid-js";

interface ProductIF {
  name: string;
  brand: string;
  description: string;
  model: string;
}

export const Shopper = () => {
  const allProducts: ProductIF[] = [
    {
      name: "Air Jordan",
      description:
        "These are shoes. An expensive but comfortable pair of shoes tailored to your foot in every way imaginable. These shoes will cure your pending divorce.",
      brand:
        "https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png",
      model:
        "https://png.pngtree.com/png-vector/20250223/ourmid/pngtree-sneakers-air-jordan-shoe-nike-max-white-orange-png-image_15573180.png",
    },
    {
      name: "Air Force One",
      description: "fsff",
      brand:
        "https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png",
      model:
        "https://png.pngtree.com/png-vector/20250223/ourmid/pngtree-sneakers-air-jordan-shoe-nike-max-white-orange-png-image_15573180.png",
    },
    {
      name: "3",
      description: "aaadddfs",
      brand:
        "https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo-1971-now.png",
      model:
        "https://png.pngtree.com/png-vector/20250223/ourmid/pngtree-sneakers-air-jordan-shoe-nike-max-white-orange-png-image_15573180.png",
    },
  ];
  const [focusProduct, setFocusProduct] = createSignal<ProductIF>(
    allProducts[0],
  );

  let productTitle!: HTMLDivElement;

  const handleMouseMove = (e: MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const mouseX = e.clientX - centerX;
    const rotateY = (mouseX / centerX) * 5;
    productTitle.classList.add("transition-all", "duration-300", "ease-out");
    productTitle.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
  };

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);

    onCleanup(() => {
      window.removeEventListener("mousemove", handleMouseMove);
    });
  });

  return (
    <div class="w-full flex flex-col gap-6 h-screen pb-8">
      <div class="px-6 max-w-7xl mx-auto w-full flex gap-6 flex-col h-full">
        <section class="w-full relative h-full border-b flex items-center justify-center">
          <div class="flex flex-col gap-2 w-full py-2 absolute bottom-0 left-0 bg-linear-to-t from-white from-40% lg:from-50%">
            <h1
              ref={productTitle}
              data-title={focusProduct().name}
              class="before:content-[attr(data-title)] before:absolute before:translate-y-1 before:-translate-x-1.5 before:text-neutral-100 before:-z-10 text-black w-fit font-bold text-7xl lg:text-[144px] lg:leading-34 transform-3d tracking-tighter"
            >
              {focusProduct().name}
            </h1>
            <div class="w-full flex justify-between items-center">
              <div class="flex gap-6 text-xs items-center">
                <div class="flex items-center gap-2">
                  <label>Sizes:</label>
                  <ul>
                    <li class="border border-black bg-neutral-100 px-2 pt-px pb-0.5 rounded tracking-tighter">
                      16
                    </li>
                  </ul>
                </div>
                <div class="flex items-center gap-2">
                  <label>Colors:</label>
                  <div class="border bg-amber-300 w-6 rounded-full aspect-square"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-black absolute top-0 left-0 w-fit">
            <img width={36} height={36} src={focusProduct().brand} />
          </div>
          <img class="transform-3d -z-1" src={focusProduct().model} />
        </section>
        <section class="w-full flex gap-6 justify-between items-start py-2 text-sm">
          <div>{focusProduct().description}</div>
          <div class="flex flex-col items-end gap-2">
            <button class="whitespace-nowrap border rounded-md border-black hover:bg-transparent hover:text-black transition-all duration-150 ease-out cursor-pointer bg-black text-white px-4 py-2 tracking-tight font-bold flex gap-2 items-center">
              <ShoppingCart width={16} height={16} /> Add to Cart
            </button>
            <div class="lg:text-lg font-bold tracking-tighter">$129.99</div>
          </div>
        </section>
        <section class="flex gap-2 justify-start w-full p-2">
          <For each={allProducts}>
            {(product) => {
              return (
                <div
                  class="before:content-[''] before:w-full before:absolute before:max-w-36 before:aspect-square before:bg-neutral-100 before:-z-10 before:translate-y-1 before:-translate-x-1.5 before:-translate-z-px bg-white w-full max-w-36 relative transform-3d aspect-square border hover:-translate-y-4 transition-all duration-150 ease-out flex items-center justify-center cursor-pointer rounded-md before:rounded-md"
                  onClick={() => setFocusProduct(product)}
                >
                  <img src={product.model} />
                </div>
              );
            }}
          </For>
        </section>
      </div>
    </div>
  );
};

export default Shopper;
