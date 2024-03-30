import { CreateTodoDto } from "./create-todo.dto";
import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
