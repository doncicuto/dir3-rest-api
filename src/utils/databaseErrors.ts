export const isDBConnectionError = (error: Error) => {
  return (
    error.message.includes("database server") ||
    error.message.includes("timed out") ||
    error.message.includes("connection closed") ||
    error.message.includes("was denied access on the database") ||
    error.message.includes("opening a TLS connection") ||
    error.message.includes("database string is invalid.")
  );
};
