import React from 'react';
import {
  Text,
} from '@radix-ui/themes';
import {
  ArrowRightIcon,
} from '@radix-ui/react-icons';

import styles from './link.module.scss';

interface ListLinkProps {
  id: number;
  name: string;
}

function ListLink({
  id,
  name,
}: ListLinkProps) {
  return (
    <a
        className={ styles.link }
        href={ `/list/${ id }` }>
      <Text
          className={ styles.name }>{ name }</Text>
      <ArrowRightIcon
          className={ styles.icon }
          width="18"
          height="18" />
    </a>
  );
}

export default ListLink;
