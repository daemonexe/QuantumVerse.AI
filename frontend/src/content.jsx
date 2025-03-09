import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
};

function NewPage() {
  return (
    <motion.div
      className="newpage"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1>TODO/ Will come soon!</h1>

      <Link to="/">
        <button>Go Back Home</button>
      </Link>
    </motion.div>
  );
}

export default NewPage;
