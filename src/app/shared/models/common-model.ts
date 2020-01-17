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

export interface IRolesData {
  _id: string;
  roleCode: string;
  defaultAuthority: number;
  roleName: string;
}

export interface IRelationsData {
  _id: string;
  relationCode: string;
  defaultAuthority: number;
  relationName: string;
}
export interface ILanguageData {
  _id: string;
  code: string;
  name: string;
}

export interface IInterfaceData {
  _id: string;
  name: string;
  pRelationId: string;
  pRoleId: string;
}

export interface IDesignationsData {
  _id: string;
  name: string;
}

export interface IAddressTypesData {
  _id: string;
  type: string;
}

export interface IPlatformParams {
  rolesData: Array<IRolesData>;
  relationsData: Array<IRelationsData>;
  languageData: Array<ILanguageData>;
  interfaceData: Array<IInterfaceData>;
  designationsData: IDesignationsData;
  addressTypesData: Array<IAddressTypesData>;
}
export interface IResponsePlatformParams {
  message: string;
  data: IPlatformParams;
}

export interface IRequestRegister {
    reqType: string;
    pRoleId: string;
    pRelationId: string;
    pInterface: string;
    indCountryCode: string;
    indMobileNum: string;
    indEmailNotify?: boolean;
    indMobileNotify?: boolean;
    indPushNotify?: boolean;
    latitude?: number;
    longitude?: number;
    indPwd?: string;
}

export interface IBusinessLocData {
  _id: string;
  businessLocationsId: string;
  blPitstops: boolean;
  blOrderAhead: boolean;
  blDelivery: boolean;
  blDineIn: boolean;
  blDeliveryRadius: number;
  businessLocationCoord: Array<number>;
  distance: number;
  coDoingBusinessAs: string;
}

export interface IResponseLocationServed {
     message: 'Success';
     data: {
        isLocationServed: boolean;
        isLocationKnown: boolean;
        currentLocationDetails: string;
        businessLocData: Array<IBusinessLocData>
      };

}
