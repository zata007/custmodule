export const LOCAL_STORAGE = 'ZataakSeUser';
export const LOCAL_STORAGE_FINGERPRINT = 'Zataakse_User_FingerPrint';
export const ZATAAKSE_PREF_LANG = 'zataakse_pref_lang';

export const API_ENDPOINTS = {
  USER : 'user',
  ACCSSS: 'access',
  PARAMS: 'params',
  OA: 'oa'
};

export const RELATION_CODE = {
  Customer: 'C',
  Employee: 'E',
  Maker: 'M',
  Admin: 'Adm'
};

export enum ECustomerServiceType {
  TakeAway = 'take-away',
  Delivery = 'delivery',
  OrderAhead = 'order-ahead',
}

export enum EListPageViewType {
  FoodList = 'foodList',
  RestaurantList =  'restaurantList'
}
