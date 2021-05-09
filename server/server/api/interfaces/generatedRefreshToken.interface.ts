export interface generatedRefreshToken {
  token: string;
  expires: Date;
  createdByIp: string;
  userId: number | null;
  adminId: number | null;
}
