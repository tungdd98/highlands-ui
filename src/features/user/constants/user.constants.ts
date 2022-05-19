import { RolesEnum } from "../types/user.enums";

export const ROLE_OPTIONS = [
  { value: RolesEnum.USER.toString(), label: "User" },
  { value: RolesEnum.MODERATOR.toString(), label: "Moderator" },
  { value: RolesEnum.ADMIN.toString(), label: "Admin" },
];
