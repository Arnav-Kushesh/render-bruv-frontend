import { motion } from "framer-motion";

export default function AnimatedPageVertical({ children, additionalStyle }) {
  // return children;
  return (
    <motion.div
      key="/page"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...additionalStyle,
      }}
      initial={{ y: 100, x: 0, opacity: 0 }}
      animate={{ y: 0, x: 0, opacity: 1 }}
      exit={{ y: -10, x: -100, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
