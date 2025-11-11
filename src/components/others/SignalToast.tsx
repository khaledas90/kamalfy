"use client";

import {
  getNotificationDecoration,
  getNotificationIcon,
  NotificationData,
} from "@/lib/ToastType";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SignalToast = ({ notification }: { notification: NotificationData }) => {
  const icon = getNotificationIcon(notification.type);
  const { bgColor, borderColor, showSparkle } = getNotificationDecoration(
    notification.type
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`flex items-start gap-3 p-4 rounded-lg shadow-lg max-w-md w-full border ${borderColor} ${bgColor}`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex-shrink-0 mt-1 relative"
      >
        {icon}
        {showSparkle && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
              duration: 1.5,
            }}
          >
            <Sparkles className="h-3 w-3 text-yellow-400" />
          </motion.div>
        )}
      </motion.div>

      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-medium text-gray-900 dark:text-white"
        >
          {notification.title}
        </motion.div>

        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-600 dark:text-gray-300 mt-1"
          >
            {notification.message}
          </motion.div>
        )}

        {notification.link && (
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            href={notification.link}
            className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-block mt-2 underline"
          >
            View details
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default SignalToast;
