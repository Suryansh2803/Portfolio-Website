import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  
import tailwindcss from '@tailwindcss/vite'
import { handleLeetCodeRequest } from './server/leetcode.js'

function profileApi() {
  return {
    name: 'portfolio-profile-api',
    configureServer(server) {
      server.middlewares.use('/api/leetcode', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.setHeader('Allow', 'GET')
          res.end('Method not allowed')
          return
        }
        await handleLeetCodeRequest(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), profileApi()],
})
