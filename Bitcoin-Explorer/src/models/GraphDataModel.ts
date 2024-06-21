export interface GraphDataModel {
    description: String,
    name: String,
    period: String,
    status: String,
    unit: String,
    values: Array<GraphValueBlock>,
}

interface GraphValueBlock {
    x: Number,
    y: Number,
}
