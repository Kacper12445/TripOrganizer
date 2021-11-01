import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

const createNotification = (type, message) => {
  switch (type) {
    case "info":
      NotificationManager.info(message);
      break;
    case "success":
      NotificationManager.success(message, "Success");
      break;
    case "warning":
      NotificationManager.warning(
        "Warning message",
        "Close after 3000ms",
        3000
      );
      break;
    case "error":
      NotificationManager.error(message, "Error", 5000, () => {
        alert("callback");
      });
      break;
    default:
      break;
  }
};

export default createNotification;
