interface Props {
  permission: NotificationPermission;
  handleEnableNotifications: () => void;
}

export default function EnableNotifications({ permission, handleEnableNotifications }: Props) {
  return (
    <div className="mb-4">
      <button
        onClick={handleEnableNotifications}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Enable Notifications
      </button>
      <div className="text-sm">
        Notification permission: <strong>{permission}</strong>
      </div>
    </div>
  );
}
