"use client";

import { resultAtom } from "../../atoms/problemAtom";
import { Editor } from "@monaco-editor/react";
import { Code } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

const CodeEditor = ({ starterCode, setUserCode, userCode }) => {
  const [result, setResult] = useRecoilState(resultAtom);
  const { pid } = useParams();

  const handleSubmit = () => {
    setResult(true);
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (code) {
      setUserCode(code ? JSON.parse(code) : starterCode);
    } else {
      setUserCode(starterCode);
    }
  }, [pid, starterCode]);

  // restrictionsss
  const editorRef = useRef(null);
  var restrictions = [];

  // function handleEditorDidMount(editor, monaco) {
  //   try {
  //     editorRef.current = editor;
  //     const constrainedInstance = constrainedEditor(monaco);
  //     const model = editor.getModel();
  //     constrainedInstance.initializeIn(editor);
  //     restrictions.push({
  //       // range : [startLine, startColumn, endLine, endColumn];
  //       range: [0, 1, 1, 1],
  //       allowMultiline: true,
  //     });
  //     constrainedInstance.addRestrictionsTo(model, restrictions);
  //   } catch (error) {
  //     console.error("Failed to initialize editor with constraints:", error);
  //   }
  // }

  const onChange = (value) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  if (!starterCode || starterCode.length <= 0) {
    return <div>Loading ....</div>;
  }

  return (
    <main className="relative h-full w-full overflow-auto bg-third">
      <nav>
        <div className="flex w-full items-center overflow-x-hidden border-b border-gray-500 bg-secondary text-white">
          <div
            className={
              "flex cursor-pointer items-center rounded-t-[5px] px-5 py-[10px] text-sm"
            }
          >
            <Code className="mr-3 text-primary" /> Code
          </div>
        </div>
      </nav>
      <Editor
        ref={editorRef.current}
        height="85vh"
        width={`100%`}
        language={"javascript"}
        // onMount={handleEditorDidMount}
        theme={"vs-dark"}
        defaultValue="// some comment"
        onChange={onChange}
        value={userCode}
      />
    </main>
  );
};

export default CodeEditor;
