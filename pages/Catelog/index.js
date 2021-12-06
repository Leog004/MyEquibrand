import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import { PDFReader, SideBar } from '../../components'
import { useRouter } from 'next/router'
export default function Catelog() {

    // Using the state component as a global variable that will be used to 
    // share information from sideBar and PDFREADER
    const [outSideNumber, setoutSideNumber] = useState(0)
    const router = useRouter()

        // Checking whether the user is logged in or not. 
        const { data: session, status } = useSession({
          required: true,
          onUnauthenticated() {
            // The user is not authenticated, handle it here.
            // Since the user is not logged in. We are going to redirect them to the signIn Page
            return router.push(
                  '/auth/signIn'
              )
          }
      })

      if( status === "loading" || !session) {
        return <h1>Loading...</h1>
    }

  return (
    <div className='flex overflow-hidden'>
      <SideBar setoutSideNumber={setoutSideNumber} /> {/* Setting the outside variable if they enter a number on search bar */}
      <PDFReader outSideNumber={outSideNumber} /> {/* Sening outsideNumber value to PDFREADER */}
    </div>
  )
}
