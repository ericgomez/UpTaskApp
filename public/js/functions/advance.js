import Swal from 'sweetalert2'

export const updateAdvance = () => {
  // Select existing tasks
  const tasks = document.querySelectorAll('li.task')

  if (tasks.length) {
    // select completed tasks
    const tasksComplete = document.querySelectorAll('i.complete')

    // calculate the percentage of completed tasks
    const advance = Math.round((tasksComplete.length / tasks.length) * 100)

    // show advance
    const percentage = document.querySelector('#percentage')
    percentage.style.width = `${advance}%`

    if (advance === 100) {
      Swal.fire(
        'Project completed!',
        'Successfully completed the project!',
        'success'
      )
    }
  }
}
