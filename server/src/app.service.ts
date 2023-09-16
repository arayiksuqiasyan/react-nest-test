import {Injectable} from '@nestjs/common';
import Stripe from "stripe";
import {ConfigService} from "@nestjs/config";
import {PaymentDto} from "./app.dto";

@Injectable()
export class AppService {
    constructor(private configService: ConfigService) {
    }

    payment(paymentDto: PaymentDto) {
        try {
            const stripe = new Stripe(this.configService.get('STRIPE_SECRET_TEST'), {apiVersion: '2023-08-16'})
            const payment = stripe.paymentIntents.create({
                amount: paymentDto.amount,
                currency: "USD",
                description: 'test',
                payment_method: paymentDto.id,
                confirm: true,
                automatic_payment_methods: {allow_redirects: 'never', enabled: true}
            })

            return {success: true, message: 'Payment Successful'}
        } catch (e) {
            console.log(e, 'Error')
        }
    }
}
