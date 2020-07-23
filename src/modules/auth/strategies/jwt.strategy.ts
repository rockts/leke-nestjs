import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'o2Vqc2MY7pa0p2nzFzRvWUMFWkoVhLcI',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload', payload);
  }
}
