import { Body, Controller, Get, HttpException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BillItemDto } from 'src/bill-item/bill-item.dto';
import { BillItemService } from 'src/bill-item/bill-item.service';
import { CustomerDto } from 'src/customer/customer.dto';
import { CustomerService } from 'src/customer/customer.service';
import { PaymentDto } from 'src/payment/payment.dto';
import { PaymentService } from 'src/payment/payment.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { Billing } from './billing.dto';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
    constructor(
        private billingService: BillingService,
        private billItemService: BillItemService,
        private customerService: CustomerService,
        private paymentService: PaymentService
    ){}

    @Get(':id')
    @UseGuards(new AuthGuard())
    getSingleBill(@Param('id') id:number){
        return this.billingService.getSingleBill(id);
    }

    @Post()
    @UseGuards(new AuthGuard())
    async saveBill(@Body() data){
        try{
            let billNo = 1;
            const billNoData = await this.billingService.billNo();
            if(billNoData.max){
                billNo = billNoData.max
            }
            const billData: Billing = {
                bill_no: billNo.toString(),
                bill_prefix:'Bill',
                table_id: data.table_id,
                bill_date: data.bill_date,
                bill_amount: data.bill_amount,
                totalAmount:data.bill_amount
            }
            const billItems: BillItemDto[] = data.billItems;
            let newbill: Billing = await this.billingService.saveBill(billData);
            billItems.forEach((b) => {
                b.bill_id = newbill.id;
            })
            await this.billItemService.saveBillItem(billItems);
            let newBillData = await this.billingService.getSingleBill(newbill.id);
            return newBillData;
        }catch(e){
            const error = {
                "code": e.code,
                "errno": e.errno,
                "name": e.name,
            }
            throw new HttpException(error, 404);
        }
    }

    @Patch(':id')
    @UseGuards(new AuthGuard())
    async updateBill(@Param('id') id:number, @Body() data){
        try{
            const billData: Billing = {
                table_id: data.table_id,
                bill_date: data.bill_date,
                bill_amount: data.bill_amount
            }
            const billItems: BillItemDto[] = data.billItems;
            await this.billingService.updateBill(id,billData);
            billItems.forEach((b) => {
                b.bill_id = id;
            })
            await this.billItemService.saveBillItem(billItems);
            let newBillData = await this.billingService.getSingleBill(id);
            return newBillData;
        }catch(e){
            const error = {
                "code": e.code,
                "errno": e.errno,
                "name": e.name,
            }
            throw new HttpException(error, 404);
        }
    }

    @Post(':id/payment')
    @UseGuards(new AuthGuard())
    async savePayment(@Param('id') id:number,@Body() data){
        try{
            const mobile = data.mobileNo;
            let customer = await this.customerService.getCustomerByMobile(mobile);
            let customerId;
            if(customer){
                customerId = customer.id;
            }else{
                let customerData: CustomerDto = {
                    name: data.customer_name,
                    mobile: mobile
                } 
                customer = await this.customerService.create(customerData);
                customerId = customer.id;
            }
            const paymentData: PaymentDto ={
                paidamount:data.paidamount,
                customer_id: customerId,
                bill_id: id,
                paymentMode: data.paymentMode
            }
            console.log(paymentData);
            await this.paymentService.addPayment(paymentData);
            const {othercharge,bill_amount} = data;
            let billUpdateData: Billing ={
                totalAmount: othercharge + bill_amount,
                othercharge: othercharge,
                billstatus: 2,
                customer_id: customerId
            } 
            await this.billingService.updateBill(id,billUpdateData)
            let newBillData = await this.billingService.getSingleBill(id);
            return newBillData;
        }catch(e){
            const error = {
                "code": e.code,
                "errno": e.errno,
                "name": e.name,
            }
            throw new HttpException(error, 404);
        }
    }
}
