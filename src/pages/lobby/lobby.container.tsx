import Actions from "./lobby-actions.component";

const DashBoard = () => {
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
