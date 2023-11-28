import { GrFormClose } from "react-icons/gr";

function ModalJuca({ showModal, title, children, onClose }) {
  return (
    <>
      {showModal ? (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full">
          <div className="fixed top-0 left-0 z-[999] w-full h-full bg-gray-700 opacity-50"></div>
          <div className="flex flex-col gap-4 p-4 rounded-lg bg-white z-[1000] min-w-[120px]">
            <div className="flex justify-between items-center text-gray-700 font-semibold border-b border-gray-300 py-2">
              <h3 className="text-lg">{title}</h3>
              <button type="button" onClick={onClose}>
                <GrFormClose className="w-6 h-6" />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ModalJuca;
