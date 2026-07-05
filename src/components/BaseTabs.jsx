import { useState } from "react";

function BaseTabs({
  bases,
  activeBaseId,
  onSelectBase,
  onAddBase,
  onDeleteBase,
  onRenameBase,
}) {
  const [editingBaseId, setEditingBaseId] = useState(null);
  const [draftName, setDraftName] = useState("");

  function startEditing(base) {
    setEditingBaseId(base.id);
    setDraftName(base.name);
  }

  function saveName(baseId) {
    const trimmedName = draftName.trim();

    if (trimmedName) {
      onRenameBase(baseId, trimmedName);
    }

    setEditingBaseId(null);
    setDraftName("");
  }

  return (
    <div className="base-tabs">
      {bases.map((base) => {
        const filledSlots = base.pals.filter(Boolean).length;

        return (
          <div
            className={`base-tab-wrapper ${
              base.id === activeBaseId ? "active" : ""
            }`}
            key={base.id}
          >
            {editingBaseId === base.id ? (
              <input
                className="base-name-input"
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                onBlur={() => saveName(base.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") saveName(base.id);
                  if (event.key === "Escape") setEditingBaseId(null);
                }}
                autoFocus
              />
            ) : (
              <button
                className="base-tab"
                onClick={() => onSelectBase(base.id)}
                onDoubleClick={() => startEditing(base)}
                title="Double-click to rename"
              >
                {base.name} ({filledSlots}/30) ✏️
              </button>
            )}

            {bases.length > 1 && (
              <button
                type="button"
                className="delete-base-button"
                onClick={() => onDeleteBase(base.id)}
                title="Delete base"
              >
                ×
              </button>
            )}
          </div>
        );
      })}

      <button className="base-tab add-tab" onClick={onAddBase}>
        + New Base
      </button>
    </div>
  );
}

export default BaseTabs;