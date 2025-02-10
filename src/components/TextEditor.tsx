import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Color from "@tiptap/extension-color";
import FontFamily from '@tiptap/extension-font-family';
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

import { AlignCenter, AlignLeft, AlignRight, Highlighter } from "lucide-react";
import { Highlight } from "../extensions/Highlight";
import { Callout } from "../extensions/Callout";

const Editor = () => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        heading: false,
      }),
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
      TextStyle.configure({
        mergeNestedSpanStyles: true,
      }),
      TextAlign.configure({ types: ["paragraph", "heading"] }), // Enable text alignment for paragraph and heading,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Color,
      Callout.configure({
        multicolor: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    console.log(content);
  }, [content]);

  const handleSave = () => {
    localStorage.setItem("editorContent", content);
  };

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent && editor) {
      editor.commands.setContent(savedContent);
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-100 border-b border-gray-200">
        {/* Text Style */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="btn"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="btn"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="btn underline"
        >
          U
        </button>

        {/* Font Family */}
        <button
          onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
          className={"btn " + (editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'bg-gray-200' : '')}
          data-test-id="inter"
        >
          Inter
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()}
          className={"btn" + (editor.isActive('textStyle', { fontFamily: '"Comic Sans MS", "Comic Sans"' }) ? 'bg-gray-200' : '')}
          data-test-id="comic-sans"
        >
          Comic Sans
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('serif').run()}
          className={"btn" + (editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'bg-gray-200' : '')}
          data-test-id="serif"
        >
          Serif
        </button>

        {/* Text Color */}
        <button
          onClick={() =>
            editor.chain().focus().setColor('#ff0000').run()
          }
          className="btn"
        >
          Red
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setColor('#00ff00').run()
          }
          className="btn"
        >
          Green
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setColor('#0000ff').run()
          }
          className="btn"
        >
          Blue
        </button>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="btn"
        >
          <AlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="btn"
        >
          <AlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="btn"
        >
          <AlignRight />
        </button>

        <button
          onClick={() => {
            editor.commands.toggleHighlight({ color: "red" });
          }}
          className="btn"
        >
          <Highlighter />
        </button>

        {/* Callout */}
        <button
          onClick={() => {
            editor.commands.toggleCallout({ color: "black" });
          }}
          className="btn"
        >
          Callout
        </button>


      </div>
      <EditorContent
        editor={editor}
        className="p-4 outline-none prose"
      />
      {/* Save Button */}
      <button onClick={handleSave} className="btn !bg-blue-500 text-white w-32 ml-auto mr-4">
        Save
      </button>
    </div>
  );
};

export default Editor;
