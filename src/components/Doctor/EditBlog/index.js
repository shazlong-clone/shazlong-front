import React from 'react'
import WriteBlog from '../WriteBlog'
import { useParams } from 'react-router-dom'

function EditBlog() {
    const { id } = useParams();
  return (
    <WriteBlog id={id} />
  )
}

export default EditBlog