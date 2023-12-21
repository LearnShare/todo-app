import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

import icons from '@/assets/icons.svg';

interface IconProps {
  name: string,
  className?: string,
  onClick?: () => void,
}

function Icon(
  {
    name,
    className,
    onClick,
  }: IconProps
) {
  return (
    <span
        className={
          clsx(
            styles.icon,
            className,
          )
        }
        onClick={ () => onClick() }>
      <svg
          viewBox="0 0 24 24">
        <use
            xlinkHref={ `${ icons }#${ name }` } />
      </svg>
    </span>
  );
}

export default Icon;
