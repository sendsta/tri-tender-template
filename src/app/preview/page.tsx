"use client";

import { useEffect, useState } from 'react';

/**
 * PreviewPage renders a live preview of all generated tender sections.
 *
 * It fetches the list of HTML files from the `/api/tender-output` endpoint and
 * displays them in a sidebar.  Selecting a file loads its contents into an
 * iframe.  Both the list of files and the currently selected file's content
 * refresh automatically every few seconds to reflect changes made by the
 * AI during the tender generation process.  Users can therefore watch the
 * tender response taking shape in real time.
 */
export default function PreviewPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');

  // Fetch the list of files from the API and update state.  If no file is
  // currently selected select the first file in the list.
  const loadFiles = async () => {
    try {
      const res = await fetch('/api/tender-output');
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.files)) {
        setFiles(data.files);
        if (!currentFile && data.files.length > 0) {
          setCurrentFile(data.files[0]);
        }
      }
    } catch (err) {
      // ignore network errors silently
    }
  };

  // Fetch the content of the currently selected file and update state.
  const loadContent = async (file: string) => {
    try {
      const res = await fetch(`/api/tender-output?file=${encodeURIComponent(file)}`);
      if (!res.ok) return;
      const html = await res.text();
      setContent(html);
    } catch (err) {
      // ignore network errors silently
    }
  };

  // Initially load files and set up periodic refresh of the list.
  useEffect(() => {
    loadFiles();
    const interval = setInterval(loadFiles, 2000);
    return () => clearInterval(interval);
  }, []);

  // When the current file changes or on mount, load the file's content and
  // set up periodic refresh to keep it up to date.
  useEffect(() => {
    if (!currentFile) return;
    loadContent(currentFile);
    const interval = setInterval(() => loadContent(currentFile), 2000);
    return () => clearInterval(interval);
  }, [currentFile]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar listing all generated HTML files */}
      <nav className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-4">Generated Sections</h2>
        {files.length === 0 && (
          <p className="text-sm text-gray-500">No HTML files have been generated yet.</p>
        )}
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file}>
              <button
                className={`text-left w-full px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  currentFile === file ? 'font-bold bg-gray-200 dark:bg-gray-700' : ''
                }`}
                onClick={() => setCurrentFile(file)}
              >
                {file}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Preview pane */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentFile ? (
          <iframe
            key={currentFile}
            srcDoc={content}
            className="w-full h-full border-0 rounded-md"
            sandbox="allow-same-origin allow-popups allow-scripts"
            title={currentFile}
          />
        ) : (
          <p className="text-sm text-gray-500">Select a file to preview its content.</p>
        )}
      </div>
    </div>
  );
}