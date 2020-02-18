import React from 'react';

const button = (props) =>(
<button className={[classes.Button,classes[props.btnType]].join(' ')} onClick={props.click}>{props.children}</button>
);
export default button;