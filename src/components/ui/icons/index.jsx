import Image from 'next/image';
import React from 'react';
import { styled, Text } from '@nextui-org/react';

const Icon = ({ id, className,as, css, alt, width, height, ...htmlProps }) => {
  if (id.indexOf('/') > -1) {
    return (
      <div>
        <Image
          src={id}
          className={className}
          width={width}
          height={height}
          alt={alt}
          {...htmlProps} />
      </div>
    )
  }
  return (
    <Text as={as || "span"}
      css={{...css}}
      className={`material-icons-round no-select ${className}`}
      {...htmlProps}>
      {id}
    </Text>
  );
}

Icon.defaultProps = {
  id: "add",
  width: "25px",
  height: "25px"
}

export default Icon
