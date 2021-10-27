const keyCodes = {
  13: 'Enter',
  32: 'Space',
  9: 'Tab',
  27: 'Escape',
  40: 'ArrowDown',
  37: 'ArrowLeft',
  39: 'ArrowRight',
  38: 'ArrowUp',
}

/**
* Noramlize code & keyCode for keyboard events
* @param {object} event
* @return {?string}
*/
export const normalizeKeyCode = ({ code, keyCode }) => {
  if (code !== undefined) return code

  if (keyCode !== undefined) return keyCodes[keyCode] ?? null

  return null
}
