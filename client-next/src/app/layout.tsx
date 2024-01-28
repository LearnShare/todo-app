import React from 'react';
import type {
  Metadata,
} from 'next';

import {
  Theme,
} from '@radix-ui/themes';

import './layout.scss';
import '@radix-ui/themes/styles.css';

export const metadata: Metadata = {
  title: 'Todo Web App',
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body>
        <Theme>
          { children }
        </Theme>
      </body>
    </html>
  );
}

export default RootLayout;
