import {
  getNotificationType,
} from "../../config/notificationConfig";

export default function NotificationIcon({
  type,
  size = "medium",
}) {
  const notificationType =
    getNotificationType(type);

  const Icon =
    notificationType.icon;

  const sizeClasses = {
    small: "h-9 w-9 rounded-xl",
    medium: "h-11 w-11 rounded-2xl",
    large: "h-14 w-14 rounded-2xl",
  };

  const iconSizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
  };

  return (
    <span
      className={[
        "flex shrink-0 items-center justify-center",
        sizeClasses[size] ||
          sizeClasses.medium,
        notificationType.iconClassName,
      ].join(" ")}
    >
      <Icon
        className={
          iconSizeClasses[size] ||
          iconSizeClasses.medium
        }
      />
    </span>
  );
}