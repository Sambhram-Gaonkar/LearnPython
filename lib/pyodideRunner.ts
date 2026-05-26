"use client";

type PyodideInstance = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (value: string) => void }) => void;
  setStderr: (options: { batched: (value: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideInstance>;
  }
}

let pyodidePromise: Promise<PyodideInstance> | null = null;

function loadScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>("script[data-pyodide]");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Pyodide.")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
    script.async = true;
    script.dataset.pyodide = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide."));
    document.head.appendChild(script);
  });
}

export async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = loadScript().then(() => {
      if (!window.loadPyodide) {
        throw new Error("Pyodide loader is unavailable.");
      }
      return window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    });
  }

  return pyodidePromise;
}

export async function runPython(code: string) {
  const pyodide = await getPyodide();
  const output: string[] = [];

  pyodide.setStdout({ batched: (value) => output.push(value) });
  pyodide.setStderr({ batched: (value) => output.push(value) });

  try {
    await pyodide.runPythonAsync(code);
    return output.join("\n").trimEnd() || "Code ran successfully with no output.";
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `${output.join("\n")}${output.length ? "\n" : ""}${message}`.trimEnd();
  }
}
