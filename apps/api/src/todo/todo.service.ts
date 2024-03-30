import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateTodoDto) {
    return this.prismaService.todo.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.todo.findMany();
  }

  findOne(id: string) {
    return this.prismaService.todo.findUnique({
      where: { id },
    });
  }

  update(id: string, body: UpdateTodoDto) {
    Logger.log(`Looking for todo with id: ${id}`);

    const existingTodo = this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      throw new NotFoundException("Todo not found");
    }

    Logger.log(`Updating todo:`);
    Logger.log(JSON.stringify(body));

    return this.prismaService.todo.update({
      where: { id },
      data: body,
    });
  }

  remove(id: string) {
    Logger.log(`Deleting todo with id: ${id}`);
    return this.prismaService.todo.delete({
      where: { id },
    });
  }
}
