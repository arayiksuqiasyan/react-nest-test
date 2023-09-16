import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type AdminUserDocument = HydratedDocument<AdminUser>;

@Schema()
export class AdminUser {

    @Prop()
    name: string;

    @Prop()
    login: string;

    @Prop()
    password: string;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
