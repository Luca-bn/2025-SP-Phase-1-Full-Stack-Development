import { ReactNode } from 'react';
import classes from './Card.module.css';

const Card = (props: { className?: string, children: ReactNode }) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
