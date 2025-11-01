import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import FormSubmitBtn from "../helpers/FormSubmitBtn";
import type { SettingsForm } from "../../types/FormsData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAllSettingData, getSettingsModalState } from "../../redux/selectors";
import { toggleSettings } from "../../redux/modalSlice";
import { allSettings, setGraphs } from "../../redux/settingsSlice";
import { Graphs } from "../../types/Component";
import FormHeader from "../helpers/FormHeader";
import useDebounce from "../../hooks/useDebounce";

const SettingsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const openState = useAppSelector(getSettingsModalState);
  const globalsettings = useAppSelector(getAllSettingData);

  const [settings, setSettings] = useState<SettingsForm>({
    start: "",
    end: "",
    budget: "",
    graphs: ["Bar_Graphs", "Radar_Chart", "Pie_Chart", "Hollow_Pie_Chart", "Line_Graph", "Scatter_Plot", "Budget_Meter"],
  });

  // const updateAllSettings = 
  useDebounce({ timer: 500, thunk: allSettings, payload: settings })

  const handleFormData = (e: any): void => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });    
  };

  useEffect(() => {
    setSettings({
      ...settings,
      end: globalsettings.end,
      start: globalsettings.start,
    });
  }, [globalsettings.start, globalsettings.end])


  const graphs = Object.values(Graphs);

  return (
    <Modal
      className="z-20 fixed h-[55%] w-[50%] left-1/2 right-1/2 transform -translate-x-1/2 top-1/5 shadow-2xl rounded-2xl overflow-auto bg-gray-800 border-2 border-white scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
        },
      }}
      isOpen={openState}
      onRequestClose={() => dispatch(toggleSettings())}
      ariaHideApp={false}
    >
      <FormHeader thunk={toggleSettings} heading="Settings"/>
      
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
                {graphs.map((graph, i) => (
                  <div
                    key={i}
                    className="flex w-full items-center justify-between align-middle bg-gray-600 px-2 rounded-lg"
                  >
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
                        const newGraphs = checked
                          ? [...settings.graphs, graph]
                          : settings.graphs.filter((g) => g !== graph);
                        setSettings({
                          ...settings,
                          graphs: newGraphs,
                        });
                        dispatch(setGraphs(newGraphs));
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
                value={settings.budget}
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
                value={settings.start}
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
                value={settings.end}
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
