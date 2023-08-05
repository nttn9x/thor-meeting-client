import React from "react";
import * as styles from "./portfolio-banner.style";

interface IBannerInfo {
  mask?: boolean;
}

export default function BannerInfo({ mask }: IBannerInfo) {
  return (
    <div className={styles.infoContainer}>
      <div className={"content"}>
        <div className="text-base">
          <span className="text-secondary">{mask ? "Hey" : "Hi"}, I'm </span>
          <span className={mask ? "text-white" : `text-primary-500`}>
            Nguyen
          </span>
        </div>

        {mask && (
          <div className={styles.infoContentHover}>
            BUILD<div className={"mx-1 text-black"}>SHIT</div>FOR YOU
          </div>
        )}

        {!mask && (
          <div className={styles.infoContent}>
            BUILD<div className={"mx-1 text-primary-500"}>WHATEVER</div>YOU WANT
          </div>
        )}
      </div>
    </div>
  );
}
