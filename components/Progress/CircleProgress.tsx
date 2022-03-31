import React from "react";
import Box from "styled/Box";
import Flex from "styled/Flex";
import { motion } from "framer-motion";
import Text from "styled/Text";

const CircleProgress = ({
  percents = 50,
  radius = 30,
  stroke = '',
  emptyStroke = '#e2e2e2',
  size = 250,
  strokeWidth = 10,
  delay = 0.5,
  duration = 2,
  ease = [0.12, 0.23, 0.5, 1]
}) => {
  const transition = {
    ease,
    delay,
    duration
  };

  const circumference = Math.ceil(Math.PI * radius * 2);
  const percent = Math.ceil((100 - percents) * circumference / 100);

  const progressVariants = {
    hidden: {
      strokeDashoffset: circumference,
      transition
    },
    show: {
      strokeDashoffset: percent,
      transition
    }
  };

  return (
    <Flex
      data-test='progress-circleProgress'
      justifyContent="center"
      alignItems="center"
    >
      <Box position='absolute'>
        <Text fontSize={['20px', '30px']}>
          {`${percents}%`}
        </Text>
      </Box>
      <Box
        position="relative"
        height={size}
      >
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{
            position: "relative",
          }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            stroke={emptyStroke}
            fill="transparent"
            strokeDashoffset="360"
          />
        </svg>
        <svg
          className="transform -rotate-90"
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{
            top: 0,
            position: "absolute",
          }}
        >
          <motion.circle
            cy="50"
            cx="50"
            r={radius}
            initial="hidden"
            animate="show"
            fill="transparent"
            stroke={stroke || "url(#lgrad)"}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            variants={progressVariants}
            strokeDasharray={circumference}
          />
          {/* <defs>
              <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#05a" />
                <stop offset="50%" stopColor="#a55" />
                <stop offset="100%" stopColor="#0a5" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="myGradient" gradientTransform="rotate(90)">
                <stop offset="5%" stop-color="gold" />
                <stop offset="95%" stop-color="red" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="gradient-fill" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#1f005c" />
                <stop offset="0.14285714285714285" stop-color="#5b0060" />
                <stop offset="0.2857142857142857" stop-color="#870160" />
                <stop offset="0.42857142857142855" stop-color="#ac255e" />
                <stop offset="0.5714285714285714" stop-color="#ca485c" />
                <stop offset="0.7142857142857142" stop-color="#e16b5c" />
                <stop offset="0.8571428571428571" stop-color="#f39060" />
                <stop offset="1" stop-color="#ffb56b" />
              </linearGradient>
            </defs> */}
          <defs>
            <linearGradient id="lgrad" x1="28%" y1="100%" x2="72%" y2="0%" >
              <stop offset="0%" stopColor="rgb(63,81,181)" />
              <stop offset="33%" stopColor="rgb(118,63,181)" />
              <stop offset="65%" stopColor="rgb(181,63,127)" />
              <stop offset="100%" stopColor="rgb(43,145,229)" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </Flex>
  );
};

export default CircleProgress
