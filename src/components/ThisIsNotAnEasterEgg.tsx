import { useState, useEffect, useCallback } from 'react';

const EASTER_EGG_CODE = [84, 85, 75, 73]; // TUKI

const tukis: string[] = [
  '/tuki.webp',
  '/angry-tuki.webp'
];

interface TukiImage {
  id: number;
  src: string;
  position: number;
  show: boolean;
}

export default function EasterEgg() {
  const [inputSequence, setInputSequence] = useState<number[]>([]);
  const [tukiImages, setTukiImages] = useState<TukiImage[]>([]);

  const addNewTuki = useCallback(() => {
    const newTuki: TukiImage = {
      id: Date.now(),
      src: tukis[Math.floor(Math.random() * tukis.length)],
      position: Math.floor(Math.random() * 80),
      show: false
    };

    setTukiImages(prevTukis => [...prevTukis, newTuki]);

    // Trigger the enter animation
    setTimeout(() => {
      setTukiImages(prevTukis => 
        prevTukis.map(tuki => 
          tuki.id === newTuki.id ? { ...tuki, show: true } : tuki
        )
      );
    }, 50);

    // Start the exit animation
    setTimeout(() => {
      setTukiImages(prevTukis => 
        prevTukis.map(tuki => 
          tuki.id === newTuki.id ? { ...tuki, show: false } : tuki
        )
      );
    }, 1500);

    // Remove the tuki after the exit animation
    setTimeout(() => {
      setTukiImages(prevTukis => prevTukis.filter(tuki => tuki.id !== newTuki.id));
    }, 3000);
  }, []);

  useEffect(() => {
    const checkEasterEgg = (event: KeyboardEvent) => {
      setInputSequence(prev => {
        const newSequence = [...prev, event.keyCode];
        if (newSequence.length > EASTER_EGG_CODE.length) {
          newSequence.shift();
        }
        return newSequence;
      });
    };

    document.addEventListener('keydown', checkEasterEgg);

    return () => {
      document.removeEventListener('keydown', checkEasterEgg);
    };
  }, []);

  useEffect(() => {
    if (inputSequence.toString() === EASTER_EGG_CODE.toString()) {
      addNewTuki();
      setInputSequence([]);
    }
  }, [inputSequence, addNewTuki]);

  return (
    <>
      {tukiImages.map((tuki) => (
        <div 
          key={tuki.id}
          style={{
            position: 'fixed',
            left: `${tuki.position}%`,
            bottom: 0,
            transition: 'transform .7s ease-in-out',
            transform: tuki.show ? 'translateY(0)' : 'translateY(100%)',
            maxWidth: '15%',
            zIndex: 9999,
          }}
        >
          <img
            src={tuki.src}
            alt="Tuki Easter Egg"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      ))}
    </>
  );
}