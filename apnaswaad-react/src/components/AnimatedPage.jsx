import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
