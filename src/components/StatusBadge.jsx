import React from "react";

function StatusBadge({ status }) {
  const cls = `status-badge status-${status.toLowerCase()}`;
  return (
    <span className={cls}>
      <span className="dot" />
      {status}
    </span>
  );
}

export default StatusBadge;