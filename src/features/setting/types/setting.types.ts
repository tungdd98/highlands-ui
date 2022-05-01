export interface SettingDef {
  title: string;
  description: string;
  favicon: string;
  thumbnail: string;
  address: string;
  hotline: string;
  aboutPage: string;
  deliveryPocily: string;
  returnPolicy: string;
}

export interface BasicSettingForm
  extends Pick<SettingDef, "title" | "description" | "address" | "hotline"> {
  thumbnail: string | File;
  favicon: string | File;
}

export interface BasicSettingRequest extends Partial<BasicSettingForm> {
  aboutPage?: string;
  deliveryPocily?: string;
  returnPolicy?: string;
}

export interface RoleDef {
  name: string;
  id: number;
}

export type RoleRequest = RoleDef;
