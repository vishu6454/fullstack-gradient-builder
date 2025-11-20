// components/GradientSync.jsx
import { useEffect } from 'react';
import { applyGradientToBody } from '../hooks/useGradient';

const GradientSync = () => {
  useEffect(() => {
    // Apply saved gradient when component mounts
    const savedColors = localStorage.getItem('gradientColors');
    if (savedColors) {
      const { color1, color2 } = JSON.parse(savedColors);
      applyGradientToBody(color1, color2);
    }
  }, []);

  return null;
};

export default GradientSync;