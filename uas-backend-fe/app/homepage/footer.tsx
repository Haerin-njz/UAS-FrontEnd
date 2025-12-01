import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

const socialLinks = [
  { href: '#', icon: '/img/icons/facebook.png', label: 'Facebook' },
  { href: '#', icon: '/img/icons/instagram.png', label: 'Instagram' },
  { href: '#', icon: '/img/icons/twitter.png', label: 'Twitter' },
  { href: '#', icon: '/img/icons/youtube.png', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="media-social">
          {socialLinks.map((social, index) => (
            <Link key={index} href={social.href} className="social-link">
              <Image
                src={social.icon}
                alt={social.label}
                width={24}
                height={24}
                style={{ marginRight: '8px' }}
              />
              {social.label}
            </Link>
          ))}
        </div>
        <hr />
        <p className="copyright">&copy;Copyrights Kelompok 4</p>
      </Container>
    </footer>
  );
}