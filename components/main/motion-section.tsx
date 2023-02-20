import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  motionRef: any;
  motionBoolean: boolean;
  customClass?: string | any;
};

export function MotionSection({
  children,
  motionRef,
  motionBoolean,
  customClass,
}: Props) {
  return (
    <motion.section
      ref={motionRef}
      initial="hidden"
      animate={motionBoolean ? "animation" : ""}
      variants={{
        hidden: { y: 60, opacity: 0 },
        animation: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.5 },
        },
      }}
      className={customClass ? customClass : "section"}
    >
      {children}
    </motion.section>
  );
}
