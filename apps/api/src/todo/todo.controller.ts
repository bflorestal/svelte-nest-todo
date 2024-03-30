import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  // HttpException,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoEntity } from "./entities/todo.entity";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller("todo")
@ApiTags("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiCreatedResponse({ type: TodoEntity })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: TodoEntity })
  async findOne(@Param("id") id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOkResponse({ type: TodoEntity })
  async update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: TodoEntity })
  async remove(@Param("id") id: string) {
    return this.todoService.remove(id);
  }
}
