import React from "react";
import tick from "../assets/tick.svg";
import cross from "../assets/cross.svg";

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    borderRadius: "8px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    fontFamily: "sans-serif",
  },

  iconImage: {
    width: "80px",
    height: "80px",
    margin:"1em",
  },
  heading: {
    fontSize:"2em",
  },
  message: {
    fontSize: "1em",
    color: "#374151",
    margin: "1em",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1em",
  },
  confirmBtn: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize:"1em",
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ef4444", 
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize:"1em",
  },
  cancelBtn: {
    backgroundColor: "#9ca3af", 
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize:"1em",
  },
};

const ConfirmDialog = ({ isOpen, type, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const isDelete = type === "delete";

  const message = isDelete
    ? "Do you want to permanently delete this file? This action cannot be undone."
    : "Do you want to verify this file? Once verified, it will be visible to all users.";

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
          <img
            src={isDelete ? cross : tick}
            alt={isDelete ? "Delete" : "Verify"}
            style={styles.iconImage}
          />
        <h3 style={styles.heading}>Are you sure?</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttonGroup}>
          <button
            style={isDelete ? styles.deleteBtn : styles.confirmBtn}
            onClick={onConfirm}
          >
            {isDelete ? "Delete" : "Verify"}
          </button>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
