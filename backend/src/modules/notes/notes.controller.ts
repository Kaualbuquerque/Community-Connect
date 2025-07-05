import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { NoteService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Controller("notes")
export class NotesController {
    constructor(private readonly noteService: NoteService) { }

    @Post()
    create(@Body() dto: CreateNoteDto) {
        return this.noteService.create(dto);
    }

    @Get()
    findAll() {
        return this.noteService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.noteService.findOne(id);
    }

    @Put(":id")
    update(@Param("id") id: number, dto: UpdateNoteDto) {
        return this.noteService.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.noteService.remove(id);
    }
}