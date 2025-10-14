import React from "react";
import Modal from "react-modal";
import type { WarningState } from "../../types/Component";

const WarningModal: React.FC<WarningState> = (props) => {
  if (!props.open) return null;
  return (
    <Modal
      className="z-101 fixed w-[30%] left-1/2 right-1/2 top-1/3 transform -translate-x-1/2 shadow-2xl rounded-2xl overflow-auto bg-white border-2 border-black scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
        },
      }}
      isOpen={props.open}
      onRequestClose={() => {
        props.setWarning("");
        props.setOpen(false)
      }}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-r bg-red-400 px-6 py-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Warning</h2>
        <i
          className="font-bold fa fa-close text-white hover:text-gray-400"
          onClick={() => {
            props.setWarning("");
            props.setOpen((prev) => !prev)
          }}
        />
      </div>
      <div className="font-semibold text-sm p-2">
        <span>{props.warning}</span>
      </div>
    </Modal>
  );
};

export default WarningModal;
