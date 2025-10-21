import React from "react";
import type { FormButton } from "../../types/Component";

const FormSubmitBtn: React.FC<FormButton> = (props) => {
  return (
    <button
      onClick={props.func}
      className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      Submit
    </button>
  );
};

export default FormSubmitBtn;
