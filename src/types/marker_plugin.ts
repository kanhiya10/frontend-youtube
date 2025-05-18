import 'video.js';

declare module 'video.js' {
  export interface VideoJsPlayer {
    markers?: (options: {
      markerStyle?: Record<string, string>;
      markerTip?: {
        display?: boolean;
        text?: (marker: { time: number; text: string }) => string;
      };
      onMarkerReached?: (marker: { time: number; text: string }) => void;
      markers: { time: number; text: string }[];
    }) => void;
  }
}
