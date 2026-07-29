export function getErrorMessage(
  error,
  fallbackMessage = "Something went wrong. Please try again.",
) {
  if (!error) {
    return fallbackMessage;
  }

  if (typeof error === "string") {
    return error;
  }

  const responseData = error.response?.data;

  if (typeof responseData === "string") {
    return responseData;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.error) {
    return responseData.error;
  }

  if (responseData?.details) {
    return responseData.details;
  }

  if (responseData?.errors) {
    if (Array.isArray(responseData.errors)) {
      return responseData.errors
        .map((item) => item.message || item.defaultMessage || item)
        .join(", ");
    }

    if (typeof responseData.errors === "object") {
      return Object.values(responseData.errors).join(", ");
    }
  }

  if (error.code === "ERR_NETWORK") {
    return "Unable to connect to the server. Make sure the backend is running.";
  }

  if (error.code === "ECONNABORTED") {
    return "The server took too long to respond.";
  }

  if (error.message) {
    return error.message;
  }

  return fallbackMessage;
}