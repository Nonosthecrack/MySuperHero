import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: { mode: string }) => {
  // load .env files
  // only load env vars that start with VITE_ to avoid leaking other process envs
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const token = env.VITE_SUPERHERO_API_KEY;

  return defineConfig({
    plugins: [vue()],
    base: '/MySuperHero/',
    server: {
      port: 3000,
      open: true,
      proxy: {
        // Proxy requests starting with /api/superhero to the external API and inject token
        '/api/superhero': {
          target: 'https://superheroapi.com/api',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => {
            // Replace /api/superhero with /<TOKEN>
            if (!token) {
              // let it pass to show clear errors
              return path.replace(/^\/api\/superhero/, '/');
            }
            return path.replace(/^\/api\/superhero/, `/${token}`);
          }
        }
      }
    }
  })
}