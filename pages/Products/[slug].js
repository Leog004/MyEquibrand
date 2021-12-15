import React from 'react'
import { Breadcrums, HeaderBlock, } from '../../components'

export default function Slug({props}) {
    return (
        <>
           <HeaderBlock />
           <Breadcrums pageBehind='Products' current='Slug Page' />
        </>
    )
}
