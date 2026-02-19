export async function extractTextFromPdf(file: File) {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs'

  const bytes = await file.arrayBuffer()
  const doc = await pdfjsLib.getDocument({ data: bytes }).promise
  let fullText = ''

  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    fullText += `${content.items.map((item) => ('str' in item ? item.str : '')).join(' ')}\n`
  }

  return fullText.trim()
}
