export interface Billing{
    id?:number;
    bill_prefix?:string;
    bill_no?:string;
    customer_id?:number;
    bill_date?: Date,
    table_id?:number;
    bill_amount?:number;
    othercharge?:number;
    totalAmount?:number;
    billstatus?:number;
}