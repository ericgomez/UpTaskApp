import projects from './modules/projects'
import tasks from './modules/tasks'
import { updateAdvance } from './functions/advance'

// Execute the function updateAdvance() when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateAdvance()
})
