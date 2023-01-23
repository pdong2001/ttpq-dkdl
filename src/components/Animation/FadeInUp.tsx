import { HTMLMotionProps, Variants, motion } from 'framer-motion';

const fadeInVariants: Variants = {
  start: {
    opacity: 0,
    translateY: 10,
  },
  end: {
    opacity: 1,
    translateY: 0,
  },
};

type FadeInUpProps = {
  delay?: number;
  duration?: number;
  viewport?: number;
} & HTMLMotionProps<'div'>;

const FadeInUp = (props: FadeInUpProps) => {
  const { delay, duration, viewport } = props;
  return (
    <motion.div
      variants={fadeInVariants}
      initial='start'
      whileInView='end'
      viewport={{ once: true, amount: viewport }}
      transition={{ delay, ease: [0.4, 0, 0.2, 1], duration }} //cubic-bezier(0.4, 0, 0.2, 1)
      {...props}
    />
  );
};

FadeInUp.defaultProps = {
  delay: 0.3,
  duration: 1,
  viewport: 0.3,
};

export default FadeInUp;
