
type AccessToken = Token; 
type RefreshToken = Token;

type Token = {
  token: string;
  expires: string;
}

export type {
  AccessToken,
  RefreshToken,
}
