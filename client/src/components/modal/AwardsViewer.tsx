import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAwards, getAwardsViewerModalState, getUser } from "../../redux/selectors";
import { toggleAwardsViewer } from "../../redux/modalSlice";
import { getAwards as fetchAwards } from "../../api/userAPIs";

const monthOrder = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const emptyFaces = ["(⊙ˍ⊙)", "(•ˋ _ ˊ•)", "(￢_￢)  ^ huh", "(╯`Д´)╯︵ ┻━┻"];

const normalizeMonthYear = (award: any): string => {
  const month = String(award?.month || "").toLowerCase();
  const year = String(award?.year || "");
  if (!month || !year) return "Unknown";
  return `${month} ${year}`;
};

const monthYearLabel = (value: string): string => {
  if (value === "all") return "All Months";
  const [month, year] = value.split(" ");
  if (!month || !year) return "Unknown";
  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
};

const monthYearRank = (value: string): number => {
  if (value === "Unknown") return -1;
  const [month, year] = value.split(" ");
  const y = Number(year) || 0;
  const m = monthOrder.indexOf(month);
  return y * 12 + Math.max(m, 0);
};

const AwardsViewer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(getAwardsViewerModalState);
  const user = useAppSelector(getUser);
  const awards = useAppSelector(getAwards) || [];
  const now = new Date();
  const currentMonthKey = `${monthOrder[now.getMonth()]} ${now.getFullYear()}`;
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthKey);
  const [emptyFace, setEmptyFace] = useState<string>(emptyFaces[0]);

  useEffect(() => {
    if (isOpen && user.user) {
      fetchAwards(user.user, dispatch);
      setSelectedMonth(currentMonthKey);
      setEmptyFace(emptyFaces[Math.floor(Math.random() * emptyFaces.length)]);
    }
  }, [isOpen, user.user, dispatch, currentMonthKey]);

  const monthOptions = useMemo(() => {
    const unique = new Set<string>();
    (awards || []).forEach((award: any) => {
      unique.add(normalizeMonthYear(award));
    });
    return Array.from(unique).sort((a, b) => monthYearRank(b) - monthYearRank(a));
  }, [awards]);

  const filteredAwards = useMemo(() => {
    if (selectedMonth === "all") return awards;
    return (awards || []).filter((award: any) => normalizeMonthYear(award) === selectedMonth);
  }, [awards, selectedMonth]);

  const close = () => {
    setSelectedMonth(currentMonthKey);
    dispatch(toggleAwardsViewer());
  };

  return (
    <Modal
      className="z-20 fixed h-auto max-h-[65%] w-[50%] left-1/2 right-1/2 transform -translate-x-1/2 top-1/5 shadow-2xl rounded-2xl overflow-auto bg-white border-2 border-black scrollbar-hide"
      style={{
        overlay: {
          backgroundColor: "transparent",
          zIndex: 50,
        },
      }}
      isOpen={isOpen}
      onRequestClose={close}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-r bg-yellow-300 px-6 py-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Awards Viewer</h2>
        <i className="font-bold fa fa-close text-white hover:text-gray-400 cursor-pointer" onClick={close} />
      </div>

      <div className="px-6 py-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="award-month-filter" className="text-sm font-semibold text-gray-800">
            Show awards for:
          </label>
          <select
            id="award-month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="sm:w-60 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value={currentMonthKey}>{monthYearLabel(currentMonthKey)}</option>
            <option value="all">All Months</option>
            {monthOptions.filter((option) => option !== currentMonthKey).map((option) => (
              <option key={option} value={option}>
                {monthYearLabel(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredAwards.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
              <div className="text-2xl font-semibold">{emptyFace}</div>
            </div>
          ) : (
            filteredAwards.map((award: any, idx: number) => {
              const awardId = award.id || award._id || `${award.award}-${award.month}-${award.year}-${idx}`;
              return (
                <div
                  key={awardId}
                  className="relative overflow-hidden rounded-2xl border border-fuchsia-300 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #ec4899 100%)",
                  }}
                >
                  <div
                    className="absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-30"
                    style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
                  />
                  <div
                    className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full opacity-25"
                    style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }}
                  />
                  <div className="relative flex items-center gap-4 px-5 py-4">
                    <div className="h-11 w-11 shrink-0 rounded-xl border border-white/60 bg-white/95 flex items-center justify-center shadow">
                      <i className="fa fa-trophy text-fuchsia-600 text-lg" />
                    </div>
                    <h3 className="text-lg font-extrabold tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                      {award.award || "Unnamed Award"}
                    </h3>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AwardsViewer;
