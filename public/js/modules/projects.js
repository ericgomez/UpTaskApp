import Swal from 'sweetalert2'
import axios from 'axios'

const btnDelete = document.querySelector('#delete-project')

if (btnDelete) {
  btnDelete.addEventListener('click', e => {
    // data-project-url is a custom attribute
    // data-project-url = dataset.projectUrl
    const urlProject = e.target.dataset.projectUrl

    // console.log(urlProject)

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
        // Send the request to the server with axios
        const url = `${location.origin}/project/${urlProject}`

        axios
          .delete(url, { params: { urlProject } })
          .then(response => {
            console.log(response)
            Swal.fire('Deleted!', response.data, 'success')

            // redirect at home
            setTimeout(() => {
              window.location.href = '/'
            }, 3000)
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  })
}

export default btnDelete
