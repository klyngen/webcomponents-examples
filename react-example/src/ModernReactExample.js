
import { OvertimeVisualizer } from 'overtime-visualizer';
import React, {useState} from 'react';
import {wrapWc} from 'wc-react';

const ModernReactExample = () => {
  const OtVisualizer = wrapWc("overtime-visualizer");
  const [hours, setHours] = useState(0);
  const [overtime] = useState(
      [
        {name: 'Free overtime', color: '#F77', value: 10, priority: 1},
        {name: 'Valuable overtime', color: '#FF7', value: 15, priority: 2},
        {name: 'Premium overtime', color: '#77F', value: 20, priority: 3}
      ]);
    console.log(overtime); 
    return (
      <div key="smtng" className="ModernReactExample">
        <hr/>

        <input type="number" onChange={(event) => setHours(event.target.value)}/>
        <OtVisualizer subtract={hours} overtimeData={overtime} />
      </div>
    ); 
  
}

export default ModernReactExample;
