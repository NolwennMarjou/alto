import React from 'react';
import Icon from './Icon';

const CheckList = props => (
  <Icon {...props}>
    {ownProps => (
      <path
        {...ownProps}
        d="M25.5,14.57a1,1,0,0,0-.25-.64L24,12.64a.86.86,0,0,0-1.23,0l-6,6.22-2.67-2.79a.84.84,0,0,0-1.23,0l-1.24,1.29a.94.94,0,0,0,0,1.28l4.52,4.72a.86.86,0,0,0,1.23,0l7.81-8.14A1,1,0,0,0,25.5,14.57ZM5.81,3H30.19A2.81,2.81,0,0,1,33,5.81V30.19A2.81,2.81,0,0,1,30.19,33H5.81A2.81,2.81,0,0,1,3,30.19V5.81A2.81,2.81,0,0,1,5.81,3Z"
      />
    )}
  </Icon>
);

export default CheckList;
