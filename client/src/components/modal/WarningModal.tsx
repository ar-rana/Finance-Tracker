import React from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getWarningModalState } from "../../redux/selectors";
import { closeWarn } from "../../redux/modalSlice";

const WarningModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { warningOpen, warning } = useAppSelector(getWarningModalState);

  return (
    <Modal
      className="z-101 fixed w-[30%] left-1/2 right-1/2 top-1/3 transform -translate-x-1/2 shadow-2xl rounded-2xl overflow-auto bg-white border-2 border-black scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
        },
      }}
      isOpen={warningOpen}
      onRequestClose={() => {}}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-r bg-red-400 px-6 py-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Warning</h2>
        <i
          className="font-bold fa fa-close text-white hover:text-gray-400"
          onClick={() => dispatch(closeWarn())}
        />
      </div>
      <div className="font-semibold text-sm p-2">
        <span>{warning}</span>
      </div>
    </Modal>
  );
};

export default WarningModal;
