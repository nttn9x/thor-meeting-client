// import { useAppSelector } from "@thor/store";
import Actions from "./lobby-actions.component";
// import { Navigate } from "react-router-dom";
// import { AppRouters } from "@thor/constants";
// import _isEmpty from "lodash/isEmpty";

const DashBoard = () => {
  // const user = useAppSelector((state) => state.user);

  // if (_isEmpty(user)) {
  //   return <Navigate to={AppRouters.Welcome} replace={true} />;
  // }

  return (
    <>
      <div className="flex p-8 md:p-16 gap-2">
        <span className="font-semibold">Thor</span>Meeting
      </div>
      <div className="flex p-8 md:p-16">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex-1 text-3xl md:text-5xl leading-tight">
              Premium video meetings. Now free for everyone.
            </div>
            <div>
              We re-engineered the service we built for secure business
              meetings, Thor Meet, to make it free and available for all.
            </div>
          </div>
          <Actions />
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
};

export default DashBoard;
