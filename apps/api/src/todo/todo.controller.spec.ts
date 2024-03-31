// todo.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

describe("TodoController", () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a todo", async () => {
    const dto = new CreateTodoDto();
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should get all todos", async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it("should get a todo by id", async () => {
    const id = "some-id";
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it("should update a todo", async () => {
    const id = "some-id";
    const dto = new UpdateTodoDto();
    await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it("should remove a todo", async () => {
    const id = "some-id";
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
