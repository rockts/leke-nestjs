import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'o2Vqc2MY7pa0p2nzFzRvWUMFWkoVhLcI',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('payload', payload);
    const { name } = payload;
    const entity = await this.userService.findByName(name);

    if (!entity) {
      throw new UnauthorizedException('没找到用户。');
    }

    return entity;
  }
}
