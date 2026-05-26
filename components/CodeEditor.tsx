"use client";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-white">
      <CodeMirror
        value={value}
        minHeight="320px"
        extensions={[python()]}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          autocompletion: true
        }}
        onChange={onChange}
        theme="light"
      />
    </div>
  );
}
