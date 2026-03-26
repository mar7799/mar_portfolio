/**
 * Uses the browser Canvas API to:
 *  1. Add ~12% transparent padding at the top so the full hairline is visible
 *  2. Remove the white/near-white background via flood-fill from all edges
 *
 * Returns a PNG data-URL. Subsequent calls with the same src return a cached result.
 */

const cache = new Map<string, string>()

const WHITE_THRESHOLD = 238   // pixels with R,G,B all above this are treated as background
const TOP_PAD_RATIO   = 0.10  // how much extra height to add above the original image

export async function processAvatar(src: string): Promise<string> {
  if (cache.has(src)) return cache.get(src)!

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const topPad = Math.round(img.height * TOP_PAD_RATIO)
      const W = img.width
      const H = img.height + topPad

      const canvas = document.createElement('canvas')
      canvas.width  = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!

      // Draw original image offset downward so there's space above for the hair
      ctx.drawImage(img, 0, topPad)

      const id   = ctx.getImageData(0, 0, W, H)
      const data = id.data

      const isBackground = (idx: number) =>
        data[idx]   > WHITE_THRESHOLD &&
        data[idx+1] > WHITE_THRESHOLD &&
        data[idx+2] > WHITE_THRESHOLD

      const visited = new Uint8Array(W * H)

      // Seed flood-fill from all four edges
      const stack: number[] = []
      const enqueue = (px: number) => {
        if (!visited[px] && isBackground(px * 4)) {
          visited[px] = 1
          stack.push(px)
        }
      }

      for (let x = 0; x < W; x++) {
        enqueue(x)               // top edge (transparent padding row)
        enqueue((H - 1) * W + x) // bottom edge
      }
      for (let y = 0; y < H; y++) {
        enqueue(y * W)           // left edge
        enqueue(y * W + W - 1)   // right edge
      }

      // BFS flood fill — make background pixels fully transparent
      while (stack.length) {
        const px = stack.pop()!
        const idx = px * 4
        data[idx + 3] = 0         // alpha → 0

        const x = px % W
        const y = (px - x) / W

        if (x > 0)     enqueue(px - 1)
        if (x < W - 1) enqueue(px + 1)
        if (y > 0)     enqueue(px - W)
        if (y < H - 1) enqueue(px + W)
      }

      ctx.putImageData(id, 0, 0)
      const dataUrl = canvas.toDataURL('image/png')
      cache.set(src, dataUrl)
      resolve(dataUrl)
    }

    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}
