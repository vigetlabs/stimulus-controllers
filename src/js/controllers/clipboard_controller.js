import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['source', 'ctaText', 'successText']
  static classes = ['toggleSuccess']
  static values = {
    textToCopy: String,
    successDelay: {
      default: 1000,
      type: Number,
    },
  }

  successTimeout = null

  copy() {
    if (!this.textToCopyValue && !this.hasSourceTarget) {
      return
    }

    /**
     * Copy the text
     */
    const textToCopy =
      (this.textToCopyValue || null) ??
      this.sourceTarget.value ??
      this.sourceTarget.innerText
    navigator.clipboard.writeText(textToCopy)

    /**
     * If ctaText and successText targets exist, flash success message
     */
    if (this.hasCtaTextTarget && this.hasSuccessTextTarget) {
      const classes = this.hasToggleSuccessClass
        ? this.toggleSuccessClasses
        : ['opacity-0', 'invisible']

      this.ctaTextTarget.classList.add(...classes)
      this.successTextTarget.classList.remove(...classes)

      clearTimeout(this.successTimeout)
      this.successTimeout = setTimeout(() => {
        this.ctaTextTarget.classList.remove(...classes)
        this.successTextTarget.classList.add(...classes)
        this.dispatch('success-dismissed')
      }, this.successDelayValue)
    } else {
      /**
       * Still emit success-dismissed event for other usage
       */
      clearTimeout(this.successTimeout)
      this.successTimeout = setTimeout(() => {
        this.dispatch('success-dismissed')
      }, this.successDelayValue)
    }

    this.dispatch('copy')
  }
}
