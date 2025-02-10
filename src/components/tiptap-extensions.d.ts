// tiptap-extensions.d.ts
import { Highlight } from '../extensions/Highlight' // adjust path as necessary

declare module '@tiptap/core' {
  interface Editor {
    // Adding the toggleHighlight command to the editor's commands
    commands: {
      toggleHighlight: (color: string) => boolean;
    };
  }
}
