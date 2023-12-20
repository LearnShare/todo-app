import React from 'react';

import styles from './index.module.scss';

import icons from '@/assets/icons.svg';

interface IconProps {
  name: string,
  onClick: () => void,
}

function Icon(
  {
    name,
    onClick,
  }: IconProps
) {
  return (
    <span
        className={ styles.icon }
        onClick={ onClick }>
      <svg
          viewBox="0 0 24 24">
        <use
            xlinkHref={ `${ icons }#${ name }` } />
      </svg>
    </span>
  );
}

export default Icon;
