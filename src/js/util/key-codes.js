const keyCodes = {
  9: 'Tab',
  13: 'Enter',
  27: 'Escape',
  32: 'Space',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
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
