import React from "react";
import type { FormHeaderState } from "../../types/Component";
import { useAppDispatch } from "../../hooks/reduxHooks";

const FormHeader: React.FC<FormHeaderState> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-700 px-6 py-3 flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">{props.heading}</h2>
      <i
        className="font-bold fa fa-close text-white hover:text-gray-400"
        onClick={() => dispatch(props.thunk())}
      />
    </div>
  );
};

export default FormHeader;
