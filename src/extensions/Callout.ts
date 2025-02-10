import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core'

export interface CalloutOptions {
  /**
   * Allow multiple background colors
   * @default false
   * @example true
   */
  multicolor: boolean,

  /**
   * HTML attributes to add to the callout element.
   * @default {}
   * @example { class: 'callout' }
   */
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      /**
       * Set a callout mark with a background color
       * @param attributes The callout attributes
       * @example editor.commands.setCallout({ color: 'yellow' })
       */
      setCallout: (attributes?: { color: string }) => ReturnType,
      /**
       * Toggle a callout mark
       * @param attributes The callout attributes
       * @example editor.commands.toggleCallout({ color: 'yellow' })
       */
      toggleCallout: (attributes?: { color: string }) => ReturnType,
      /**
       * Unset a callout mark
       * @example editor.commands.unsetCallout()
       */
      unsetCallout: () => ReturnType,
    }
  }
}

/**
 * Matches a callout to a ==callout== on input.
 */
export const inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/

/**
 * Matches a callout to a ==callout== on paste.
 */
export const pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g

export const Callout = Mark.create<CalloutOptions>({
  name: 'callout',

  addOptions() {
    return {
      multicolor: false,
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {}
    }

    return {
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color') || element.style.backgroundColor,
        renderHTML: attributes => {
          if (!attributes.color) {
            return {}
          }

          return {
            style: `background-color: ${attributes.color}; color: white; padding: 5px 10px; border-radius: 5px;`,
            class: 'speaker-icon',
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),0
    ]
  },  

  addCommands() {
    return {
      setCallout: attributes => ({ commands }) => {
        return commands.setMark(this.name, attributes)
      },
      toggleCallout: attributes => ({ commands }) => {
        // commands.insertContentAt(0, "Hey")
        return commands.toggleMark(this.name, attributes)
      },
      unsetCallout: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-c': () => this.editor.commands.toggleCallout(),
    }
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ]
  },
})
