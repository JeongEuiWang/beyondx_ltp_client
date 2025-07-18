import { AccessToken } from "./auth";

enum UserLevelEnum {
  DEFAULT = "DEFAULT",
  SILVER = "SILVER",
  GOLD = "GOLD",
  VIP = "VIP",
}

enum UserRoleEnum {
  USER = 1,
  ADMIN = 2,
}

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role_id: number;
  total_payment_amount: number;
};

type UserWithLevel = User & {
  user_level: UserLevel;
};

type UserLevel = {
  id: number;
  level: UserLevelEnum;
  required_amount: number;
  discount_rate: number;
};

type AuthUser = UserWithLevel & {
  access: AccessToken;
};

export type { User, UserWithLevel, UserLevel, AuthUser };
export { UserLevelEnum, UserRoleEnum };
