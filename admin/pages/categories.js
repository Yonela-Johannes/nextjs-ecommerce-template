import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { withSwal } from 'react-sweetalert2';
import axios from "axios"

function Categories ({swal}) {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')

  function fetchCategories () {
  axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  };

  useEffect(() => {
    fetchCategories()
  }, []);

  async function saveCategory (e){
    e.preventDefault();

    const data = {name, parentCategory}
    if(editedCategory){
      data._id = editedCategory._id
      await axios.put('/api/categories', data);
      setEditedCategory(null)
    }else{
      await axios.post('/api/categories', data);
    }
    setName('')
    fetchCategories()
  };

  function editCategory (category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id)
  }

  function deleteCategory (category) {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.name}`,
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#d55',
      reverseButtons: true,
      }).then(async result => {
          // when confirmed and promise resolved...
          const {_id} = category
          if(result.isConfirmed){
            await axios.delete('/api/categories?_id='+_id);
            fetchCategories()
          }
      })
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit category "${editedCategory.name}"` : "Create new category name"}</label>
      <form className="flex " onSubmit={saveCategory}>
          <input value={name} onChange={e => setName(e.target.value)} className="mb-0 mr-2" placeholder="category name" />
          <select className="mb-0" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
            <option value="">No parent category</option>
            {categories.length > 0 && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
          ))}
          </select>
          <button className="btn-primary" type={"submit"}>Save</button>
      </form>
      <table className="basic my-6">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td className="flex gap-2">
                <button onClick={() => editCategory(category)}>Edit</button>
                <button onClick={() => deleteCategory(category)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal} />
))
