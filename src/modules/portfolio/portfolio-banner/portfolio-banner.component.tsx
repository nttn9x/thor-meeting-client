import React from "react";
import BannerAvatar from "./portfolio-banner-avatar.component";
import BannerInfo from "./portfolio-banner-hello.component";
import * as styles from "./portfolio-banner.style";

interface IBanner {
  mask?: boolean;
}

export default function Banner({ mask }: IBanner) {
  return (
    <div id="about" className={styles.getContainerStyle(mask)}>
      <div className={styles.body}>
        <BannerInfo mask={mask} />
        <BannerAvatar />
      </div>
    </div>
  );
}
