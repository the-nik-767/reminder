declare namespace RedSky {
    export type StandardOrderTypes = 'ASC' | 'DESC' | 'RAND' | 'NONE';
    export type ConjunctionTypes = 'AND' | 'OR';
    export type MatchTypes =
        | 'exact'
        | 'fuzzy'
        | 'like'
        | 'greaterThan'
        | 'greaterThanEqual'
        | 'lessThan'
        | 'lessThanEqual';

    // Replace `T` with the actual type of data you are working with
    export interface RsResponseData<T> {
        data: T;
    }

    export interface RsErrorData {
        err: string;
        msg: string;
        stack?: string;
    }

    export interface RsCreateSingle<T> {
        data: T;
    }

    export interface RsUpdateSingle<T> {
        id: number;
        data: T;
    }

    export interface RsUpdateMultiple<T> {
        ids: number[];
        data: T;
    }

    export interface RsDeleteSingle {
        id: number;
    }

    export interface RsDeleteMultiple {
        ids: number[];
    }

    export interface RsPagedResponseData<T> extends RsResponseData<T> {
        rewardPointsPerDollar: number;
        total?: number;
    }

    // Replace `T` with the actual type of request body
    export interface GenericCreateObjectFromRequest<T> {
        body: T;
        user?: Api.User.Model; // Adjust according to the actual type
    }

    export interface SortQuery {
        field: string;
        order: StandardOrderTypes;
    }

    export interface FilterQuery {
        matchType: MatchTypes;
        searchTerm: FilterQueryValue[];
    }

    export interface FilterQueryValue {
        column: string;
        value: string | string[] | number | number[];
        conjunction?: ConjunctionTypes;
        matchType?: MatchTypes;
    }

    export interface PagePagination {
        page: number;
        perPage: number;
    }

    export interface PageQuery {
        pagination: PagePagination;
        sort?: SortQuery;
        filter?: FilterQuery;
    }

    export interface IntegrationCompanyDetails extends Model.Company {
        serviceType: string;
        serviceName: string; // Adjust based on actual data type
        serviceKey: string; // Adjust based on actual data type
    }
}
