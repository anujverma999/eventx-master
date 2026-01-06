import { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "../pages/Home/Home.module.css";

function CodeEditor({
    type,
    languages,
  setRulesModalOpen,
}: {
    type: string;
    languages: string[];
  setRulesModalOpen: (isOpen: boolean) => void;
}) {
  const [rulesCode, setRulesCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3 style={{ marginBottom: 10 }}>Edit {type}</h3>

        <div className={styles.editorConfig}>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className={styles.select}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className={styles.select}
          >
            <option value="vs-light">VS Light</option>
            <option value="vs-dark">VS Dark</option>
            <option value="hc-black">High Contrast</option>
          </select>
        </div>

        {/* Monaco Editor */}
        <div
          className={styles.editorWrapper}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        >
          <Editor
            language={selectedLanguage}
            value={rulesCode}
            theme={selectedTheme}
            onChange={(val) => setRulesCode(val || "")}
          />
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => setRulesModalOpen(false)}
            className={styles.closeBtn}
          >
            Close
          </button>
          <button
            onClick={() => {
              console.log("Saved Rules:", rulesCode);
              setRulesModalOpen(false);
            }}
            className={styles.saveBtn}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
