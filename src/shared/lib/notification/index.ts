import { toast } from "react-toastify";

type NotificationKind = 'success' | 'warning' | 'error';

const notification = (kind?: NotificationKind) => (message: string) => {
    return toast(message, {type: kind || "info"})
}

export const notifyInfo = notification();
export const notifySuccess = notification('success');
export const notifyWarning = notification('warning');
export const notifyError = notification('error');