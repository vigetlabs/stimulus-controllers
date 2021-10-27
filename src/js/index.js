import { Application } from '@hotwired/stimulus'

import SlideController from './controllers/slide_controller'
import ClassListController from './controllers/class-list_controller'
import TabsController from './controllers/tabs_controller'
import ClipboardController from './controllers/clipboard_controller'

window.Stimulus = Application.start()
Stimulus.register('slide', SlideController)
Stimulus.register('class-list', ClassListController)
Stimulus.register('tabs', TabsController)
Stimulus.register('clipboard', ClipboardController)
Stimulus.debug = true
