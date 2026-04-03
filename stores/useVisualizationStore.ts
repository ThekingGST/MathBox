import { create } from 'zustand';

interface VisualizationState {
  isPlaying: boolean;
  speed: number;       // 0.1 – 3.0x
  showAxes: boolean;
  showGrid: boolean;
  showLabels: boolean;
  cameraReset: number; // increment to trigger camera reset
}

interface VisualizationActions {
  setPlaying: (playing: boolean) => void;
  togglePlaying: () => void;
  setSpeed: (speed: number) => void;
  toggleAxes: () => void;
  toggleGrid: () => void;
  toggleLabels: () => void;
  resetCamera: () => void;
  resetAll: () => void;
}

const defaultState: VisualizationState = {
  isPlaying: true,
  speed: 1,
  showAxes: true,
  showGrid: true,
  showLabels: true,
  cameraReset: 0,
};

export const useVisualizationStore = create<VisualizationState & VisualizationActions>(
  (set) => ({
    ...defaultState,
    setPlaying: (playing) => set({ isPlaying: playing }),
    togglePlaying: () => set((s) => ({ isPlaying: !s.isPlaying })),
    setSpeed: (speed) => set({ speed }),
    toggleAxes: () => set((s) => ({ showAxes: !s.showAxes })),
    toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
    toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
    resetCamera: () => set((s) => ({ cameraReset: s.cameraReset + 1 })),
    resetAll: () => set({ ...defaultState }),
  })
);
