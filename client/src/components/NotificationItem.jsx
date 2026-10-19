import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification, onClose }) {
  const { dispatch } = useNotifications();

  const { mutate: markAsRead } = useMutation({
    mutationFn: (notificationId) => apiClient.patch(`/api/notifications/${notificationId}/read`),
    onMutate: (notificationId) => {
      dispatch({ type: "MARK_READ", payload: notificationId });
    },
    onError: (error) => {
      console.error("[NotificationItem] mark-as-read failed:", error);
      apiClient.get("/api/notifications")
        .then((response) => dispatch({ type: "LOAD_NOTIFICATIONS", payload: response.data }))
        .catch((refreshError) => console.error("[NotificationItem] notification refresh failed:", refreshError));
    },
  });

  function handleClick() {
    if (!notification.isRead) markAsRead(notification.id);
    onClose();
  }

  const timestamp = notification.createdAt || notification.timestamp;

  return (
    <li>
      <button type="button" onClick={handleClick} style={{ width: "100%", padding: "0.85rem 1rem", border: 0, borderBottom: "1px solid #f1f5f9", cursor: "pointer", background: notification.isRead ? "#fff" : "#eff6ff", color: "inherit", display: "flex", gap: "0.7rem", textAlign: "left" }}>
        <span aria-hidden="true" style={{ marginTop: 5, flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: notification.isRead ? "transparent" : "#3b82f6" }} />
        <span>
          <span style={{ display: "block", fontSize: "0.875rem" }}>{notification.message}</span>
          {timestamp && <time dateTime={timestamp} style={{ display: "block", marginTop: 4, fontSize: "0.75rem", color: "#94a3b8" }}>{new Date(timestamp).toLocaleString()}</time>}
        </span>
      </button>
    </li>
  );
}
