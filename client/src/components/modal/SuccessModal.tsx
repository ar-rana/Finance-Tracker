import React, { useEffect } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getSuccessModalState } from "../../redux/selectors";
import { closeSuccess } from "../../redux/modalSlice";

const SuccessModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { successOpen, success } = useAppSelector(getSuccessModalState);

    useEffect(() => {
        if (successOpen) {
            setTimeout(() => {
                dispatch(closeSuccess());
            }, 2500);
        }
    }, [successOpen]);

    return (
        <Modal
            className="z-50 fixed w-[30%] left-1/2 right-1/2 top-1/5 transform -translate-x-1/2 shadow-2xl rounded-2xl overflow-auto bg-white border-2 border-black scrollbar-hide"
            style={{
                overlay: {
                    backgroundColor: "transparent",
                },
            }}
            isOpen={successOpen}
            onRequestClose={() => dispatch(closeSuccess())}
            ariaHideApp={false}
        >
            <div className="bg-gradient-to-r bg-green-400 px-6 py-2 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Success</h2>
                <i
                    className="font-bold fa fa-close text-white hover:text-gray-400"
                    onClick={() => dispatch(closeSuccess())}
                />
            </div>
            <div className="font-semibold text-sm p-2">
                <span>{success}</span>
            </div>
        </Modal>
    );
};

export default SuccessModal;
