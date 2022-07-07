import Image from 'next/image';
import React from 'react';
import { styled } from '@nextui-org/react';

const Icon = ({ id, className, css, alt, width, height, ...htmlProps}) => {
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
  const Span = styled("span",{
    ...css
  })
  return (
    <Span
      className={`material-icons-round no-select ${className}`}
      {...htmlProps}>
      {id}
    </Span>
  );
}

Icon.defaultProps = {
    id:"add",
    width:"25px",
    height:"25px"
}

export default Icon
