import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const { notifications, unreadCount } = state;

  function markAllAsRead() {
    dispatch({ type: "MARK_ALL_READ" });
  }

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      style={{
        position: "absolute",
        top: "calc(100% + 0.65rem)",
        right: 0,
        width: "min(360px, calc(100vw - 2rem))",
        background: "#fff",
        color: "#0f172a",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.2)",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1rem", borderBottom: "1px solid #e2e8f0" }}>
        <strong>Notifications</strong>
        {unreadCount > 0 && (
          <button type="button" onClick={markAllAsRead} style={{ border: 0, background: "none", color: "#4f46e5", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p style={{ margin: 0, padding: "1.5rem 1rem", color: "#64748b", textAlign: "center" }}>
          No notifications yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: 360, overflowY: "auto" }}>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onClose={onClose} />
          ))}
        </ul>
      )}
    </div>
  );
}
