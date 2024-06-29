import { useEffect } from 'react';
import { Hero, Topics, Basic, About } from '../../components';

const Home = () => {
  useEffect(() => {
    document.title = 'Beranda - Visualize Image Processing';
  }, []);
  return (
    <div className="">
      <Hero />
      <Topics />
      <Basic />
      <About />
    </div>
  );
};

export default Home;
