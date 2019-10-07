const notifier = require('node-notifier');

/**
 *
 * @param taskName
 * @param error
 */
module.exports = function notiry(taskName, error) {
  const title = `[task]${taskName} ${error.plugin}`;
  const errorMsg = `error: ${error.message}`;
  /* eslint-disable no-console */
  console.error(`${title}\n${error}`);
  notifier.notify({
    title,
    message: errorMsg,
    time: 3000,
  });
};
