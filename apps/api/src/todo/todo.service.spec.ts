// todo.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { TodoService } from "./todo.service";
import { PrismaService } from "../prisma/prisma.service";

describe("TodoService", () => {
  let service: TodoService;
  let prisma: PrismaService;

  const mockTodo = { id: "1", title: "Test Todo", completed: false };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useValue: {
            todo: {
              create: jest.fn().mockResolvedValue(mockTodo),
              findMany: jest.fn().mockResolvedValue([mockTodo]),
              findUnique: jest.fn().mockResolvedValue(mockTodo),
              update: jest.fn().mockResolvedValue(mockTodo),
              delete: jest.fn().mockResolvedValue(mockTodo),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create should return a new todo", async () => {
    expect(await service.create({ title: "Test Todo" })).toEqual(mockTodo);
    expect(prisma.todo.create).toHaveBeenCalledWith({
      data: { title: "Test Todo" },
    });
  });

  it("findAll should return an array of todos", async () => {
    await expect(service.findAll()).resolves.toEqual([mockTodo]);
    expect(prisma.todo.findMany).toHaveBeenCalled();
  });

  it("findOne should return a single todo item", async () => {
    const id = mockTodo.id;
    await expect(service.findOne(id)).resolves.toEqual(mockTodo);
    expect(prisma.todo.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it("update should modify and return the todo item", async () => {
    const updateDto = { title: "Updated Title", completed: true };
    await expect(service.update(mockTodo.id, updateDto)).resolves.toEqual(
      mockTodo,
    );
    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: mockTodo.id },
      data: updateDto,
    });
  });

  it("remove should delete the todo item", async () => {
    const id = mockTodo.id;
    await expect(service.remove(id)).resolves.toEqual(mockTodo);
    expect(prisma.todo.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
