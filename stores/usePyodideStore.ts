import { create } from 'zustand';

export type PyodideStatus = 'idle' | 'loading' | 'ready' | 'running' | 'error';

interface PyodideState {
  status: PyodideStatus;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pyodideInstance: any | null;
  stdout: string[];
  stderr: string[];
}

interface PyodideActions {
  setStatus: (status: PyodideStatus) => void;
  setError: (error: string | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPyodideInstance: (instance: any) => void;
  appendStdout: (line: string) => void;
  appendStderr: (line: string) => void;
  clearOutput: () => void;
}

export const usePyodideStore = create<PyodideState & PyodideActions>((set) => ({
  status: 'idle',
  error: null,
  pyodideInstance: null,
  stdout: [],
  stderr: [],

  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: error ? 'error' : 'idle' }),
  setPyodideInstance: (instance) => set({ pyodideInstance: instance, status: 'ready' }),
  appendStdout: (line) => set((s) => ({ stdout: [...s.stdout, line] })),
  appendStderr: (line) => set((s) => ({ stderr: [...s.stderr, line] })),
  clearOutput: () => set({ stdout: [], stderr: [] }),
}));
