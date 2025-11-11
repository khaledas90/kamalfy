import {
  AlertCircle,
  CheckCircle,
  Info,
  UserPlus,
  XCircle,
} from "lucide-react";

export type NotificationType =
  | "SUCCESS"
  | "ERROR"
  | "WARNING"
  | "INFO"
  | "NEW_MEMBER";

export interface NotificationData {
  title: string;
  message?: string;
  type: NotificationType;
  link?: string | null;
}

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "SUCCESS":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "ERROR":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "WARNING":
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    case "INFO":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "NEW_MEMBER":
      return <UserPlus className="h-5 w-5 text-green-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

// Helper function to get decoration for notification type
export const getNotificationDecoration = (type: NotificationType) => {
  switch (type) {
    case "SUCCESS":
      return {
        bgColor: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        showSparkle: true,
      };
    case "ERROR":
      return {
        bgColor: "bg-red-50 dark:bg-red-900/20",
        borderColor: "border-red-200 dark:border-red-800",
        showSparkle: false,
      };
    case "WARNING":
      return {
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        borderColor: "border-amber-200 dark:border-amber-800",
        showSparkle: false,
      };
    case "INFO":
      return {
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        showSparkle: false,
      };
    case "NEW_MEMBER":
      return {
        bgColor: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        showSparkle: true,
      };
    default:
      return {
        bgColor: "bg-gray-50 dark:bg-gray-900/20",
        borderColor: "border-gray-200 dark:border-gray-800",
        showSparkle: false,
      };
  }
};
