import { useState, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus, GitBranch, Send, Database } from "lucide-react";
import type { Node, Edge, OnConnect } from "@xyflow/react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import styles from "./Home.module.css";
import CircularNode from "../../components/Home/CircularNode";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import CodeEditor from "../../components/CodeEditor";
import {
  ReceiverTypes,
  SenderTypes,
  ProcessorTypes,
} from "../../constants/config";

const languagesForRules = [
  "javascript",
  "typescript",
  "python",
  "json",
  "sql",
  "xml",
];

const languagesForConfig = ["json", "yaml"];

export default function Home() {
  const [pipelines, setPipelines] = useState([{ id: 1, name: "Pipeline 1" }]);
  const [selectedPipeline, setSelectedPipeline] = useState(1);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [count, setCount] = useState(1);
  const receiverMaxLimit = useRef(0);
  const [receiverCount, setReceiverCount] = useState(5);
  const [processorCount, setProcessorCount] = useState(5);
  const [senderCount, setSenderCount] = useState(5);
  const [isRulesModalOpen, setRulesModalOpen] = useState(false);
  const [isConfigModalOpen, setConfigModalOpen] = useState(false);

  const addPipeline = () => {
    const id = pipelines.length + 1;
    setPipelines([...pipelines, { id, name: `Pipeline ${id}` }]);
    setSelectedPipeline(id);
  };

  const nodeTypes = {
    circle: CircularNode,
  };

  const handleDelete = (id: string) => {
    console.log("Delete", id);
    if (id.includes("receiver")) {
      receiverMaxLimit.current -= 1;
      setReceiverCount((prev) => prev + 1);
    } else if (id.includes("processor")) {
      setProcessorCount((prev) => prev + 1);
    } else if (id.includes("sender")) {
      setSenderCount((prev) => prev + 1);
    }

    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  };

  const handleAddRules = (id: string) => {
    console.log("Add Rules for", id);
    setRulesModalOpen(true);
  };

  const handleAddConfig = (id: string) => {
    console.log("Add Config for", id);
    setConfigModalOpen(true);
  };

  const addNodeWithSubtype = (minionType: string, subType: string) => {
    if (minionType == "receiver") {
      receiverMaxLimit.current += 1;
      setReceiverCount((prev) => prev - 1);

      if (receiverMaxLimit.current > 1) {
        alert("Only one Receiver node is allowed.");
        return;
      }
    }

    const symbol =
      minionType === "receiver" ? "R" : minionType === "processor" ? "P" : "S";

    const newNode: Node = {
      id: `${minionType}-${count}`,
      type: "circle",
      data: {
        label: symbol,
        minionType: minionType.toLowerCase(),
        subType: subType,
        onDelete: handleDelete,
        onAddRules: handleAddRules,
        onAddConfig: handleAddConfig,
      },
      position: { x: Math.random() * 400 + 50, y: Math.random() * 400 + 50 },
    };

    setCount((prev) => prev + 1);
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect: OnConnect = (params) =>
    setEdges((eds) => addEdge(params, eds));

  const handleSelectSubtype = (minionType: string, subType: string) => {
    addNodeWithSubtype(minionType, subType);
  };

  return (
    <MainLayout>
      <div className={styles.app}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h2
            style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: 12 }}
          >
            Pipelines
          </h2>

          {pipelines.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPipeline(p.id)}
              className={`${styles.pipelineItem} ${
                selectedPipeline === p.id ? styles.pipelineItemActive : ""
              }`}
            >
              <GitBranch size={18} />
              {p.name}
            </div>
          ))}

          <button onClick={addPipeline} className={styles.addPipelineBtn}>
            <Plus size={18} /> Add Pipeline
          </button>
        </div>

        {/* Main Panel */}
        <div className={styles.mainPanel}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={(changes) =>
                setNodes((nds) => applyNodeChanges(changes, nds))
              }
              onEdgesChange={(changes) =>
                setEdges((eds) => applyEdgeChanges(changes, eds))
              }
              onConnect={onConnect}
              fitView
              deleteKeyCode={["Delete", "Backspace"]}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <h2
            style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: 12 }}
          >
            Nodes
          </h2>

          <div className={styles.nodeRow}>
            <div
              className={`${styles.nodeCircleButton} ${styles.receiverBtn}`}
              onClick={() => {
                setPendingMinionType("receiver");
              }}
            >
              R
            </div>
            <span className={styles.count}>available {receiverCount}</span>
          </div>
          <div className={styles.popup}>
            {Object.entries(ReceiverTypes).map(([key, label]) => (
              <div
                key={key}
                className={styles.popupItem}
                onClick={() => handleSelectSubtype("receiver",key)}
              >
                {label}
              </div>
            ))}
          </div>

          <div className={styles.nodeRow}>
            <div
              className={`${styles.nodeCircleButton} ${styles.processorBtn}`}
              onClick={() => {
                setPendingMinionType("processor");
              }}
            >
              P
            </div>
            <span className={styles.count}>available {processorCount}</span>
          </div>
          <div className={styles.popup}>
            {Object.entries(ProcessorTypes).map(([key, label]) => (
              <div
                key={key}
                className={styles.popupItem}
                onClick={() => handleSelectSubtype("processor",key)}
              >
                {label}
              </div>
            ))}
          </div>

          <div className={styles.nodeRow}>
            <div
              className={`${styles.nodeCircleButton} ${styles.senderBtn}`}
              onClick={() => {
                setPendingMinionType("sender");
              }}
            >
              S
            </div>
            <span className={styles.count}>available {senderCount}</span>
          </div>
          <div className={styles.popup}>
            {Object.entries(SenderTypes).map(([key, label]) => (
              <div
                key={key}
                className={styles.popupItem}
                onClick={() => handleSelectSubtype("sender",key)}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {isRulesModalOpen && (
        <CodeEditor
          type={"Rules"}
          languages={languagesForRules}
          setRulesModalOpen={setRulesModalOpen}
        />
      )}
      {isConfigModalOpen && (
        <CodeEditor
          type={"Config"}
          languages={languagesForConfig}
          setRulesModalOpen={setConfigModalOpen}
        />
      )}
    </MainLayout>
  );
}