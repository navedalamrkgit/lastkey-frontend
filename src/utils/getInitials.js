export function getInitials(firstName, lastName) {
  const firstInitial = firstName?.trim()?.charAt(0) || "";
  const lastInitial = lastName?.trim()?.charAt(0) || "";

  const initials = `${firstInitial}${lastInitial}`.toUpperCase();

  return initials || "LK";
}