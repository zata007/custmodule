export const LOCAL_STORAGE = 'ZataakSeUser';
export const LOCAL_STORAGE_FINGERPRINT = 'Zataakse_User_FingerPrint';
export const ZATAAKSE_PREF_LANG = 'zataakse_pref_lang';
export const ZATAAKSE_JWT_TOKEN = 'zataakse_jwt_token';
export const ZATAAKSE_PAYMENT_TOKEN = 'zataakse_payment_token';
export const ZATAAKSE_SELECTED_SERVICE = 'zataakse_service_selected';

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
