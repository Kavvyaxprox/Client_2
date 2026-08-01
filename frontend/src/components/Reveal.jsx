import { useInView } from '../hooks/useInView';

function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
