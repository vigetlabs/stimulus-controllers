import { Controller } from '@hotwired/stimulus'
import { normalizeKeyCode } from '../util/key-codes'
import { wrap } from '../util/wrap'

export default class extends Controller {
  static targets = ['tablist', 'tab', 'panel']

  static values = {
    index: Number,
    disabledMq: String, // this must be a valid media query
    isDisabled: Boolean, // toggled by a media query listener
  }

  currentTab = {
    tab: null,
    panel: null,
  }

  /**
   * Lifecycle
   */

  initialize() {
    this.mq = this.hasDisabledMqValue
      ? window.matchMedia(`${this.disabledMqValue}`)
      : null

    if (this.mq) {
      this._handleMqChange(this.mq)
    }
  }

  connect() {
    this.currentTab = {
      tab: this.tabTargets[this.indexValue],
      panel: this.panelTargets[this.indexValue],
    }

    if (this.mq) {
      this.mq.addEventListener('change', this._handleMqChange)
    }
  }

  disconnect() {
    if (this.mq) {
      this.mq.removeEventListener('change', this._handleMqChange)
    }
  }

  /**
   * Value-changed handlers
   */

  isDisabledValueChanged() {
    if (this.isDisabledValue) {
      if (this.hasTablistTarget) {
        this.tablistTarget.setAttribute('hidden', true)
      }

      this.panelTargets.forEach((panel) => {
        panel.removeAttribute('hidden')
        panel.removeAttribute('role')
      })
    } else {
      if (this.hasTablistTarget) {
        this.tablistTarget.removeAttribute('hidden')
      }

      this.panelTargets.forEach((panel, i) => {
        panel.setAttribute('role', 'tabpanel')
        this.indexValue === i
          ? panel.removeAttribute('hidden')
          : panel.setAttribute('hidden', true)
      })
    }
  }

  indexValueChanged() {
    const { tab: prevTab, panel: prevPanel } = this.currentTab
    if (!prevTab || !prevPanel) {
      return
    }

    prevTab.removeAttribute('aria-selected')
    prevTab.setAttribute('tabindex', -1)
    prevPanel.setAttribute('hidden', true)
    prevPanel.removeAttribute('tabindex')

    const tab = this.tabTargets[this.indexValue]
    const panel = this.panelTargets[this.indexValue]

    document.activeElement !== tab && tab.focus()

    tab.setAttribute('aria-selected', 'true')
    tab.removeAttribute('tabindex')
    panel.removeAttribute('hidden')
    panel.setAttribute('tabindex', 0)

    this.currentTab = {
      tab,
      panel,
    }
  }

  /**
   * Public methods
   */

  selectTab = (e) => {
    this.indexValue = this.tabTargets.indexOf(e.currentTarget)
  }

  handleKeydown = (e) => {
    const key = normalizeKeyCode(e)
    console.log(key)
    if (['ArrowRight', 'ArrowLeft'].includes(key)) {
      this.cycleTabs(key)
      return
    }

    if (key === 'Home') {
      this.indexValue = 0
      return
    }

    if (key === 'End') {
      this.indexValue = this.panelTargets.length - 1
      return
    }
  }

  cycleTabs = (key) => {
    this.indexValue = wrap(
      key === 'ArrowRight' ? this.indexValue + 1 : this.indexValue - 1,
      this.panelTargets.length
    )
  }

  /**
   * Private methods
   */
  _handleMqChange = ({ matches }) => (this.isDisabledValue = matches)
}
