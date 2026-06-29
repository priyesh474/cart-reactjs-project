import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import b1 from '../../assets/banners/banner1.jpg';
import b2 from '../../assets/banners/banner2.jpg';
import b3 from '../../assets/banners/banner3.jpg';
import './BannerSlider.css';

const SLIDES = [
  {
    img: b1,
    eyebrow: 'New Arrivals — 2025',
    heading: ['Discover', <em key="e">Premium</em>, ' Tech'],
    sub: 'Explore our curated electronics collection — from cutting-edge gadgets to everyday essentials.',
    cta: 'Shop Electronics',
    ctaLink: '/products',
  },
  {
    img: b2,
    eyebrow: 'Summer Collection',
    heading: ['Style', ' Meets', <em key="e"> Comfort</em>],
    sub: 'Elevated fashion for every occasion. Fresh styles in clothing, footwear & accessories.',
    cta: 'Shop Fashion',
    ctaLink: '/products',
  },
  {
    img: b3,
    eyebrow: 'Exclusive Deals',
    heading: [<em key="e">Luxury</em>, ' For', ' Less'],
    sub: 'Top-rated products at unbeatable prices. Free shipping on orders above ₹999.',
    cta: 'View Deals',
    ctaLink: '/products',
  },
];

const BADGES = [
  { icon: '🚚', label: 'Free Shipping' },
  { icon: '↩', label: 'Easy Returns' },
  { icon: '🔒', label: 'Secure Pay' },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 420);
  }, [animating]);

  const next = useCallback(() => go((current + 1) % SLIDES.length), [current, go]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4500);
  }, [next]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleDotClick = (i) => { go(i); startTimer(); };

  const slide = SLIDES[current];

  return (
    <div className="banner-wrap">
      <img
        key={current}
        src={slide.img}
        className="banner-img"
        alt={`Slide ${current + 1}`}
        style={{ opacity: animating ? 0 : 1 }}
      />

      <div className="banner-overlay" />

      <div className="slide-counter">
        <span>{String(current + 1).padStart(2, '0')}</span>
        {' / '}
        {String(SLIDES.length).padStart(2, '0')}
      </div>

      <div
        className="slide-content"
        key={'content-' + current}
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(calc(-50% + 14px))' : 'translateY(-50%)',
        }}
      >
        <div className="slide-eyebrow">{slide.eyebrow}</div>
        <h2>{slide.heading}</h2>
        <p>{slide.sub}</p>
        <Link to={slide.ctaLink} className="slide-cta">{slide.cta} →</Link>
      </div>

      <div className="banner-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="banner-badges">
        {BADGES.map(b => (
          <div className="banner-badge" key={b.label}>
            <span className="banner-badge-icon">{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
