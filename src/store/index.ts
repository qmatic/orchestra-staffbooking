export * from './actions';
export * from './effects';
export * from './reducers';
export * from './services';

import {
  ServiceDataService,
  ServiceDispatchers,
  ServiceSelectors,
  BookingDataService,
  BookingDispatchers,
  BookingSelectors,
  AppointmentDataService,
  AppointmentDispatchers,
  AppointmentSelectors,
  CustomerDataService,
  CustomerDispatchers,
  CustomerSelectors,
  BranchDataService,
  BranchDispatchers,
  BranchSelectors,
  SystemInfoDataService,
  SystemInfoDispatchers,
  SystemInfoSelectors,
  UserDataService,
  UserDispatchers,
  UserSelectors,
  LicenseDataService,
  LicenseDispatchers,
  LicenseInfoSelectors,
  UserRoleDataService,
  UserRoleDispatchers,
  UserRoleSelectors
} from './services';

export const storeServices = [
  ServiceDataService,
  ServiceDispatchers,
  ServiceSelectors,
  BookingDataService,
  BookingDispatchers,
  BookingSelectors,
  AppointmentDataService,
  AppointmentDispatchers,
  AppointmentSelectors,
  CustomerDataService,
  CustomerDispatchers,
  CustomerSelectors,
  BranchDataService,
  BranchDispatchers,
  BranchSelectors,
  SystemInfoDataService,
  SystemInfoDispatchers,
  SystemInfoSelectors,
  UserDataService,
  UserDispatchers,
  UserSelectors,
  LicenseDataService,
  LicenseDispatchers,
  LicenseInfoSelectors,
  UserRoleDataService,
  UserRoleDispatchers,
  UserRoleSelectors
];
