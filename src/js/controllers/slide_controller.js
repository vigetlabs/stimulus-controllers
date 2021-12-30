import Slide from '../util/slide'
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['toggler', 'receiver']
  static classes = ['collapsed']
  static values = {
    isOpen: Boolean,
  }

  /**
   * Lifecycle
   */

  initialize() {
    this.slide = new Slide({
      el: this.receiverTarget || this.element,
      collapsedClass: this.hasCollapsedClass ? this.collapsedClass : undefined,
    })
  }

  /**
   * Value-changed handlers
   */

  isOpenValueChanged = () => {
    this.isOpenValue ? this._open() : this._close()
  }

  /** Public methods */

  toggle = (e) => {
    this.isOpenValue = !this.isOpenValue
    e.currentTarget.setAttribute(
      'aria-expanded',
      this.isOpenValue ? 'true' : 'false'
    )
    this.dispatch('toggle')
  }

  open = (e) => {
    this.isOpenValue = true
    e.currentTarget.setAttribute('aria-expanded', 'true')
  }

  close = (e) => {
    this.isOpenValue = false
    e.currentTarget.setAttribute('aria-expanded', 'false')
  }

  /**
   * Private methods
   */

  _close = () => {
    if (!this.slide) return
    this.slide.close()
    this.togglerTargets.forEach((el) =>
      el.setAttribute('aria-expanded', 'false')
    )
    this.element.removeAttribute('open')
    this.dispatch('close')
  }

  _open = () => {
    this.slide.open()
    this.togglerTargets.forEach((el) =>
      el.setAttribute('aria-expanded', 'true')
    )
    this.element.setAttribute('open', 'true')
    this.dispatch('open')
  }
}
