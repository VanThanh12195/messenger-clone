"use client"
import { MdOutlineOpenInNew } from "react-icons/md";
import MessageModal from "./MessageModal";
import { useState } from "react";

export default function NewMessageButton() {

 const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
        <div
            className=" bg-gray-200 p-2 rounded-full hover:bg-gray-300 hover:cursor-pointer transition duration-300"
            onClick={openModal}
          >
            <MdOutlineOpenInNew size={20} />
          </div>
          <MessageModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}
