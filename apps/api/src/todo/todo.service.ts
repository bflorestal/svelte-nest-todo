import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateTodoDto) {
    return await this.prismaService.todo.create({
      data,
    });
  }

  async findAll() {
    return await this.prismaService.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    const todo = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException("Todo not found");
    }

    return await this.prismaService.todo.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateTodoDto) {
    Logger.log(`Looking for todo with id: ${id}`);

    const existingTodo = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      throw new NotFoundException("Todo not found");
    }

    Logger.log(`Updating todo:`);
    Logger.log(JSON.stringify(data));

    return await this.prismaService.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    Logger.log(`Deleting todo with id: ${id}`);
    const existingTodo = await this.prismaService.todo.findUnique({
      where: { id },
    });
    if (!existingTodo) {
      throw new NotFoundException("Todo not found");
    }
    return await this.prismaService.todo.delete({
      where: { id },
    });
  }
}
