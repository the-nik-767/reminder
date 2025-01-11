declare namespace Misc {
	export type Variant =
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'sectionHeader'
		| 'title'
		| 'subtitle1'
		| 'subtitle2'
		| 'body1'
		| 'body2'
		| 'caption'
		| 'button'
		| 'overline'
		| 'srOnly'
		| 'inherit'
		| 'error'
		| string;

	export interface SelectOptions {
		value: number | string;
		text: number | string;
		selected: boolean;
	}

	export interface OptionType {
		value: string | number;
		label: string | number;
	}

	export interface BookingParams {
		destinationId: number;
		stays: StayParams[];
		newRoom?: StayParams;
		editUuid?: number;
	}

	export interface StayParams {
		uuid: number;
		adults: number;
		children: number;
		accommodationId: number;
		arrivalDate: string;
		departureDate: string;
		packages: number[];
		rateCode: string;
	}

	export interface ComparisonCardInfo {
		destinationId: number;
		accommodationOptions: Misc.OptionType[];
		selectedAccommodationId: number;
		logo: string;
		title: string;
	}
	export interface ComparisonState {
		destinationDetails: ComparisonCardInfo[];
		showCompareButton: boolean;
	}

	export interface ComparisonStateShowButton {
		showCompareButton?: boolean;
	}

	interface IBaseCountry {
		name: string;
		isoCode: string;
	}

	export interface UserCheckoutInfo {
		firstName: string;
		lastName: string;
		address1: string;
		zip: string;
		city: string;
		state: string;
		country: string;
		email: string;
		phone: string;
		address2?: string;
	}

	export interface UserCheckoutPaymentInfo {
		nameOnCard: string;
		expiration: string;
	}

	export interface Checkout {
		personal: UserCheckoutInfo;
		shouldCreateUser: boolean;
		billing?: UserCheckoutInfo;
		pmData?: Api.Payment.PmData;
		paymentInfo?: UserCheckoutPaymentInfo;
		userId?: number;
		usePoints?: boolean;
		isExistingCard?: boolean;
		existingCardId?: number | undefined;
		isAffirmCheckout?: boolean;
	}

	export interface ReservationFilters extends Api.AvailabilityFilter {
		// start date, end date, adult count
		flipToregionIds?: { id: number; name: string }[];
		regionIds?: number[];
		destinationId?: number;
		accessCode?: string;
		accessType?: string;
		accommodationId?: number;
		chainId?: number;
		hotelId?: number;
		init?: boolean;
	}

	export interface CheckoutFormError {
		card: boolean;
		cvv: boolean;
	}

	export interface CountryList {
		list: Api.Country.Res.Country[] | null;
	}

	export interface Pricing {
		priceCents: number;
		pricePoints: number;
		grandTotalCents: number;
		baseRates?: number;
		quantityAvailable: number;
		rate: Api.Rate;
		minStay: number;
	}

	export interface ImageTabProp {
		name: string;
		title: string;
		imagePath: string;
		description: string;
		buttonLabel?: string;
		otherMedia: Api.Media[];
	}
}
