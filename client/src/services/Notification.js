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
      NotificationManager.warning(message, "Warning");
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
