/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prismaService:PrismaService){}
  
  async create({type,titre}: CreateNewsDto) {
    const currentDate = new Date();
const timestamp = currentDate.getTime();
   await this.prismaService.news.create({
    data:{
      titre,
      type
    }
    })
    return {
      code:200,
      message:'Created successfully'
    };
  }

  async findAll() {
    const news = await this.prismaService.news.findMany({
      select:{
        id:false,
        titre:true,
        type:true,
        date_et_heure:true
      }
    })

    if(!news.length){
      // throw new NotFoundException("No homes found")
      return []
    }

    return news;
  }

  async findOne(id: number) {
    const news = await this.prismaService.news.findUnique({
      where:{
          id
      }
  })

  if (!news) {
      // throw new HttpException("Introuvable",400)
      return []
  } 

    return news;
  }

  async update(id: number, data: UpdateNewsDto) {
    const news = await this.prismaService.news.findUnique({
      where:{
       id
      } 
   })

   if(!news){
       throw new NotFoundException("No home")
   }

 await this.prismaService.news.update({
       where:{
           id
          },
       data
   })
    return {
      code:200,
      message:"Updated successfully"
    };
  }

  async remove(id: number) {
    await this.prismaService.news.delete({
      where:{
          id
      }
  })
  return {
    code:200,
      message:"Deleted successfully"
  } ;
  }
}
