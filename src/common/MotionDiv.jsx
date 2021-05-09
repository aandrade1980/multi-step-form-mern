import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = ({ children }) => {
  return (
    <motion.div
      className="col-md-6 offset-md-3"
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ stiffness: 150 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
