import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Katex = ({ mathExpression }) => {
  const mathRef = useRef(null);
  useEffect(() => {
    if (mathRef.current) {
      try {
        katex.render(mathExpression, mathRef.current, {
          throwOnError: false
        });
      } catch (error) {
        console.error('Error rendering math:', error);
      }
    }
  }, [mathExpression]);

  return <span ref={mathRef} />;
};

export default Katex;
