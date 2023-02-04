import { useEffect, useState } from 'react';
import { useGetBackgroundAnimItems } from './useGetBackgroundAnimItems';

export const Background = () => {
  const [windowSize, setWindowSize] = useState();
  if (windowSize) {}
  useEffect(()=>{
    window.addEventListener('resize', (e)=>{
      setWindowSize(Math.random()); // force update component
    })
  }, [])
  const spans = useGetBackgroundAnimItems();

  return <div style={{position:'absolute', overflow:'hidden', width:'100%', height:'100%', pointerEvents: 'none'}}>{spans}</div>;
};