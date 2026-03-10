
export type Language = 'en' | 'ta';

export type DocCategory = 'sales' | 'purchase' | 'bank' | 'voucher';

export type BusinessLegalType = 'proprietorship' | 'partnership' | 'llp' | 'pvt_ltd';

export interface Document {
  id: string;
  category: DocCategory;
  date: string;
  month: string;
  year: string;
  imageUrl?: string;
  summaryData?: any;
  status: 'pending' | 'processed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface FilingStatus {
  month: string;
  year: string;
  gstr1: 'not_started' | 'pending_docs' | 'ready' | 'filed';
  gstr3b: 'not_started' | 'pending_docs' | 'ready' | 'filed';
  deadline: string;
}

export interface UserAddress {
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  name: string; // Primary contact person name
  designation: string;
  businessName: string;
  gstin: string;
  phone: string;
  altPersonName?: string; // Alternative contact person name
  altDesignation?: string; // Alternative contact person designation
  altPhone?: string;
  address: UserAddress;
  businessType: BusinessLegalType;
  subscriptionType: 'basic' | 'pro';
  isFirstTime?: boolean;
}
