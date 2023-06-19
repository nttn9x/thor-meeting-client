import Actions from "./dashboard-actions.component";

const DashBoard = () => {
  return (
    <>
      <main>
        <div className="flex p-16 gap-2">
          <span className="font-semibold">Thor</span>Meeting
        </div>
        <div className="flex p-16">
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex-1 text-5xl leading-tight">
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
      </main>
    </>
  );
};

export default DashBoard;
