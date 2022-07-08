import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
  //구현할 기능: 상태를 public아니면 private만 올 수 있도록
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any) {
    //value = 우리가 준 상태값
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException("이 상태는 옵션으로 사용할 수 없습니다.");
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
