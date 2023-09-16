import {Body, Controller, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {PaymentDto} from "./app.dto";


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post('payment')
    payment(@Body() paymentDto: PaymentDto) {
        return this.appService.payment(paymentDto);
    }
}
