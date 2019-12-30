export interface ISignUpData {
  fullName: string;
  latitude: number;
  longitude: number;
  email: string;
  mobileNumber: string;
  referralCodeUsed: string;
  foodPreference: string;
  lanPreference: string;
}

export interface ILoginData {
  lanPreference: string;
  fingurePrint?: string;
  mobileNumber: string;
}

export interface IMobileLoginData {
    userId: string;
    lanPreference: string;
    fingerprint: string;
    mobileOTP: number;
}

export interface IUserDetails {
  id: string;
  email: string;
  fullName: string;
  isVerified: boolean;
  locationLongLat?: { type: string; coordinates: number[] };
  mobileNumber: string;
  referralCode: string;
  remainingReferrals: number;
  requestedAt: string;
  walletBalance: number;
}
