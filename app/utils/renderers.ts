import { OfflineRenderer } from '../types';

export const OFFLINE_RENDERERS: { [renderer: string]: OfflineRenderer } = {
  pixelGrid8: {
    outSize: 64 * 3,
    renderRaw: (out: string) => {
      const prunedOut = out.slice(2);
      if (prunedOut.length / 2 !== 64 * 3) {
        throw new Error('outSize mismatch');
      }
      const rects = [
        'x="0" y="0"',
        'x="0" y="1"',
        'x="0" y="2"',
        'x="0" y="3"',
        'x="0" y="4"',
        'x="0" y="5"',
        'x="0" y="6"',
        'x="0" y="7"',
        'x="1" y="0"',
        'x="1" y="1"',
        'x="1" y="2"',
        'x="1" y="3"',
        'x="1" y="4"',
        'x="1" y="5"',
        'x="1" y="6"',
        'x="1" y="7"',
        'x="2" y="0"',
        'x="2" y="1"',
        'x="2" y="2"',
        'x="2" y="3"',
        'x="2" y="4"',
        'x="2" y="5"',
        'x="2" y="6"',
        'x="2" y="7"',
        'x="3" y="0"',
        'x="3" y="1"',
        'x="3" y="2"',
        'x="3" y="3"',
        'x="3" y="4"',
        'x="3" y="5"',
        'x="3" y="6"',
        'x="3" y="7"',
        'x="4" y="0"',
        'x="4" y="1"',
        'x="4" y="2"',
        'x="4" y="3"',
        'x="4" y="4"',
        'x="4" y="5"',
        'x="4" y="6"',
        'x="4" y="7"',
        'x="5" y="0"',
        'x="5" y="1"',
        'x="5" y="2"',
        'x="5" y="3"',
        'x="5" y="4"',
        'x="5" y="5"',
        'x="5" y="6"',
        'x="5" y="7"',
        'x="6" y="0"',
        'x="6" y="1"',
        'x="6" y="2"',
        'x="6" y="3"',
        'x="6" y="4"',
        'x="6" y="5"',
        'x="6" y="6"',
        'x="6" y="7"',
        'x="7" y="0"',
        'x="7" y="1"',
        'x="7" y="2"',
        'x="7" y="3"',
        'x="7" y="4"',
        'x="7" y="5"',
        'x="7" y="6"',
        'x="7" y="7"',
      ];
      let content = '';
      for (let i = 0; i < 64; i += 1) {
        content += `<rect width="1.05" height="1.05" ${
          rects[i]
        } fill="#${prunedOut.slice(i * 6, i * 6 + 6)}" />`;
      }
      return `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" style="background:#F1F1F1">
        ${content}
        </svg>`;
    },
  },
};
