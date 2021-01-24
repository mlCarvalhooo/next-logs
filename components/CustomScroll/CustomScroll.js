import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';


export default function CustomScrollbar({ children, className, ...restProps }) {    
  return (
      
    <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight={true}
        autoHeightMax={'100%'}
        autoHeightMin={'100%'}
        thumbMinSize={30}
        universal={true}
        {...restProps   }>
            {children}
        </Scrollbars>

  );
}