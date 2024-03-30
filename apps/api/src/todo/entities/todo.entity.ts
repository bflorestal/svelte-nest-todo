import { Todo } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class TodoEntity implements Todo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
