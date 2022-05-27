import Image from 'next/image';
import React from 'react';

const Icon = ({ id, className, width, height, ...htmlProps}) => {
  if (id.indexOf('/') > -1) {
    return (
      <Image
        src={id}
        className={className}
        width={width}
        height={height}
        alt={alt} 
        {...htmlProps}/>
    )
  }
  return (
    <span
      className={`material-icons-round no-select ${className}`}
      {...htmlProps}>
      {id}
    </span>
  );
}

Icon.defaultProps = {
    id:"add",
    width:"25px",
    height:"25px"
}

export default Icon
