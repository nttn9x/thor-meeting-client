import React from "react";
import { useTranslation } from "react-i18next";

import "./page-loading.css";

const PageLoading = () => {
  const { t } = useTranslation();
  return (
    <div className="loading flex h-full items-center justify-center relative">
      <div className="loading_circle absolute w-[200px] h-[200px] rounded-full before:rounded-full before:absolute before:content-[''] before:w-full before:h-full"></div>
      <span className="loading_text tracking-widest uppercase">
        {t("loading") + "..."}
      </span>
    </div>
  );
};

export default PageLoading;
