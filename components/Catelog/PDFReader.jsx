import React, {useState} from 'react'
import { Loader, ControlPanel } from '../../components/index';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';

export default function PDFReader({outSideNumber}) {

    const [scale, setScale] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [animating, setAnimating] = useState(false)
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);      
      }

      
    return (
        <div className='flex h-full items-center pb-40 w-4/6 flex-col p-10 bg-gray-200'>
        <Loader isLoading={isLoading} />

        <ControlPanel 
          hasOutsideNumber={outSideNumber} 
          setAnimating={setAnimating} 
          setScale={setScale} 
          numPages={numPages} 
          pageNumber={pageNumber} 
          setPageNumber={setPageNumber} 
        />
        
        <Document
          file="/assets/21EbMyEquibrand.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode='svg'
        >
          <div className='flex'>
            <Page 
              className={`${animating ? 'animate-pulse' : 'animate-none' }`} 
              renderTextLayer={false} renderMode='svg' 
              pageNumber={pageNumber} 
              scale={scale} 
            />
            
            {
                pageNumber - 1 > 0 && pageNumber + 1 < numPages  
                ? <Page 
                  className={`${animating ? 'animate-pulse' : 'animate-none' }`} 
                  renderTextLayer={false} renderMode='svg' pageNumber={pageNumber + 1} 
                  scale={scale} /> 
                : <></>
            }
            
          
          </div>
        </Document>
        
      </div>
    )
}
