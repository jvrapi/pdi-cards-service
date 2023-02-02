import chalk from 'chalk';
import util from 'node:util';

const { log, time, timeEnd } = console;

export const logger = {
  error: (message: unknown) => log(chalk.red.bold(util.format(message))),
  success: (message: unknown) => log(chalk.green.bold(util.format(message))),
  warn: (message: unknown) => log(chalk.yellow.bold(util.format(message))),
  message: (message: unknown) => log(chalk.cyan.bold(util.format(message))),
  timerStart: (label: string) => time(chalk.green.bold(`✔️ ${label}`)),
  timerEnd: (label: string) => timeEnd(chalk.green.bold(`✔️ ${label}`))
};
