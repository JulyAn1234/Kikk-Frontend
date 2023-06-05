import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

export default function Layout({ children }) {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setShowFooter(isScrollingUp || currentScrollPos === 0);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header>
        <Link href="/orders">See your orders</Link>
      </Header>
      <Container fixed style={{ flex: 1 }}>
        <main>{children}</main>
      </Container>
      <div style={{ transform: showFooter ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s' }}>
        <Footer />
      </div>
    </div>
  );
}
