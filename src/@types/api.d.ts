declare namespace Api {
  export interface AvailabilityFilter {
    startDate: Date | string;
    endDate: Date | string;
    adultCount: number;
    childCount: number;
    priceRangeMin?: number;
    priceRangeMax?: number;
    propertyTypeIds?: number[];
    experienceIds?: number[];
    amenityIds?: number[];
    bedroomCount?: number;
    bathroomCount?: number;
    rateCodes?: string[];
    sortOrder: "ASC" | "DESC";
    pagination: RedSky.PagePagination;
    redeemPoints: boolean | number;
  }
  export interface CategoriesDesign {
    categoryId: number,
    genderId: number
  }

  // src/types/navigation.d.ts
export type RootStackParamList = {
  SplashScreen: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Design: undefined;
  Measurements: undefined;
  Setting: undefined;
  EditProfile: undefined;
  Video: undefined;
};

}
