import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { Settings } from "lucide-react";
import styles from "./CircularNode.module.css";
import {
  ReceiverTypes,
  SenderTypes,
  ProcessorTypes,
  typeMap,
} from "../../constants/config";

import type { MinionType, SubType } from "../../constants/config";

interface NodeData {
  label: string;
  minionType: MinionType;
  subType: SubType;
  onDelete: (id: string) => void;
  onAddRules: (id: string) => void;
  onAddConfig: (id: string) => void;
}

interface Props {
  id: string;
  data: NodeData;
}

export default function CircularNode({ data, id }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<any>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Node Circle */}
      <div className={`${styles.circle} ${styles[data.minionType]}`}>
        {data.label}
      </div>

      {/* Settings Button */}
      <button
        className={styles.settingsBtn}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <Settings size={48} style={{ color: "black" }} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div ref={menuRef} className={styles.dropdown}>
          <div
            style={{
              backgroundColor: "#00d793ff",
              fontSize: "0.7rem",
              fontWeight: "700",
            }}
          >
            {typeMap[data.minionType]?.[data.subType] ?? ""}
          </div>
          <div className={styles.menuItem} onClick={() => data.onDelete(id)}>
            Delete
          </div>
          <div className={styles.menuItem} onClick={() => data.onAddRules(id)}>
            Add Rules
          </div>
          <div className={styles.menuItem} onClick={() => data.onAddConfig(id)}>
            Add Config
          </div>
          <div className={styles.menuItem} onClick={() => setOpen(false)}>
            Close
          </div>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: "0.8rem", height: "0.8rem" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: "0.8rem", height: "0.8rem" }}
      />
    </div>
  );
}
