import { RolesEnum } from "../types/user.enums";

export const ROLE_OPTIONS = [
  { value: RolesEnum.USER, label: "User" },
  { value: RolesEnum.MODERATOR, label: "Moderator" },
  { value: RolesEnum.ADMIN, label: "Admin" },
];
