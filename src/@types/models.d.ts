declare namespace Model {
	export type InternalResourceTypes = 'ANDROID' | 'IOS' | 'WEB';
	export type ServiceKeyType = 'DESTINATION' | 'RESERVATION' | 'PAYMENT' | 'OFFSITE_LOYALTY' | 'VAULT';
	export type AccommodationTypes = 'HOTEL' | 'RENTAL';
	export type AccommodationStatusType = 'ACTIVE' | 'INACTIVE' | 'DELETED';
	export type AccommodationRoomClassType = 'Deluxe';
	export type LoyaltyStatus = 'PENDING' | 'ACTIVE' | 'FROZEN';
	export type UserBusinessLevel = 'SUPER' | 'COMPANY' | 'DESTINATION' | 'BRAND' | 'LOCATION' | 'NONE';
	export type UserAddressType = 'SHIPPING' | 'BILLING' | 'BOTH';
	export type UserAccessScopeTypes =
		| 'USER'
		| 'COMPANY'
		| 'POINTS'
		| 'TEST'
		| 'USER_POINTS'
		| 'LOYALTY_CAMPAIGNS'
		| 'LOYALTY_REWARDS'
		| 'ADMINISTRATION'
		| 'MEDIA_ACCESS'
		| 'ORDERS'
		| 'ANALYTICS'
		| 'REAL_ESTATE'
		| 'REPORTING';
	export type UserReportingAccessLevelTypes = 'COMPANY_LEVEL' | 'DESTINATION_BRAND_LEVEL' | 'LOCATION_LEVEL' | 'NONE';
	export type SystemActionLogActions =
		| 'CREATE'
		| 'DELETE'
		| 'UPDATE'
		| 'POINT_ADJUSTMENT'
		| 'TRIGGER'
		| 'CAMPAIGN_CONSOLIDATION';
	export type PointTypes = 'ACTION' | 'CAMPAIGN' | 'ADMIN' | 'ORDER' | 'BOOKING' | 'RENTAL' | 'VACATION' | 'VOUCHER';
	export type UserPointStatusTypes =
		| 'PENDING'
		| 'RECEIVED'
		| 'REVOKED'
		| 'EXPIRED'
		| 'REDEEMED'
		| 'CANCELED'
		| 'REFUNDED';
	export type PointReason =
		| 'TECHNICAL_ERROR'
		| 'HOTEL_STAY'
		| 'RETAIL_TRANSACTION'
		| 'RESTAURANT_TRANSACTION'
		| 'GOODWILL'
		| 'VOUCHER_CLAIM'
		| 'CAMPAIGN_ACTION'
		| 'CAMPAIGN_COMPLETION'
		| 'TRANSACTION_REFUND';
	export type DestinationPolicyType = 'CheckIn' | 'CheckOut' | 'Cancellation' | 'Guarantee';
	export type PaymentSystemProviders = 'adyen' | 'mock';
	export type OffsiteLoyaltySystemProviders = 'fidel';
	export type VaultSystemProviders = 'spreedly';
	export type EmailSystems = 'mailgun' | 'mailhog';
	export type UpsellPackagePricingType = 'PerGuest' | 'PerStay' | 'PerNight' | 'PerGuestPerNight';
	export type CurrencyCode = 'USD'; // Add more if/when we add multicurrency support
	export type ReviewStatus = 'APPROVED' | 'REJECTED' | 'FLAGGED' | 'PENDING';
	export type OrderRedemptionStatus = 'PENDING' | 'COMPLETED' | 'ERROR';
	export type PageGuard = {
		page: string;
		route: string;
		reRoute: string;
		isActive: 1 | 0;
	};

	export interface Accommodation {
		id: number;
		companyId: number;
		destinationId: number;
		accommodationTypeId: number;
		propertyTypeId: number;
		name: string;
		code: string;
		shortDescription: string;
		longDescription: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		bedroomCount: number;
		bathroomCount: number;
		floorCount: number;
		createdOn: Date | string;
		modifiedOn: Date | string;
		status: AccommodationStatusType;
		isPrivate: boolean;
		isRentReady: boolean;
		phase: string;
		lot: string;
		closingDate: Date | string;
		houseView: string;
		furnitureDescription: string;
		kitchenDescription: string;
		modelDescription: string;
		managementCompany: string;
		maxOccupantCount: number;
		maxSleeps: number;
		propertyCode: string;
		agreementDate: Date | string;
		propertyStatus: string;
		accommodationCode: string;
		priceCents: number;
		metaData: Record<string, unknown>;
		externalSystemId: string;
		roomClass: AccommodationRoomClassType;
		bedDetails: AccommodationBedDetails[];
		extraBeds: boolean | number;
		extraBedPriceCents: number;
		adaCompliant: boolean;
		heroUrl: string;
		size: string; // of type {max: number; min: number; units: string}
		isActive: boolean;
	}

	export interface AccommodationAmenity {
		accommodationId: number;
		amenityId: number;
	}

	export interface AccommodationBedDetails {
		type: string;
		isPrimary: boolean | number;
		qty: number;
		description: string;
	}

	export interface AccommodationCategory {
		id: number;
		companyId: number;
		accommodationId: number;
		title: string;
		description: string;
	}

	export interface AccommodationLayout {
		id: number;
		companyId: number;
		accommodationId: number;
		title: string;
		mediaId: number;
	}

	export interface AccommodationLayoutRoom {
		id: number;
		companyId: number;
		accommodationLayoutId: number;
		title: string;
		description: string;
	}

	export interface AccommodationType {
		id: number;
		companyId: number;
		destinationId: number;
		code: string;
		name: string;
		description: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		isActive: 0 | 1;
		type: AccommodationTypes;
		metaData: Record<string, unknown>;
		externalSystemId: string;
	}

	export interface Action {
		id: number;
		companyId: number;
		brandId: number;
		brandLocationId: number;
		name: string;
		description: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		isActive: 0 | 1;
		type: string;
		pointValue: number;
	}

	export interface Amenity {
		id: number;
		title: string;
		icon: string;
	}

	export interface Brand {
		id: number;
		companyId: number;
		name: string;
		squareLogoUrl: string;
		wideLogoUrl: string;
		website: string;
		description: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		loyaltyStatus: LoyaltyStatus;
		isActive: 0 | 1;
		externalId: string | number;
		metaData: Record<string, unknown>;
	}

	export interface BrandLocation {
		id: number;
		brandId: number;
		name: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		isActive: 0 | 1;
		loyaltyStatus: LoyaltyStatus;
		externalId: string;
		metaData: Record<string, unknown>;
	}

	export interface BookingSource {
		id: number;
		name: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		isActive: 0 | 1;
		code: string;
	}

	export interface Businesses {
		companyIds?: number[];
		brandIds?: number[];
		brandLocationIds?: number[];
		destinationIds?: number[];
	}

	export interface Campaign {
		id: number;
		companyId: number;
		segmentId: number;
		name: string;
		description: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		isActive: 0 | 1;
		maxReward: number;
		type: string;
		startOn: Date | string;
		endOn: Date | string;
		pointValueMultiplier: number;
		activityReferenceNumber: string;
		completionPoints: number;
	}

	export interface CampaignAction {
		id: number;
		campaignId: number;
		actionId: number;
		createdOn: Date | string;
		actionCount: number;
		isActive: 0 | 1;
		pointValue: number;
	}

	export interface UserCompletedCampaign {
		id: number;
		userId: number;
		campaignId: number;
		hasAwarded: 0 | 1;
		createdOn: string | Date;
		modifiedOn: string | Date;
		refundedOn: Date | string;
	}

	export interface CampaignConfiguration {
		campaignId: number;
		startOn: Date | string;
		endOn: Date | string;
		pointValue: number;
	}

	export interface Company {
		id: number;
		name: string;
		phoneNumber: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		metaData: Record<string, unknown>;
	}

	export interface Country {
		id: number;
		name: string;
		isoCode: string;
	}

	export interface Destination {
		id: number;
		companyId: number;
		brandId: number;
		brandLocationId: number;
		code: string;
		name: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phoneNumber: string;
		faxNumber: string;
		email: string;
		website: string;
		description: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		isActive: 0 | 1;
		bookingUrl: string;
		metaData: Record<string, unknown>;
	}

	export interface Location {
		id: number;
		companyId: number;
		brandId: number;
		brandLocationId: number;
		destinationId: number;
		code: string;
		name: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phoneNumber: string;
		faxNumber: string;
		email: string;
		website: string;
		description: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
		isActive: 0 | 1;
		metaData: Record<string, unknown>;
	}

	export interface LocationCategory {
		id: number;
		locationId: number;
		categoryId: number;
	}

	export interface Media {
		id: number;
		mediaType: string;
		url: string;
	}

	export interface MetaData {
		key: string;
		value: string;
	}

	export interface PaymentSystem {
		id: number;
		name: string;
		provider: PaymentSystemProviders;
		metaData: Record<string, unknown>;
	}

	export interface PointAction {
		id: number;
		companyId: number;
		brandId: number;
		destinationId: number;
		name: string;
		description: string;
		pointValue: number;
	}

	export interface Role {
		id: number;
		name: string;
		description: string;
	}

	export interface User {
		id: number;
		companyId: number;
		firstName: string;
		lastName: string;
		email: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
	}

	export interface UserAccessScope {
		id: number;
		userId: number;
		scope: UserAccessScopeTypes;
	}

	export interface UserRole {
		id: number;
		userId: number;
		roleId: number;
	}

	export interface UserGroup {
		id: number;
		name: string;
	}

	export interface UserGroupAssignment {
		id: number;
		userId: number;
		groupId: number;
	}

	export interface UserPoint {
		id: number;
		userId: number;
		pointValue: number;
		reason: PointReason;
		status: UserPointStatusTypes;
		createdOn: Date | string;
		modifiedOn: Date | string;
	}

	export interface UserReservation {
		id: number;
		userId: number;
		destinationId: number;
		accommodationId: number;
		reservationDate: Date | string;
		checkInDate: Date | string;
		checkOutDate: Date | string;
		status: string;
	}

	export interface SystemActionLog {
		id: number;
		action: SystemActionLogActions;
		message: string;
		timestamp: Date | string;
	}

	export interface SystemConfiguration {
		id: number;
		name: string;
		value: string;
	}

	export interface RolePrivilege {
		id: number;
		roleId: number;
		privilege: string;
	}

	export interface Point {
		id: number;
		type: PointTypes;
		amount: number;
		status: UserPointStatusTypes;
		createdOn: Date | string;
		modifiedOn: Date | string;
	}

	export interface Redemption {
		id: number;
		userId: number;
		pointId: number;
		status: OrderRedemptionStatus;
		createdOn: Date | string;
	}

	export interface UserBusiness {
		userId: number;
		companyIds?: number[];
		brandIds?: number[];
		brandLocationIds?: number[];
		destinationIds?: number[];
	}

	export interface PageGuard {
		page: string;
		route: string;
		reRoute: string;
		isActive: 1 | 0;
	}

	export interface Coupon {
		id: number;
		companyId: number;
		code: string;
		description: string;
		discountValue: number;
		expirationDate: Date | string;
	}

	export interface Discount {
		id: number;
		companyId: number;
		description: string;
		discountValue: number;
	}

	export interface Voucher {
		id: number;
		companyId: number;
		code: string;
		description: string;
		amount: number;
		expirationDate: Date | string;
	}

	export interface Report {
		id: number;
		name: string;
		description: string;
		createdOn: Date | string;
		modifiedOn: Date | string;
	}

	export interface ReportData {
		reportId: number;
		data: Record<string, unknown>;
	}

	export interface Analytics {
		id: number;
		name: string;
		description: string;
		data: Record<string, unknown>;
	}

	export interface EmailTemplate {
		id: number;
		name: string;
		subject: string;
		body: string;
	}

	export interface Configuration {
		id: number;
		name: string;
		value: string;
	}
}
