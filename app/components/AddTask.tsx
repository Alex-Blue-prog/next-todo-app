"use client";

import Modal from "./Modal";

import { useState, FormEventHandler } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";


export default function AddTask() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    });

    setNewTaskValue("");
    setOpenModal(false);
    router.refresh();
  }

  return (
    <div>
        <button className="btn btn-primary w-full" onClick={() => setOpenModal(true)}>
            Add new task <AiOutlinePlus className="ml-2" size={18} />
        </button>

        <Modal openModal={openModal} setOpenModal={setOpenModal}>

          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Add new task</h3>
            <div className="modal-action">
              <input name="todo" value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>

        </Modal>
    </div>
  )
}