import React, { useState } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAwardModalState, getUser } from "../../redux/selectors";
import { toggleAward, warn } from "../../redux/modalSlice";
import { addAward } from "../../api/userAPIs";

const AwardModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const openState = useAppSelector(getAwardModalState);
  const user = useAppSelector(getUser);

  const [award, setAward] = useState<string>("Select Award");
  const [confirm, setConfirm] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const close = () => {
    setAward("Select Award");
    setOpen(false);
    setConfirm(false);
    dispatch(toggleAward());
  };

  const onSubmit = () => {
    if (award === "Select Award") {
      dispatch(warn("Please select an award first!"))
      return;
    }

    if (!confirm) {
      dispatch(warn("Are you sure you deserve this award (。_。)"))
      setConfirm(true);
      return;
    }

    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" }).toLowerCase();
    const year = String(now.getFullYear());

    addAward({
      month,
      year,
      award,
      user: user.user
    }, user.user, dispatch);

    close();
  }

  return (
    <Modal
      className="z-20 fixed h-auto w-[50%] left-1/2 right-1/2 transform -translate-x-1/2 top-1/4 shadow-2xl rounded-2xl overflow-auto bg-white border-2 border-black scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
        },
      }}
      isOpen={openState}
      onRequestClose={() => close()}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-r bg-yellow-300 px-6 py-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Awards</h2>
        <i
          className="font-bold fa fa-close text-white hover:text-gray-400"
          onClick={() => close()}
        />
      </div>
      <div className="px-6 py-2">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-purple-200"
        >
          <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent">
            {award}
            <i className="fa fa-caret-down ml-3"></i>
          </span>
        </button>
        <div
          className={`${!open ? "h-0" : "h-auto"
            } w-full z-10 bg-cyan-500 divide-y divide-gray-400 rounded-lg shadow-sm overflow-hidden`}
        >
          <ul className="py-1 text-sm font-semibold text-white">
            <li
              onClick={() => {
                setAward("Perfect Calculation Award");
                setOpen(false);
              }}
            >
              <span className="block px-4 py-2 hover:bg-cyan-400">
                Perfect Calculation Award
              </span>
            </li>
            <li
              onClick={() => {
                setAward("Minimal Spending Award");
                setOpen(false);
              }}
            >
              <span className="block px-4 py-2 hover:bg-cyan-400">
                Minimal Spending Award
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-6 mb-4">
        <button onClick={() => onSubmit()} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          I deserve this Award
        </button>
      </div>
    </Modal>
  );
};

export default AwardModal;
