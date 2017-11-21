import React from 'react';
import PropTypes from 'prop-types';

const ChevronLeft = ({ size, color }) => (
  <svg
    version="1.1"
    viewBox="0 0 36 36"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    transform="rotate(-90)"
  >
    <path
      fill={color}
      d="M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z"
    />
  </svg>
);


ChevronLeft.displayName = 'ChevronLeft';

ChevronLeft.defaultProps = {
  size: '1em',
  color: 'currentColor',
};

ChevronLeft.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default ChevronLeft;
