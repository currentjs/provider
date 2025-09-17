export interface IProvider {
    init(): Promise<void>;
    shutdown(): Promise<void>;
    health(): Promise<boolean>;
}

export interface ISqlProvider extends IProvider {
    query<TData = any>(query: string, params: Record<string, SqlParam>): Promise<SQLResult<TData>>;
}

export interface INoSqlProvider extends IProvider {
    // here's room for NoSQL providers
}

export interface QueryResult<TData = any> {
    data: TData[];
    success: boolean;
    error?: string;
}

export interface SQLResult<TData = any> extends QueryResult<TData> {
    fields?: Array<{
      name: string;
      type: string;
      nullable?: boolean;
    }>;
    affectedRows?: number;
    insertId?: number | string;
    changedRows?: number;
}

export interface NoSQLResult<TData = any> extends QueryResult<TData> {
    cursor?: string;
    totalCount?: number;
}

export type SqlParam = string | number | boolean | Date | null | Buffer;

export class ProviderDummy implements ISqlProvider {
    constructor() {
        console.log('DummyProvider constructor');
    }

    async init() {
        console.log('DummyProvider init');
    }

    async shutdown() {
        console.log('DummyProvider shutdown');
    }

    async query<TData = any>(query: string, params: Record<string, SqlParam>): Promise<SQLResult<TData>> {
        console.log('DummyProvider query', query, params);
        return {
            data: [],
            success: true,
            error: undefined
        };
    }

    async health() {
        console.log('DummyProvider healthcheck');
        return true;
    }

}