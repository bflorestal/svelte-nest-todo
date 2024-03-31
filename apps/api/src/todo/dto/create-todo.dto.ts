import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiPropertyOptional({ default: false })
  completed?: boolean = false;
}
