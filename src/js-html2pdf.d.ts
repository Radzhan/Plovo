declare module 'js-html2pdf' {
    interface Html2PdfOptions {
      margin?: number;
      filename?: string;
      image?: { type: string; quality: number };
      html2canvas?: {};
      jsPDF?: { unit: string; format: string | number[]; orientation: string };
    }
  
    class Html2Pdf {
      constructor(element: HTMLElement, options: Html2PdfOptions);
      getPdf: (arg: Html2PdfOptions) => Promise<void>;
    }
  
    export default Html2Pdf;
  }
  