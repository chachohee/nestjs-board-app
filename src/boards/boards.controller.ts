import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";

@Controller("boards")
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get("/:id")
  getBoardById(@Param("id") id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }
  // @Get()
  // getAllBoards(): Board[] {
  //   return this.boardService.getAllBoards();
  // }

  // @Post()
  // @UsePipes(ValidationPipe) //유효성체크하고 싶으니까 ValidationPipe 사용
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardService.getBoardById(id);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
