import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Dev-only plugin: receives session POSTs and writes JSON logs to src/data/sessions/
function sessionLoggerPlugin() {
  return {
    name: 'session-logger',
    configureServer(server) {
      server.middlewares.use('/api/log-session', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', () => {
          try {
            const session = JSON.parse(body)
            const dir = path.resolve(__dirname, 'src/data/sessions')
            fs.mkdirSync(dir, { recursive: true })
            const file = path.join(dir, `session-${session.sessionId}.json`)
            fs.writeFileSync(file, JSON.stringify(session, null, 2), 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true }))
          } catch {
            res.statusCode = 500
            res.end()
          }
        })
      })
    },
  }
}

export default defineConfig({
  base: '/mar_portfolio/',
  plugins: [react(), sessionLoggerPlugin()],
  assetsInclude: ['**/*.docx'],
  optimizeDeps: {
    exclude: ['@huggingface/transformers'],
  },
  worker: {
    format: 'es',
  },
  build: {
    chunkSizeWarningLimit: 25000,
    rollupOptions: {
      output: {
        manualChunks: {
          'transformers': ['@huggingface/transformers'],
        },
      },
    },
  },
})
