import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "./note.entity";
import { Repository } from "typeorm";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private noteRepository: Repository<Note>
    ) { }

    async create(dto: CreateNoteDto): Promise<Note> {
        const note = this.noteRepository.create(dto);
        return this.noteRepository.save(note);
    }

    async findAll(): Promise<Note[]> {
        return this.noteRepository.find();
    }

    async findOne(id: number): Promise<Note> {
        const note = await this.noteRepository.findOneBy({ id });
        if (!note) throw new NotFoundException(`Note with id ${id} not found`);
        return note;
    }

    async update(id: number, dto: UpdateNoteDto): Promise<Note> {
        await this.noteRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        const result = await this.noteRepository.delete(id);
        if(result.affected === 0) throw new NotFoundException(`Note #${id} not found`);
    }
}
