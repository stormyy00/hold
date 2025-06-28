"use client";
import React, { useState, useEffect } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TooltipComponent = ({ content, icon, text }) => (
  <div className="flex items-center gap-1" title={content}>
    {icon}
    <span className="text-xs text-gray-600 z-50">{text}</span>
  </div>
);

const Card = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Showcard = ({ data, index, stackPosition }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      rotate: 10,
    },
    visible: {
      opacity: 1 - stackPosition * 0.15,
      scale: 1 - stackPosition * 0.05,
      y: stackPosition * 12,
      x: stackPosition * 8,
      rotate: stackPosition * 3,
      z: 50 - stackPosition * 10,
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: -100,
      rotate: -15,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -8, 0, -12, 0],
    rotate: [0, 1, 0, -1, 0],
    transition: {
      duration: 4 + stackPosition * 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      delay: stackPosition * 0.2,
    },
  };

  return (
    <motion.div
      key={`${data.title}-${index}`}
      className="absolute inset-0"
      initial="hidden"
      animate={["visible", floatingAnimation]}
      exit="exit"
      variants={cardVariants}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: stackPosition * 0.1,
      }}
      style={{
        zIndex: 50 - stackPosition,
      }}
    >
      <Card className="group w-full max-w-lg bg-white/95 backdrop-blur-sm border border-gray-200/60 shadow-lg rounded-xl p-4 cursor-pointer overflow-hidden relative z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-pink-50/20 pointer-events-none" />
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-red-200/20 via-pink-200/20 to-orange-200/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: stackPosition * 0.5,
          }}
        />

        <div className="relative">
          <CardHeader className="flex items-center justify-between p-0 pb-3">
            <div className="flex gap-3 justify-between w-full items-center">
              <div className="flex items-center gap-3 flex-grow min-w-0">
                <motion.div
                  className="w-6 h-6 flex-shrink-0 rounded-md overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center ring-1 ring-gray-200/50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${data.domain}&size=32`}
                    alt="favicon"
                    className="w-4 h-4"
                  />
                </motion.div>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gray-800 truncate flex-grow min-w-0 hover:text-red-600 transition-colors duration-300"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  {data.title}
                </motion.a>
              </div>

              <motion.div
                className="flex gap-1 flex-shrink-0"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + stackPosition * 0.1 }}
              >
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    className="p-1 rounded-lg hover:bg-blue-100 transition-all duration-200 group/edit"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit className="w-4 h-4 text-blue-500 group-hover/edit:text-blue-600 cursor-pointer" />
                  </motion.div>
                  <motion.div
                    className="p-1 rounded-lg hover:bg-red-100 transition-all duration-200 group/delete"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500 group-hover/delete:text-red-600 cursor-pointer" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <motion.div
              className="flex items-center justify-between pt-2 border-t border-gray-100/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + stackPosition * 0.1 }}
            >
              <div className="flex items-center gap-2 z-50">
                <TooltipComponent
                  content="Times Opened"
                  icon={<Eye size={14} className="text-gray-500" />}
                  text={data.views}
                />
              </div>

              <motion.div
                className="text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 px-2 py-1 rounded-md font-medium border border-gray-200/50"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgb(248 250 252)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                {data.domain}
              </motion.div>
            </motion.div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

const FloatingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const cardData = [
    { title: "Hold This", domain: "holdthis.com", views: "142", color: "red" },
    {
      title: "Design Inspiration",
      domain: "dribbble.com",
      views: "89",
      color: "pink",
    },
    {
      title: "Code Repository",
      domain: "github.com",
      views: "203",
      color: "purple",
    },
    {
      title: "Learning Hub",
      domain: "coursera.org",
      views: "67",
      color: "blue",
    },
    {
      title: "Creative Tools",
      domain: "figma.com",
      views: "156",
      color: "green",
    },
    {
      title: "Tech News",
      domain: "techcrunch.com",
      views: "94",
      color: "orange",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(Math.random() > 0.5 ? 1 : -1);
      setCurrentIndex((prev) => (prev + 1) % cardData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cardData.length]);

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % cardData.length;
      visible.push({
        data: cardData[index],
        index: index,
        stackPosition: i,
        isActive: i === 0,
      });
    }
    return visible;
  };

  //   const backgroundVariants = {
  //     animate: {
  //       background: [
  //         "radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
  //         "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
  //         "radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
  //       ],
  //       transition: {
  //         duration: 8,
  //         ease: "easeInOut",
  //         repeat: Infinity,
  //       },
  //     },
  //   };

  return (
    <motion.div
      className=" flex items-center justify-center p-8 w-full mt-[10vh] relative z-50"
      //   variants={backgroundVariants}
      animate="animate"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full max-w-xs h-96 z-50">
        <AnimatePresence mode="wait">
          {getVisibleCards().map(({ index, data, stackPosition }) => (
            <Showcard
              key={index}
              data={data}
              index={index}
              stackPosition={stackPosition}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Floating orbs with framer-motion */}
      {/* {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${
              ['rgba(239, 68, 68, 0.15)', 'rgba(236, 72, 153, 0.15)', 'rgba(249, 115, 22, 0.15)'][i]
            } 0%, transparent 70%)`
          }}
          animate={{
            x: [100, 300, 100],
            y: [100, 200, 300, 100],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10 + i * 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 2
          }}
        />
      ))} */}

      <div className=" absolute left-1/2 -translate-x-1/2 flex space-x-3">
        {cardData.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-red-500" : "bg-gray-300"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: index === currentIndex ? 1.3 : 1,
              opacity: index === currentIndex ? 1 : 0.6,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingCarousel;
