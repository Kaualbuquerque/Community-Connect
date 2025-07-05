import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { MessageService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dt";

@Controller("messages")
export class MessageController {
    constructor(private readonly messagesService: MessageService) { }

    @Post()
    create(@Body() dto: CreateMessageDto) {
        return this.messagesService.create(dto);
    }

    @Get()
    findAll(){
        return this.messagesService.findAll();
    }

    @Get(":id")
    findOne(@Param("is") id: number){
        return this.messagesService.findOne(id);
    }

    @Delete(":id")
    remove(@Param("id") id: number){
        return this.messagesService.remove(id);
    }
}