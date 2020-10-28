import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta content={description} name='description' />
            <meta content={keywords} name='keywords' />
        </Helmet>
    )
   
}
Meta.defaultProps ={
    title:'Welcome To Proshop | Home',
    description:'Well sell the best products for cheap',
    keywords:'Electronics,buy electronics cheap electronics'
}
export default Meta
