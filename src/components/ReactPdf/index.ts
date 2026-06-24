// Lazy-loads react-pdf and points it at a CDN-free worker bundled via pdfjs-dist,
// so consumers don't have to wire up the PDF.js worker themselves.
import { Document, Page, pdfjs } from 'react-pdf';

if (typeof window === 'object') {
  // Skip when loading server-side (e.g. Next.js)
  try {
    const pdfjsWorkerUrl = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url);
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl.toString();
  } catch {
    // Doesn't work in a test environment when Jest is running it; do nothing
  }
}

export { Document, Page };
