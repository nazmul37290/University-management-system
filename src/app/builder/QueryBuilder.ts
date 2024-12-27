import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm=this?.query?.searchTerm
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                }) as FilterQuery<T>),
            });
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
        return this
    }

    sort(){
        let sort =this?.query?.sort || '-createdAt';
        this.modelQuery= this.modelQuery.sort(sort as string)
        return this
    }
    paginate(){
        let limit =Number(this?.query?.limit) || 10 ;
        let page =Number(this?.query?.page) || 1 ;
        let skip =(page -1)*limit || 0 ;

        this.modelQuery= this.modelQuery.skip(skip).limit(limit)

        return this
    }

    limitFields(){
        let fields= (this.query.fields as string).split(',').join(' ') || "" ;
        this.modelQuery=this.modelQuery.select(fields);
        return this
    }
}


export default QueryBuilder


