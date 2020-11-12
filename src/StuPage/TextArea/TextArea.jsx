import React, { useState, useEffect } from 'react'
import axios from "axios"
import {TextArea, FormGroup}  from '@blueprintjs/core'
import './TextArea.css'

const Textarea = () => {


    return (
        <div className='Area'>
            <FormGroup
            label=' Enter Feedback Questions Below'
            labelFor='file-desc-input'
            
            >
                <TextArea
                    growVertically={true}
                    fill={true}
                    large={true}
                    id='file-desc-input'
                    placeholder='Write questions'
                    className='bp3-fill'
                    
                />
            </FormGroup>

        </div>
    )
}
export default Textarea;