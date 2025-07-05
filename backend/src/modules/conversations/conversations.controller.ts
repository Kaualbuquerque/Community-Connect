import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ConversationService } from "./conversations.service";
import { CreateConversationDto } from "./dto/create-conversation.dto";

@Controller('conversations')
export class ConversationsController {
    constructor(private readonly convService: ConversationService) { }

    @Post()
    create(@Body() dto: CreateConversationDto) {
        return this.convService.create(dto);
    }

    @Get()
    findAll() {
        return this.convService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.convService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.convService.remove(id);
    }
}