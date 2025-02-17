import React, { ReactNode } from 'react';
import styles from '@/styles/Box.module.scss';

type Props = {
  children: ReactNode;
};

export const Flex = (props: Props) => {
  return <div className={styles.flex}>{props.children}</div>;
};
