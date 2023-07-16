import React from "react";

const LobbyBanner = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1 text-3xl md:text-5xl leading-tight">
        Premium video meetings. Now free for everyone.
      </div>
      <div className="prose dark:prose-invert">
        We re-engineered the service we built for secure business meetings, Thor
        Meet, to make it free and available for all.
      </div>
    </div>
  );
};

export default LobbyBanner;
