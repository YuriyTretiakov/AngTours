import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';

function initializeApp(config: ConfigService) {
  return config.loadPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     providePrimeNG({
              theme: {
                  preset: Aura
        },
        translation: {
          dayNames: ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чв', 'Пт', 'Сб'],
          clear: 'Очистить',
          today: 'Сегодня'


          //translations
      }
  }),
  provideHttpClient(),
  provideAppInitializer(() => initializeApp(inject(ConfigService)))
    ]
};
