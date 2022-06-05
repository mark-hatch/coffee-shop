import React from 'react';
import styles from './Layout.module.css';
import { Link } from 'gatsby';

export default function Layout({ children }) {
  return (
    <div>
      <header id={styles.header}>
        <div id={styles.inner}>
          <h1><Link to="/">Joe's Coffee Shop</Link></h1>
        </div>
      </header>
      <main id={styles.main}>
        {children}
      </main>
    </div>
  );
}
