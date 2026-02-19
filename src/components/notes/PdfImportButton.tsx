import { extractTextFromPdf } from '@/lib/pdf/extractText'
import { Button } from '@/components/ui/button'

export function PdfImportButton({ onImport }: { onImport: (text: string) => void }) {
  return (
    <label>
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          try {
            const text = await extractTextFromPdf(file)
            onImport(text || 'No text extracted from PDF.')
          } catch {
            onImport('PDF extraction failed. You can still add notes manually.')
          }
        }}
      />
      <Button type="button">Import PDF</Button>
    </label>
  )
}
