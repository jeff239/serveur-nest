/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    titre: string;
}
