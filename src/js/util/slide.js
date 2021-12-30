export default class Slide {
  constructor({ el, collapsedClass = 'collapsed' }) {
    this.el = el
    this.collapsedClass = collapsedClass
  }

  toggle() {
    this.change('toggle')
  }

  open() {
    this.change('remove')
  }

  close() {
    this.change('add')
  }

  change(method) {
    this.el.addEventListener('transitionend', this.resetHeight, false)
    this.el.style.maxHeight = this.el.scrollHeight + 'px'
    this.el.style.overflow = 'hidden'

    // Wait a tick so height has applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.el.classList[method](this.collapsedClass)
      })
    })
  }

  resetHeight = (e) => {
    if (e.target === this.el) {
      this.el.style.overflow = ''
      this.el.style.maxHeight = 'none'
      this.el.removeEventListener('transitionend', this.resetHeight, false)
    }
  }
}
