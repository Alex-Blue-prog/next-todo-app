"use client";

import { useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash } from "react-icons/fi";
import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask
}

const Task = ({task}:TaskProps) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [editTaskValue, setEditTaskValue] = useState<string>(task.text);

  // edit modal
  const handleSubmitEditTodo:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodo(task.id, editTaskValue);

    setOpenModalEdit(false);
    router.refresh();
  }

  // delete modal 
  const handleDeleteTodo = async () => {

    await deleteTodo(task.id);

    setOpenModalDeleted(false);
    router.refresh();
  }

  return (
    <tr>
        <th className="w-full">{task.text}</th>
        <th className="flex gap-5">
          <FiEdit onClick={()=> setOpenModalEdit(true)} className="text-blue-500 cursor-pointer" size={25} /> 
          <Modal openModal={openModalEdit} setOpenModal={setOpenModalEdit}>

            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg">Edit task</h3>
              <div className="modal-action">
                <input name="todo" value={editTaskValue} onChange={e => setEditTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                <button type="submit" className="btn">Submit</button>
              </div>
            </form>

          </Modal>

          <FiTrash onClick={() => setOpenModalDeleted(true)} className="text-red-500 cursor-pointer" size={25} />
          <Modal openModal={openModalDeleted} setOpenModal={setOpenModalDeleted}>

            <h3 className="font-bold text-lg">Are you sure, you want to delete this task ? </h3>
            <div className="modal-action">
              <button onClick={handleDeleteTodo} className="btn">Yes</button>
            </div>

          </Modal>
        </th>
    </tr>
  )
}

export default Task