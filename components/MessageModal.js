"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function MessageModal({ isOpen, closeModal }) {
  const [email, setEmail] = useState("");

  const router = useRouter();

  function sendMessage() {
    if (email === "") toast.error("Please input email!");
    else {
      axios
        .post("/api/chat/conversation", { email })
        .then(function (response) {
          if (response.status === 200) router.refresh();
        })
        .catch(function (error) {
          if (error.response.status === 404) toast.error(error.response.data);
        })
        .finally(function () {
          closeModal();
          setEmail("");
        });
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                      <div className="font-bold text-gray-800 dark:text-white text-xl">
                        Message
                      </div>
                      <IoMdClose
                        size={25}
                        className="cursor-pointer"
                        onClick={closeModal}
                      />
                    </div>
                    <div className="p-4 overflow-y-auto">
                      <label
                        htmlFor="input-label"
                        className="block text-sm font-medium mb-2 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        id="input-label"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder="johndoe@gmail.com"
                        autofocus=""
                      />
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                      <button
                        type="button"
                        className=" py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        onClick={sendMessage}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
