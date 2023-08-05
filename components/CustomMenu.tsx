"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

type Props = {
  setState: (value: string) => void;
  title: string;
  state: string;
  filters: Array<string>;
};

const CustomMenu = ({ title, setState, state, filters }: Props) => {
  return (
    <div className="flex justify-start flex-col gap-7 w-full">
      <label htmlFor={title}>{title}</label>
      <Menu as="div" className="self-start relative">
        <Menu.Button className="flex items-center p-4 gap-4 text-base w-full capitalize outline-none rounded-md bg-light-white-100">
          {state || "category"}
          <Image src="/arrow-down.svg" alt="arrow" width={10} height={5} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="flex flex-col absolute xs:min-w-[300px] w-fit max-h-64  left-0 items-center justify-start bg-white shadow-menu overflow-y-auto border border-nav-border rounded-xl">
            {filters.map((item) => (
              <Menu.Item key={item}>
                <button
                  type="button"
                  className="custom_menu-item"
                  value={item}
                  onClick={(e) => setState(e.currentTarget.value)}
                >
                  {item}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default CustomMenu;
