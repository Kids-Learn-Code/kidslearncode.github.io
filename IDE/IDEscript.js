import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  const [editor, setEditor] = useState(null);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    if (typeof window !== "undefined" && window.require) {
      window.require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs" } });
      window.require(["vs/editor/editor.main"], () => {
        const monacoEditor = monaco.editor.create(document.getElementById("code"), {
          value: `# Start coding here...`,
          language: "python",
          theme: "vs-dark",
          automaticLayout: true,
        });
        setEditor(monacoEditor);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      requireScripts();
    }
  }, []);

  function requireScripts() {
    require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs" } });

    require(["vs/editor/editor.main"], function () {
      let monacoEditor;
      const languagePicker = document.getElementById("language-picker");

      function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
      }

      function getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i].trim();
          if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
      }

      function createEditor(language) {
        if (monacoEditor) monacoEditor.dispose();
        monacoEditor = monaco.editor.create(document.getElementById("code"), {
          value: getCookie("editorContent") || "# Start coding here...",
          language: language,
          theme: "vs-dark",
          automaticLayout: true,
          lineNumbers: "on",
          fontSize: 15,
        });

        monacoEditor.onDidChangeModelContent(() => {
          setCookie("editorContent", monacoEditor.getValue(), 7);
        });

        setEditor(monacoEditor);
      }

      createEditor(languagePicker.value);

      languagePicker.addEventListener("change", () => {
        createEditor(languagePicker.value);
      });

      async function main() {
        let pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" });
        await pyodide.loadPackage("micropip");
        await pyodide.loadPackage("requests");

        await pyodide.runPythonAsync(`
            import micropip
            await micropip.install('httpx')
        `);
        setOutput("Ready!\n");
        return pyodide;
      }

      let pyodideReadyPromise = main();

      async function evaluatePython() {
        let pyodide = await pyodideReadyPromise;
        try {
          const code = monacoEditor.getValue();
          pyodide.runPython(`
            import sys
            import io
            sys.stdout = io.StringIO()
          `);
          let outputValue = pyodide.runPython(code);
          let printedOutput = pyodide.runPython("sys.stdout.getvalue()");
          setOutput(printedOutput + (outputValue ? outputValue : ""));
        } catch (err) {
          console.error(err);
          setOutput(err.toString());
        }
      }

      function evaluateJavaScript() {
        try {
          const result = eval(monacoEditor.getValue());
          setOutput(result.toString());
        } catch (err) {
          setOutput(err.toString());
        }
      }

      function evaluate() {
        if (languagePicker.value === "python") {
          evaluatePython();
        } else {
          evaluateJavaScript();
        }
      }

      document.getElementById("run").addEventListener("click", evaluate);
    });
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Head>
        <title>KLC Code Editor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://i.ibb.co/DtzhGqz/Kids-Learn-Code-1.png" />
      </Head>

      {/* External Scripts */}
      <Script src="https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs/loader.js" strategy="beforeInteractive" />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4822143761765159" />

      <main className="p-5">
        <p className="mb-2">Note: Code stored will only persist for this session. Your work is auto-saved.</p>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 bg-gray-800 p-2 rounded">
            <div id="code" className="h-80"></div>
          </div>

          <div className="w-full md:w-1/3 bg-gray-800 p-4 rounded">
            <div className="flex gap-2 mb-3">
              <select id="language-picker" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>
              <button id="run" className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded">
                Run
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-700 py-2 px-4 rounded">
                Save
              </button>
            </div>

            <p>Output</p>
            <textarea
              id="output"
              className="w-full h-40 bg-gray-900 text-white p-2 rounded resize-none"
              value={output}
              readOnly
            ></textarea>
          </div>
        </div>
      </main>

      <div className="flex justify-center mt-5">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "auto" }}
          data-ad-client="ca-pub-4822143761765159"
          data-ad-slot="3978248428"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>


    </div>
  );
}