import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: false, default: false })
  completed?: boolean = false;
}
