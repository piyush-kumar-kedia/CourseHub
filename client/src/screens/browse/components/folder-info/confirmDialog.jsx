import React from "react";

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
    heading: {
        fontSize: "2em",
        marginBottom: "0.5em",
    },
    input: {
        padding: "10px",
        fontSize: "1em",
        width: "100%",
        marginBottom: "1.5em",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    selectLabel: {
        textAlign: "left",
        fontWeight: "500",
        marginBottom: "0.3em",
        display: "block",
    },
    select: {
        width: "100%",
        padding: "10px",
        fontSize: "1em",
        marginBottom: "1.5em",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "1em",
    },
    confirmBtn: {
        backgroundColor: "#22c55e",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1em",
    },
    cancelBtn: {
        backgroundColor: "#9ca3af",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1em",
    },
};

const ConfirmDialog = ({
    show,
    input = false,
    inputValue = "",
    onInputChange = () => {},
    childType = "",
    onChildTypeChange = () => {},
    onCancel,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
}) => {
    if (!show) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.dialog}>
                <h2 style={styles.heading}>Enter Folder Name</h2>
                {input && (
                    <input
                        type="text"
                        placeholder="Folder name"
                        value={inputValue}
                        onChange={onInputChange}
                        style={styles.input}
                    />
                )}
                <select
                    value={childType}
                    onChange={(e) => onChildTypeChange(e.target.value)}
                    style={styles.select}
                >
                    <option value="" disabled>
                        Select child type
                    </option>
                    <option value="File">File</option>
                    <option value="Folder">Folder</option>
                </select>
                <div style={styles.buttonGroup}>
                    <button style={styles.cancelBtn} onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button style={styles.confirmBtn} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { ConfirmDialog };
