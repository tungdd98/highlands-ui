import { BasicSettingForm, SettingDef } from "../setting";

export const initialValuesBasicSetting: BasicSettingForm = {
  title: "",
  description: "",
  favicon: "",
  thumbnail: "",
  address: "",
  hotline: "",
};

export const setInitValuesBasicSetting = (
  data: SettingDef | null
): BasicSettingForm => {
  return data
    ? {
        title: data.title || "",
        description: data.description || "",
        favicon: data.favicon || "",
        thumbnail: data.thumbnail || "",
        address: data.address || "",
        hotline: data.hotline || "",
      }
    : initialValuesBasicSetting;
};
