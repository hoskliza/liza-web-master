import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  renderIndex() {
    return '';
  }

  @Get('1200kkal')
  @Render('pages/1200kkal.pug')
  renderKkal() {
    return '';
  }

  @Get('about')
  @Render('pages/about')
  renderabout() {
    return '';
  }

  @Get('clementin')
  @Render('pages/clementin')
  renderclementin() {
    return '';
  }

  @Get('contacts')
  @Render('pages/contacts')
  rendercontacts() {
    return '';
  }

  @Get('habits')
  @Render('pages/habits')
  renderhabits() {
    return '';
  }

  @Get('nutrition')
  @Render('pages/nutrition')
  rendernutrition() {
    return '';
  }

  @Get('podsoznanie')
  @Render('pages/podsoznanie')
  renderpodsoznanie() {
    return '';
  }

  @Get('poleznie_privichki')
  @Render('pages/poleznie_privichki')
  renderpoleznie_privichki() {
    return '';
  }
  @Get('poxydenie_bez_trenirovok')
  @Render('pages/poxydenie_bez_trenirovok')
  renderpoxydenie_bez_trenirovok() {
    return '';
  }

  @Get('propositions')
  @Render('pages/propositions')
  renderpropositions() {
    return '';
  }
  @Get('protMaf')
  @Render('pages/protMaf')
  renderprotMaf() {
    return '';
  }

  @Get('self-development')
  @Render('pages/self-development')
  renderself_development() {
    return '';
  }
  @Get('sport')
  @Render('pages/sport')
  rendersport() {
    return '';
  }

  @Get('sport1')
  @Render('pages/sport1')
  rendersport1() {
    return '';
  }

  @Get('auth')
  @Render('pages/auth')
  renderAuth() {
    return '';
  }

  @Get('chat')
  @Render('pages/chat')
  renderChat() {
    return '';
  }
}
