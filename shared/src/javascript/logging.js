import pino from "pino";

export const STDOUT = 1;
export const STDERR = 2;

export const PINO_PRETTY_TARGET = {
  target: "pino-pretty",
  options: {
    sync: true,
    colorize: true,
  },
};

export function createLogger(destination = null, mkdir = true, append = false) {
  const targets = [PINO_PRETTY_TARGET];
  if (destination !== null && ![STDOUT, STDERR].includes(destination)) {
    targets.splice(0, 0, {
      target: "pino/file",
      options: { destination: destination, mkdir, append },
    });
  }
  targets.splice(0, 0, {
    target: "pino/file",
    options: { destination: STDERR },
  });
  return pino({
    transport: {
      targets,
    },
  });
}
