// import React, { useEffect, useState } from "react";
// import { Box, Fade } from "@mui/material";
// import { motion } from "framer-motion";

// export const SignaturePreloader: React.FC = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 4500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Fade in={loading} timeout={1000}>
//       <Box
//         sx={{
//           position: "fixed",
//           inset: 0,
//           bgcolor: "black",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           zIndex: 9999,
//         }}
//       >
//         {/* Glowing cursive signature animation */}
//         <motion.h1
//           style={{
//             fontFamily: "'Great Vibes', cursive",
//             fontSize: "4rem",
//             color: "#fff",
//             textShadow: "0 0 15px #00e5ff, 0 0 25px #00e5ff",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             borderRight: "2px solid #00e5ff",
//           }}
//           initial={{ width: 0 }}
//           animate={{ width: "auto" }}
//           transition={{ duration: 3, ease: "easeInOut" }}
//         >
//           Vijayaragavan D
//         </motion.h1>

//         {/* Underline motion */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
//           style={{
//             width: "60%",
//             height: "2px",
//             background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
//             transformOrigin: "left center",
//             marginTop: "10px",
//           }}
//         />

//         {/* Soft glow */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0.2, 1, 0.5, 1] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           style={{
//             position: "absolute",
//             width: 150,
//             height: 150,
//             borderRadius: "50%",
//             background:
//               "radial-gradient(circle, rgba(0,229,255,0.4), transparent 70%)",
//             filter: "blur(60px)",
//           }}
//         />
//       </Box>
//     </Fade>
//   );
// };




import React, { useEffect, useState } from "react";
import { Box, Fade } from "@mui/material";
import { motion } from "framer-motion";

export const SignaturePreloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={loading} timeout={1000}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex: 9999,
        }}
      >
        {/* ✍️ SVG Write-on Signature */}
        <motion.svg
          width="600"
          height="160"
          viewBox="0 0 600 160"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 6px #00e5ff)" }}
        >
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            fontFamily="'Bonheur Royale', cursive"
            fontSize="100"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          >
            Vijayaragavan D
          </motion.text>
        </motion.svg>

        {/* 🌊 Underline stroke */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.2, duration: 1, ease: "easeInOut" }}
          style={{
            width: "60%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #00e5ff, transparent)",
            transformOrigin: "left center",
            marginTop: "12px",
          }}
        />

        {/* 💫 Ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,229,255,0.35), transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </Box>
    </Fade>
  );
};
