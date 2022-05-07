import React, { FC, memo, useEffect, useState, useMemo } from "react";

import { Helmet } from "react-helmet";

import Loader from "components/Loader/Loader";
import { getSettingPage } from "features/setting/setting";
import { useAppDispatch, useAppSelector } from "redux/store";

const SeoContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector(state => state.setting);

  const [loading, setLoading] = useState(true);

  const faviconUrl = useMemo(() => {
    if (!setting) return "/favicon.ico";

    if (setting.favicon.match(/^(blob:)?https?:\/\/[\w/:%#$&?()~.=+-]+$/g)) {
      return setting.favicon;
    }

    return `${process.env.REACT_APP_PATH_UPLOAD + setting.favicon}`;
  }, [setting]);

  useEffect(() => {
    dispatch(getSettingPage()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return setting ? (
    <Helmet>
      {setting.title && <title>{setting.title}</title>}
      {setting.description && (
        <meta name="description" content={setting.description} />
      )}
      <link rel="apple-touch-icon" href={faviconUrl} />
      <link rel="icon" href={faviconUrl} type="image/png" />
    </Helmet>
  ) : null;
};

export default memo(SeoContainer);
