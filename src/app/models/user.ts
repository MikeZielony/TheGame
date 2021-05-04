export class User {
  key: string;
  name: string;
  position: number;
  color: ColorUser;
  active: boolean;
  picture: string;
  isMove: boolean;
  hash: string;

  constructor(input: IUserDto) {
    this.key = input.key;
    this.name = input.name;
    this.position = input.position;
    this.color = this.assignColor(input.color);
    this.active = input.active;
    this.picture = input.picture;
    this.isMove = input.isMove;
    this.hash = input.hash;
  }

  private assignColor(color: string): ColorUser {
    switch (color) {
      case 'red':
        return ColorUser.red;

      case 'blue':
        return ColorUser.blue;

      case 'yellow':
        return ColorUser.yellow;

      case 'green':
        return ColorUser.green;

      default:
        return ColorUser.green;
    }

  }
}

export enum ColorUser {
  red = 'red',
  green = 'green',
  yellow = 'yellow',
  blue = 'blue'
}

export interface IUserDto {
  color: string;
  active: boolean;
  key: string;
  name: string;
  position: number;
  picture: string;
  isMove: boolean;
  hash: string;
}
