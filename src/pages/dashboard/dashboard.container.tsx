import { AppRouters } from "@thor/constants";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

const Dashboard = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const goTo = (url: string) => () => {
    navigate(url);
  };

  return (
    <div className="flex justify-center items-center h-full gap-6">
      <div
        className="bg-gradient-to-r to-indigo-500 from-purple-700 hover:bg-none hover:bg-white hover:text-primary-500 rounded-lg w-[250px] h-[250px] flex items-center justify-center text-xl cursor-pointer"
        onClick={goTo(AppRouters.Meeting)}
      >
        Meeting
      </div>
      <div
        className="bg-gradient-to-r to-orange-600 from-red-500 hover:bg-none hover:bg-white hover:text-primary-500 rounded-lg w-[250px] h-[250px] flex items-center justify-center text-xl cursor-pointer"
        onClick={goTo(AppRouters.Apartment)}
      >
        Apartment
      </div>
      <div
        className="bg-gradient-to-r to-orange-600 from-red-500 hover:bg-none hover:bg-white hover:text-primary-500 rounded-lg w-[250px] h-[250px] flex items-center justify-center text-xl cursor-pointer"
        onClick={goTo(AppRouters.Portfolio)}
      >
        Portfolio
      </div>
    </div>
  );
};

export default Dashboard;
