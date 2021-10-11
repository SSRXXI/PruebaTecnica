import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'

export default function SexoItem({sexo, sexoInput} ) {
    const handleSexo = (e) =>{

        const sex = sexo.filter(s => s.codigo.toString() === e.target.value)

        sexoInput(sex[0].codigo);
    }
    return (
     
            sexo.map(s => 
                <Fragment>
                <Form.Check inline label = {s.nombre} key={s.codigo} type='radio' value={s.codigo} name='sexo' id={s.codigo} onChange={handleSexo}/>
         
                </Fragment>
               
          
                
        
          
            )
     
    )
}
