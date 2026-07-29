export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value =
    bytes / 1024 ** unitIndex;

  return `${value.toFixed(
    unitIndex === 0 ? 0 : 1,
  )} ${units[unitIndex]}`;
}

export function getFileExtension(filename = "") {
  const parts = filename.split(".");

  if (parts.length < 2) {
    return "";
  }

  return parts.at(-1).toUpperCase();
}

export function downloadBlob(
  blob,
  filename = "document",
) {
  const objectUrl =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = filename;

  document.body.appendChild(anchor);

  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(objectUrl);
}

export function createObjectPreview(blob) {
  return URL.createObjectURL(blob);
}