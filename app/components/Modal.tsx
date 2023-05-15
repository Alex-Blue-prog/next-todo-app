interface OpenModalProps {
    openModal: boolean,
    setOpenModal: (value: boolean) => void,
    children: React.ReactNode
}

const Modal = ({openModal, setOpenModal, children}:OpenModalProps) => {

  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
        <div className="modal-box relative text-slate-200">
            <label onClick={() => setOpenModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            {children}
        </div>
    </div>
  )
}

export default Modal