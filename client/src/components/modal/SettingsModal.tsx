import React, { useState } from "react";
import Modal from "react-modal";
import FormSubmitBtn from "../buttons/FormSubmitBtn";
import type { SettingsForm } from "../../types/FormsData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getSettingsModalState } from "../../redux/selectors";
import { toggleSettings } from "../../redux/modalSlice";

const SettingsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const openState = useAppSelector(getSettingsModalState);

  const [settings, setSettings] = useState<SettingsForm>({
    start: "",
    end: "",
    budget: "",
    graphs: ["Bar_Graphs", "Radar_Chart", "Pie_Chart"],
  });

  const handleFormData = (e: any): void => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const graphs = [
    "Bar_Graphs",
    "Radar_Chart",
    "Hollow_Pie_Chart",
    "Pie_Chart",
    "Scatter_Plot",
    "Line_Graph",
    "Budget_Meter",
  ];

  return (
    <Modal
      className="z-101 fixed h-[55%] w-[50%] left-1/2 right-1/2 transform -translate-x-1/2 top-1/5 shadow-2xl rounded-2xl overflow-auto bg-gray-800 border-2 border-white scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
        },
      }}
      isOpen={openState}
      onRequestClose={() => dispatch(toggleSettings())}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-r bg-gray-700 px-6 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Settings</h2>
        <i
          className="font-bold fa fa-close text-white hover:text-gray-400"
          onClick={() => dispatch(toggleSettings())}
        />
      </div>
      <div className="p-4 h-max">
        <form className="space-y-2">
          <div className="mb-6">
            <div>
              <label
                htmlFor="graphs"
                className="block text-sm font-medium text-white mb-2"
              >
                Graph preference
              </label>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 w-full">
                {graphs.map((graph) => (
                  <div className="flex w-full items-center justify-between align-middle bg-gray-600 px-2 rounded-lg">
                    <label
                      htmlFor={graph}
                      className="py-1 px-1 text-sm font-medium text-white w-full cursor-pointer"
                    >
                      {graph}
                    </label>
                    <input
                      id={graph}
                      name={graph}
                      type="checkbox"
                      value={graph}
                      checked={settings.graphs.includes(graph)}
                      onChange={(e: any) => {
                        const checked = e.target.checked;
                        setSettings((prev) => ({
                          ...prev,
                          graphs: checked
                            ? [...prev.graphs, graph]
                            : prev.graphs.filter((g) => g !== graph),
                        }));
                      }}
                      onSelect={handleFormData}
                      className="w-4 h-4 text-white bg-gray-600 border-gray-300 rounded-md focus:ring-blue-400 focus:ring-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center gap-4">
            <div className="flex-1">
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-white mb-2"
              >
                Budget
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                value={""}
                onChange={handleFormData}
                placeholder="Set a budget limit"
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <span className="text-white font-semibold">
            Custome timeline Selection (Leave blank if not required)
          </span>
          <div className="w-full flex-col flex sm:flex-row justify-center items-center gap-4">
            <div className="flex-1">
              <label
                htmlFor="start"
                className="block text-sm font-medium text-white mb-2"
              >
                Start Date
              </label>
              <input
                id="start"
                name="start"
                type="date"
                value={""}
                onChange={handleFormData}
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="end"
                className="block text-sm font-medium text-white mb-2"
              >
                End Date
              </label>
              <input
                id="end"
                name="end"
                type="date"
                value={""}
                onChange={handleFormData}
                className="w-full px-3 py-2.5 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <FormSubmitBtn func={() => {}} />
        </form>
      </div>
    </Modal>
  );
};

export default SettingsModal;
