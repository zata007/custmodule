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

export interface Marker {
  lat: number;
  lng: number;
  pitstop?: string;
  landmark?: string;
  label?: string;
  draggable?: boolean;
  id?: string;
}

export interface ILoginData {
  lanPreference: string;
  fingurePrint ?: string;
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
  locationLongLat ?: {
    type: string; coordinates: number[]
  };
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
  rolesData: Array < IRolesData > ;
  relationsData: Array < IRelationsData > ;
  languageData: Array < ILanguageData > ;
  interfaceData: Array < IInterfaceData > ;
  designationsData: IDesignationsData;
  addressTypesData: Array < IAddressTypesData > ;
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
  indEmailNotify ?: boolean;
  indMobileNotify ?: boolean;
  indPushNotify ?: boolean;
  latitude ?: number;
  longitude ?: number;
  indPwd ?: string;
}

export interface IRequestMainParams {
  fingerprint: string;
  lan: string;
  latitude: number;
  longitude: number;
}
export interface IRequestGetRestaurantData extends IRequestMainParams {
  isOrderAhead: boolean;
  isTakeAway: boolean;
  isDelivery: boolean;
  pitstopLatitude: number;
  pitstopLongitude: number;
  page ?: number;
}

export interface IRestaurantData {
  _id: string;
  businessLocId: string;
  displayName: string;
  locality: string;
  longLat: number[];
  avgRating: number;
  images: {
    _id: string,
    original: string,
    thumbnail: string;
  }[];
  blWorkingHrs: [{
    _id: string;
    day: number;
    time: [{
      _id: string;
      startTime: number;
      endTime: number;
    }]
  }];
  distance: number;
}

export interface IPaginationResGetRestaurant {
  blData: IRestaurantData[];
  totalPage: number;
  itemPerPage: number;
  currentPage: number;
}

export interface IResponseGetRestaurantData {
  message: string;
  data: IPaginationResGetRestaurant;
}

export interface IBusinessLocData {
  _id: string;
  businessLocationsId: string;
  blPitstops: boolean;
  blOrderAhead: boolean;
  blDelivery: boolean;
  blDineIn: boolean;
  blDeliveryRadius: number;
  businessLocationCoord: Array < number > ;
  distance: number;
  coDoingBusinessAs: string;
}

export interface IResponseLocationServed {
  message: 'Success';
  data: {
    isLocationServed: boolean;
    isLocationKnown: boolean;
    currentLocationDetails: string;
    businessLocData: Array < IBusinessLocData >
  };

}

export interface IRequestGetSkuData extends IRequestMainParams {
  pageNum: number;
  flag: number;
  pitstopLatitude ?: string;
  pitstopLongitude ?: string;
  businessLocId ?: string;
}

export interface IMenuData {
  _id: string;
  apPsBusinessLocId: {
    corpId: {
      _id: string;
      coDoingBusinessAs: string;
      coLegalName: string;
      coBrandName: string;
    };
  };
  skuType: string[];
  skuSubType: string[];
  skuName: string;
  skuQty: string[];
  isTaxIncluded: boolean;
  skuPrice: number;
  cgstPercentFlag: boolean;
  cgst: number;
  cgstSuffix: string;
  sgstPercentFlag: boolean;
  sgst: number;
  sgstSuffix: string;
  totalPrice: number;
  skuDesc: string;
  skuCuisine: string;
  skuServes: number;
  skuRating: number;
  skuSpice: number;
  skuImages: {
    _id: string;
    original: string;
    thumbnail: string;
  };
  skuNutrition: string;
  skuCustom: string[];
  skuCombo ?: {
    skuType: string;
    skuSubType: string;
    skuName: string;
    skuQty: string;
    skuPrice: number;
    skuDesc: string;
    skuCuisine: string;
    type: string;
    skuServes: number;
    skuRating: number;
    skuSpice: number;
    skuNutrition: string;
    skuCustom: string[];
  };
}

export interface IResponseGetSkuData {
  message: string;
  data: {
    totalPage: number;
    itemPerPage: number;
    currentPage: number;
    skuData: IMenuData[];
  };
}

export interface ILoginSignupData {
  userId: string;
  indLanPref: string;
  indFingerPrint: string;
  pRoleId: string;
  pRelationId: string;
}

export interface IRequestVerifyOtp {
  userId: string;
  pRoleId: string;
  pRelationId: string;
  mobileOTP: number;
  fingerprint: string;
  lan: string;
}
export interface IRequestPlaceOrder {
  orderType: string;
  orderData: [
    {
      businessLocId: string;
      skuId: string;
      qty: number
    }
  ];
  addressId?: string;
  pitstopId?: string;
  totalPrice: number;
}

export interface IResponsePlaceOrder {
  message: string;
  data: {
    msg: string,
    billdeskUrl: string;
  };
}

export interface IResponseVerifyOtp {
  message: string;
  data: {
    indDetail: {
      _id: string;
      indCountryCode: string;
      indMobileNum: string;
      roles: [{
        indEmailNotify: boolean;
        indMobileNotify: boolean;
        _id: string;
        deviceId: {
          indCurrLocLongLat: {
            type: string;
            coordinates: number[]
          };
          indPushNotify: boolean;
          indFingerPrint: string
        };
        indMobileNum: string
      }];
      uniqueId: string;
      accessToken: string;
    }
  };
}

export interface IResponseLoginSignup {
  message: string;
  data: ILoginSignupData;
}

export interface IProfileData {
  indDetail: {
    _id: string;
    indCountryCode: string;
    indMobileNum: string;
    roles: {
      indEmailNotify: boolean;
      indMobileNotify: boolean;
      _id: string;
      pRoleId: string;
      pRoleAuthority: number;
      pRelationId: string;
      pRelationAuthority: number,
      deviceId: {
        indCurrLocLongLat: {
          type: string;
          coordinates: number[];
        },
        indPushNotify: boolean;
        indFingerPrint: string;
      },
      indMobileNum: string;
      indAddr: {
          locationLongLat: {
            type: string;
            coordinates: number[];
          },
          _id: string;
          addrType: string;
          addrLine1: string;
          addrLine2: string;
          city: string;
          state: string;
          country: string;
          pincode: string;
          locality: string;
          landmark: string;
        }[];
      indVehicles: any[];
    }[];
    uniqueId: string;
    basic: {
      indFirstName: string;
      indLastName: string;
      indDob: string;
      apAge: number;
      apAgeUpdateOn: string;
      indGender: string;
      indFoodPref: string;
      indLanPref: string;
      indPic: [{
        imageName: string;
        original: string;
        thumbnail: string;
        tags: [];
      }];
    };
  };
}

export interface IResponseGetProfileData {
  message: string;
  data: IProfileData;
}
