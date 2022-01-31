import Swal from 'sweetalert2'
import axios from 'axios'

const btnDelete = document.querySelector('#delete-project')

btnDelete.addEventListener('click', e => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete project!'
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'Your project has been deleted.', 'success')

      // redirect at home
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    }
  })
})
