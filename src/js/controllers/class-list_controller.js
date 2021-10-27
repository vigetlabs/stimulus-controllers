import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['receiver']
  static classes = ['change']
  static values = {
    useClasses: Boolean,
  }

  useClassesValueChanged() {
    this._updateClassNames(this.changeClasses, this.useClassesValue)
  }

  toggle = ({ params }) => {
    this.useClassesValue = !this.useClassesValue
    this._updateClassNames(params.class)
    this.dispatch('toggle')
  }

  add = ({ params }) => {
    this.useClassesValue = true
    this._updateClassNames(params.class, true)
    this.dispatch('add')
  }

  remove = ({ params }) => {
    this.useClassesValue = false
    this._updateClassNames(params.class, false)
    this.dispatch('remove')
  }

  _updateClassNames(classNames, force) {
    if (!classNames) return

    if (typeof classNames === 'string') {
      classNames = classNames.split(' ')
    }

    this.receiverTargets.forEach((el) =>
      classNames.forEach((className) => el.classList.toggle(className, force))
    )
  }
}
