import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ModalRegistration({ titulo, onClose, link }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const abrirModal = {
    transform: showModal
      ? "scale(1) translateY(0)"
      : "scale(0) translateY(644px) translateX(744px)",
    transition: "transform 0.5s",
  };

  return (
    <div className="fixed  w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-700 opacity-50 overflow-y-hidden"></div>
      <div className="flex bg-primary w-[44%] rounded z-50 transition-transform duration-500 ">
        <div className="flex flex-col py-4 px-6 w-full gap-2">
          <div className="flex justify-center items-center">
            <div className="flex text-xl font-bold text-white">
              <span>{titulo}</span>
            </div>
          </div>

          <Link to={link} className="flex justify-center pb-4 pt-10">
            <button
              onClick={onClose}
              className="flex justify-center items-center h-8 w-[20%] bg-green-600 text-white font-bold rounded-md"
            >
              OK
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ModalRegistration;
