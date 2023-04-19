import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { withSwal } from 'react-sweetalert2';
import axios from "axios"

function Categories ({swal}) {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')
  const [properties, setProperties] = useState([])

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
    const data = {
      name,
      parentCategory,
      properties:properties.map(p => ({name: p.name, values:p.values.split(',')})),
    }
    if(editedCategory){
      data._id = editedCategory._id
      await axios.put('/api/categories', data);
      setEditedCategory(null)
    }else{
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');
    setProperties('');
    fetchCategories()
  };

  function editCategory (category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id)
    setProperties(
        category.properties.map(({name, values}) => ({
        name,
        values: values.join(',')
      }))
    );
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

  function addProperty () {
    setProperties(prev => {
      return [...prev, {name: "", values: ''}];
    });
  }

  function handlePropertyNameChange (index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties
    });
  }

  function handlePropertyValueChange (index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties
    });
  }

  function removeProperty (indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, propertyIndex) => {
        return propertyIndex !== indexToRemove
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>{editedCategory ? `Edit category "${editedCategory.name}"` : "Create new category name"}</label>
      <form onSubmit={saveCategory}>
          <div className="flex gap-1">
            <input value={name} onChange={e => setName(e.target.value)} className="mr-2" placeholder="category name" />
            <select className="" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
              <option value="">No parent category</option>
              {categories.length > 0 && categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
            ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block">Properties</label>
            <button onClick={addProperty}
             type="button"
             className="btn-default">Add new property</button>
             {properties.length > 0 && properties.map((property, index) => (
              <div key={property._id} className="flex gap-3 mt-3">
                <input className="mb-0" value={property.name}
                  onChange={(e) => handlePropertyNameChange(index, property, e.target.value)}
                  type="text" placeholder="property name (example: color)" />
                <input className="mb-0" value={property.values}
                  onChange={(e) => handlePropertyValueChange(index, property, e.target.value)}
                  type="text" placeholder="values, comma separated" />

                  <button
                    type="button"
                    onClick={() => removeProperty(index)}
                    className="btn-default flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                      Remove
                  </button>
              </div>
             ))}
          </div>
          <div className="flex gap-1">
            <button className="btn-primary" type={"submit"}>Save</button>
          <button className="btn-default" type="button" onClick={() => {
          setEditedCategory(null);
          setName('');
          setParentCategory('');
          setProperties([]);
          }} >Cancel</button>
          </div>
      </form>
      {!editedCategory && (
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
                  <button className="flex items-center gap-2 content-evenly" onClick={() => editCategory(category)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit
                  </button>
                  <button className="flex items-center gap-2 content-evenly" onClick={() => deleteCategory(category)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  )
}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal} />
))
