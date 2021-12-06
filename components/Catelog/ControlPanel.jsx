import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faFastBackward, faFastForward, faForward } from '@fortawesome/free-solid-svg-icons';

export default function ControlPanel(props) {
    const {hasOutsideNumber, pageNumber, numPages, setPageNumber, setAnimating, setScale} = props;

    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === numPages;
  
    const firstPageClass = isFirstPage ? 'disabled cursor-not-allowed' : 'clickable cursor-pointer';
    const lastPageClass = isLastPage ? 'disabled cursor-not-allowed' : 'clickable cursor-pointer';


    useEffect(() => {
        if(Number(hasOutsideNumber) > 0){
            setPageNumber(Number(hasOutsideNumber));
        }
    }, [hasOutsideNumber])

    function animatePage(n){
        setAnimating(true);

        setTimeout(() => {
            if(!hasOutsideNumber){
                setPageNumber(n);
            }else{
                if(Number(hasOutsideNumber) > 0){
                    setPageNumber(n);
                }else{
                    setPageNumber(n);
                }
            }

            setAnimating(false);  
        }, 300);
    }

    const goToFirstPage = () => {

        if(!isFirstPage) animatePage(1);
        
        
    }
    const goToPreviousPage = () => {
        if(!isFirstPage) animatePage(pageNumber - 1);
    }
    const goToNextPage = () => {
        if(!isLastPage) animatePage(pageNumber + 1);
    }
    const goToLastPage = () => {
        if(!isLastPage) animatePage(numPages);
    }

    return (
        <div className="control-panel m-5 p-3 flex items-baseline justify-center">
            <FontAwesomeIcon onClick={goToFirstPage} icon={faFastBackward} className={`mx-3 ${firstPageClass}`}/>
            <FontAwesomeIcon onClick={goToPreviousPage} icon={faBackward} className='mx-3' className={`mx-3 ${firstPageClass}`}/>
            <p>Page {pageNumber} of {numPages}</p>
            <FontAwesomeIcon onClick={goToNextPage} icon={faForward} className={`mx-3 ${lastPageClass}`}/>
            <FontAwesomeIcon onClick={goToLastPage} icon={faFastForward} className={`mx-3 ${lastPageClass}`}/>
        </div>
    )
}
