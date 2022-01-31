import axios from 'axios'
import Swal from 'sweetalert2'

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
        if (res.status === 200) {
          icon.classList.toggle('complete')
        }
      })
    }

    if (e.target.classList.contains('fa-trash')) {
      // parentElement = return node that is the parent of the current node
      // dateset = get the value of an attribute custom to the element
      const taskHTML = e.target.parentElement.parentElement
      const idTask = taskHTML.dataset.taskId

      Swal.fire({
        title: 'Are you sure you want to delete the task?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete project!'
      }).then(result => {
        if (result.isConfirmed) {
          const url = `${location.origin}/task/${idTask}`

          axios.delete(url, { params: { idTask } }).then(res => {
            console.log(res)
          })
        }
      })
    }
  })
}

export default tasks
