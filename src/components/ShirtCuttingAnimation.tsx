import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const ShirtCuttingAnimation = () => {
  // Cutting line progress
  const progress = useSharedValue(0);
  // Shirt pieces movement
  const leftPiecePosition = useSharedValue(0);
  const rightPiecePosition = useSharedValue(0);

  // Shirt cutting path
  const shirtPath = "M 50,50 L 150,50 L 150,200 L 50,200 Z";
  const cuttingPath = "M 100,50 L 100,200";

  useEffect(() => {
    // Start animation sequence
    progress.value = withSequence(
      withTiming(1, { duration: 2000 }),
      withTiming(1, { duration: 500 })
    );

    // Move shirt pieces apart
    leftPiecePosition.value = withTiming(-50, { duration: 1000 });
    rightPiecePosition.value = withTiming(50, { duration: 1000 });
  }, []);

  const leftPieceStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftPiecePosition.value }],
  }));

  const rightPieceStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightPiecePosition.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Left piece of shirt */}
      <Animated.View style={[styles.piece, leftPieceStyle]}>
        <Svg width={100} height={150}>
          <Path d={shirtPath} fill="#FFB6C1" />
        </Svg>
      </Animated.View>

      {/* Right piece of shirt */}
      <Animated.View style={[styles.piece, rightPieceStyle]}>
        <Svg width={100} height={150}>
          <Path d={shirtPath} fill="#FFB6C1" />
        </Svg>
      </Animated.View>

      {/* Cutting line */}
      <Animated.View style={styles.cuttingLine}>
        <Svg width={2} height={150}>
          <Path 
            d={cuttingPath} 
            stroke="red" 
            strokeWidth={2} 
            strokeDasharray={[5, 5]} 
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  piece: {
    position: 'absolute',
  },
  cuttingLine: {
    position: 'absolute',
    height: 150,
  },
});

export default ShirtCuttingAnimation; 