import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({ children, variants, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const defaultVariants = {
        hidden: { opacity: 0, y: 75 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants || defaultVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
