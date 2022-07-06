import React from 'react';

export const ArrowIcon: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="12"
      fill="none"
      style={style}
    >
      <path
        fill="#000"
        d="M.15 5.907c0 .13.054.246.157.342l4.6 4.614a.478.478 0 00.335.144c.26 0 .458-.192.458-.451a.499.499 0 00-.123-.329l-2.05-2.064L1.51 6.29l1.586.075h9.297a.44.44 0 00.45-.458.44.44 0 00-.45-.458H3.096l-1.586.075 2.016-1.873 2.051-2.064a.478.478 0 00.123-.328.444.444 0 00-.458-.451c-.123 0-.24.047-.369.177L.307 5.565a.46.46 0 00-.158.342z"
      ></path>
    </svg>
  );
};
