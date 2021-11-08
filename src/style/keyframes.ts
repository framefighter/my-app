import { keyframes } from '@mui/material';
import { TransformBuilder } from '../utils/builders';

export const startDegree = -90;
export const endDegree = 360 + startDegree;
export const highLightSize = 3;

export function convertPercentToDegree(percent: number) {
  return 3.6 * percent + startDegree;
}

export const progressKeyframe = keyframes`
  0% {
    transform: ${new TransformBuilder().scale(0.6).rotate(startDegree, "deg").build()};
    opacity: 0;
  }
  30% {
      opacity: 1;
    }
  50% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: ${new TransformBuilder().scale(0.6).rotate(endDegree + 590, "deg").build()};
    opacity: 0;
  }
`;

export const fadeInOutKeyframe = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;


export const pulsatingKeyframe = keyframes`
  from {
    transform: ${new TransformBuilder().scale(1.1).build()};
    opacity: 0.8;
  }
  to {
    transform: ${new TransformBuilder().scale(1.3).build()};
    opacity: 0.5;
  }
`;

export const pointingKeyframe = (direction: number, scale: number = 3, distance: number = 17) => keyframes`
  0% {
    transform: ${new TransformBuilder()
    .scale(scale)
    .rotate(direction + Math.PI / 2)
    .translate(0, -distance)
    .build()
  };
  }
  100% {
    transform: ${new TransformBuilder()
    .scale(scale)
    .rotate(direction + Math.PI / 2)
    .translate(0, -distance + 2)
    .build()
  };
  }
`;

export const moveToPositionKeyframe = (
  from: [number, number],
  to: [number, number],
) => keyframes`
  0% {
    transform: ${new TransformBuilder().translateP(from).build()};
  }
  100% {
    transform:  ${new TransformBuilder().translateP(to).build()};
  }
`;

export const moveStrokeOffsetKeyframe = (width: number) => keyframes`
  0% {
    width: ${width}px;
  }
  100% {
    width: 0px;
  }
`;