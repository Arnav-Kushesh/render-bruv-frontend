function onChangeStop(name, callback, waitTime) {
  if (!waitTime) waitTime = 300;

  if (!name) name = callback.name;
  let timer = window["timer-" + name];

  if (timer) clearTimeout(timer);
  window["timer-" + name] = setTimeout(() => {
    callback();
  }, waitTime);
}

export default onChangeStop;
