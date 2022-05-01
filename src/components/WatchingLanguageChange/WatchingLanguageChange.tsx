import { FC, memo, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { useAppSelector } from "redux/store";

const WatchingLanguageChange: FC = () => {
  const { language } = useAppSelector(state => state.app);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language.lng);
  }, [i18n, language.lng]);

  return null;
};

export default memo(WatchingLanguageChange);
