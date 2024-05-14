// import { useAnimate } from "framer-motion";
// import React, { useRef } from "react";
// import { FiMousePointer } from "react-icons/fi";

// export const Example = () => {
//   return (
//     <MouseImageTrail
//       renderImageBuffer={50}
//       rotationRange={25}
//       images={[
//        "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//        "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    
//        "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    
//        "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    
//        "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    
    
//       ]}
//     >
//       <section className="grid h-screen w-full place-content-center bg-white">
//         <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
//           <FiMousePointer />
//           <span>Hover me</span>
//         </p>
//       </section>
//     </MouseImageTrail>
//   );
// };

// const MouseImageTrail = ({
//   children,
//   // List of image sources
//   images,
//   // Will render a new image every X pixels between mouse moves
//   renderImageBuffer,
//   // images will be rotated at a random number between zero and rotationRange,
//   // alternating between a positive and negative rotation
//   rotationRange,
// }) => {
//   const [scope, animate] = useAnimate();

//   const lastRenderPosition = useRef({ x: 0, y: 0 });
//   const imageRenderCount = useRef(0);

//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;

//     const distance = calculateDistance(
//       clientX,
//       clientY,
//       lastRenderPosition.current.x,
//       lastRenderPosition.current.y
//     );

//     if (distance >= renderImageBuffer) {
//       lastRenderPosition.current.x = clientX;
//       lastRenderPosition.current.y = clientY;

//       renderNextImage();
//     }
//   };

//   const calculateDistance = (x1, y1, x2, y2) => {
//     const deltaX = x2 - x1;
//     const deltaY = y2 - y1;

//     // Using the Pythagorean theorem to calculate the distance
//     const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//     return distance;
//   };

//   const renderNextImage = () => {
//     const imageIndex = imageRenderCount.current % images.length;
//     const selector = `[data-mouse-move-index="${imageIndex}"]`;

//     const el = document.querySelector(selector);

//     el.style.top = `${lastRenderPosition.current.y}px`;
//     el.style.left = `${lastRenderPosition.current.x}px`;
//     el.style.zIndex = imageRenderCount.current.toString();

//     const rotation = Math.random() * rotationRange;

//     animate(
//       selector,
//       {
//         opacity: [0, 1],
//         transform: [
//           `translate(-50%, -25%) scale(0.5) ${
//             imageIndex % 2
//               ? `rotate(${rotation}deg)`
//               : `rotate(-${rotation}deg)`
//           }`,
//           `translate(-50%, -50%) scale(1) ${
//             imageIndex % 2
//               ? `rotate(-${rotation}deg)`
//               : `rotate(${rotation}deg)`
//           }`,
//         ],
//       },
//       { type: "spring", damping: 15, stiffness: 200 }
//     );

//     animate(
//       selector,
//       {
//         opacity: [1, 0],
//       },
//       { ease: "linear", duration: 0.5, delay: 5 }
//     );

//     imageRenderCount.current = imageRenderCount.current + 1;
//   };

//   return (
//     <div
//       ref={scope}
//       className="relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {children}

//       {images.map((img, index) => (
//         <img
//           className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
//           src={img}
//           alt={`Mouse move image ${index}`}
//           key={index}
//           data-mouse-move-index={index}
//         />
//       ))}
//     </div>
//   );
// };
// export default MouseImageTrail;


import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];


const MouseImageTrail = () => {

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <div>
        <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
        Providing the best medical services
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
        we help patients live a healthy, longer life
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, et,
          distinctio eum impedit nihil ipsum modi.
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
        Request an appointment
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
      
    </div>
  )
}

export default MouseImageTrail
