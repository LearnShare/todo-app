import React from 'react';

import styles from './layout.module.scss';

function LayoutAccount({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={ styles.layout }>
      <div className={ styles.content }>
        { children }
      </div>
    </div>
  );
}

export default LayoutAccount;
