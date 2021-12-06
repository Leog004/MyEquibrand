import React, {useState} from 'react'
import { PDFReader, SideBar } from '../../components'
export default function Catelog() {

    // Using the state component as a global variable that will be used to 
    // share information from sideBar and PDFREADER
    const [outSideNumber, setoutSideNumber] = useState(0)

  return (
    <div className='flex overflow-hidden'>
      <SideBar setoutSideNumber={setoutSideNumber} /> {/* Setting the outside variable if they enter a number on search bar */}
      <PDFReader outSideNumber={outSideNumber} /> {/* Sening outsideNumber value to PDFREADER */}
    </div>
  )
}
