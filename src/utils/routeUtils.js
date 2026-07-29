export function buildRoute(
  routePattern,
  parameters = {},
) {
  if (
    typeof routePattern !== "string" ||
    !routePattern.trim()
  ) {
    console.error(
      "buildRoute received an invalid route pattern:",
      routePattern,
    );

    return "/";
  }

  return Object.entries(
    parameters,
  ).reduce(
    (route, [key, value]) => {
      const safeValue =
        value === null ||
        value === undefined
          ? ""
          : String(value);

      return route.replace(
        `:${key}`,
        encodeURIComponent(
          safeValue,
        ),
      );
    },
    routePattern,
  );
}