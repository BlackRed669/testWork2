import { defineConfig } from 'vite';
import { quasar} from 'quasar';

export default defineConfig({
  plugins: [
    quasar({
      // другие настройки
    })
  ],
  server: {
    allowedHosts: [
      'testwork2-front.onrender.com', // Добавьте ваш хост здесь
      'localhost', // Местный хост (если необходимо)
    ],
  },
});