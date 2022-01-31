import axios from 'axios'

const tasks = document.querySelector('.list-slopes')

if (tasks) {
  tasks.addEventListener('click', e => {
    if (e.target.classList.contains('fa-check-circle')) {
      const icon = e.target
      // parentElement = return node that is the parent of the current node
      // dateset = get the value of an attribute custom to the element
      const idTask = icon.parentElement.parentElement.dataset.taskId

      // request to /task/:id
      const url = `${location.origin}/task/${idTask}`
      axios.patch(url, { idTask }).then(res => {
        console.log(res)
      })
    }
  })
}

export default tasks
