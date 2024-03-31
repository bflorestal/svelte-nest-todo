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
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoEntity } from "./entities/todo.entity";
import {
  ApiCreatedResponse,
  // ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

@Controller("/api/todo")
@ApiTags("Todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: "Create a new todo" })
  @ApiCreatedResponse({ type: TodoEntity })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all todos" })
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a todo by id" })
  @ApiOkResponse({ type: TodoEntity })
  async findOne(@Param("id") id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: "Update a todo" })
  @ApiOkResponse({ type: TodoEntity })
  async update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a todo" })
  @ApiOkResponse({ type: TodoEntity })
  async remove(@Param("id") id: string) {
    return this.todoService.remove(id);
  }
}
