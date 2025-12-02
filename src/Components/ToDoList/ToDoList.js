import React, { useEffect, useState } from 'react'

const ToDoList = () => {

  const [product, setProduct] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [toggle, setToggle] = useState(false)

  const getUser = async () => {

    setLoading(true)
    try {

      const userRes = await fetch('https://fakestoreapi.com/users')
      const resUser = await userRes.json()
      setUsers(resUser)
      console.log(resUser, 'user get list')

    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const tasks = {

    todo: [

      'Finalize sitemap and content',
      'Design homepage layout',
      'Implement mobile-first styles',
      'Add project showcase section',
      'Integrate contact form',
      'Test cross-browser compatibility'
    ],

    inProgress: [
      'Animate scroll transitions using Lenis + GSAP',
      'Apply WCAG accessibility best practices',
    ],
    completed: [
      'Set up project repo and boilerplate',
      'Installed dependencies (React, Tailwind, Lenis)'
    ]
  }

  useEffect(() => {
    fetch('https://dummyjson.com/products').then((res => res.json()))
      .then(res => {
        setProduct(res.products)
        console.log(res.products, 'print the data')
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>

      <section className='bg-cyan-100 p-5'>
        <article className='container mx-auto'>
          <div className='grid grid-cols-1'>
            <h2 className='text-center text-3xl font-bold '>Welcome to user list
              with show ? hide the data
            </h2>

            <div className='mb-5 '>
              <button className={ `p-3 ${toggle ? 'bg-blue-500 px-5 rounded text-xl mb-2  text-white font-bold uppercase'
                : 'bg-green-600 px-5 rounded text-xl text-white uppercase font-bold'}` }
                onClick={ () => setToggle(!toggle) }>
                { toggle ? 'hide user' : 'show user' }
              </button>
              { toggle && (
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4'>
                  { users?.map((user, index) =>
                    <li key={ index } className='p-4 border rounded bg-gray-100'>
                      <p>Name: { user.username }</p>
                      <p>Email: { user.email }</p>
                    </li>
                  ) }
                </ul>
              ) }
            </div>

          </div>

          <div className='grid grid-cols-1'>
            <h2 className='text-center text-2xl font-bold mb-2'>User Get List</h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 
          gap-3 p-3 bg-white border border-gray-400 rounded'>
            { users?.map((user, index) =>
              <div className="bg-gray-50 rounded px-2 py-2 border border-gray-200" key={ index }>
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className='flex gap-2 items-center'>
                      <span className='font-bold text-xl text-blue-500'>First Name:</span>
                      <span className='font-medium'>{ user.name.firstname }</span>
                    </h2>
                  </div>
                  <div>
                    <h2 className='flex gap-2 items-center'>
                      <span className='font-bold'>Last Name:</span>
                      { user.username }</h2>
                  </div>
                </div>
              </div>
            ) }
            {/* <table className='w-full table-fixed border text-gray-800'>
              <thead className='bg-cyan-700 text-white text-sm'>
                <tr key="">
                  <th className='px-2 py-2'>Name</th>
                </tr>
              </thead>
            </table> */}
          </div>

        </article>
      </section>

      <section>
        <article className='container gap-0'>
          <aside className='flex items-center justify-center'>
            <div className='grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xl:max-sm:grid-cols-1 max-xl:grid-cols-1 gap-3 sm:grid-cols-1 min-w-full w-full'>

              <div className='bg-slate-50 p-4 rounded-lg shadow-sm transition-xl my-8'>
                <div className='max-w-xl mx-auto'>
                  <h4 className='text-3xl font-bold text-center mb-3'>Uniq keys for dynamic list</h4>
                  <h2 className='text-2xl font-bold nb-4 text-green-900'> Task List: Portfolio Website</h2>
                  <div className='mb-4'>
                    <h3 className='text-xl font-bold text-blue-600 my-2'>To-Do</h3>
                    <ul className='list-inside'>
                      { tasks?.todo?.map((task, index) => {
                        const taskId = `task${index}`;
                        return (
                          <li key={ index }>
                            <input type="checkbox" id={ taskId } className='mr-3' />
                            <label htmlFor={ taskId } className='text-gray-600'>{ task }</label>
                          </li>
                        )
                      }) }
                    </ul>
                  </div>
                </div>
              </div>

              <div className='bg-slate-50 p-4 rounded-lg shadow-sm my-8'>
                <div className='max-w-xl mx-auto'>
                  <h2 className='text-2xl font-bold text-gray-800'>Task List In Progress</h2>
                  <div className='mb-4'>
                    <h3 className='text-xl text-orange-700 font-bold my-2'>In Progress</h3>
                    <ul className='list-inside'>
                      { tasks.inProgress.map((inpro, index) => {
                        const inproId = `inpro${index}`;
                        return (
                          <li key={ index } className=''>
                            <input type='checkbox' id={ inproId } className='mr-3' />
                            <label htmlFor={ inproId }>{ inpro }</label>
                          </li>
                        )
                      }) }
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </article>
      </section>

      <section>
        <div className='container'>
          <div className="row g-0 flex items-center justify-center">
            { product?.length > 0 ? (
              <div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 max-xl:grid-cols-1 gap-2">
                { product.slice(0, 10).map((pro, index) => (
                  <div className='bg-green-50 rounded-lg p-4 mb-2'>
                    <ul className="list-inside list-disc">
                      <article className='flex flex-col'>
                        <li key={ index }>{ pro.title } </li>
                        <li>
                          <span>{ pro.description }</span>
                        </li>
                      </article>
                    </ul>
                  </div>
                )) }
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-4 text-center">
                <p>No Data Found</p>
              </div>
            ) }
          </div>

        </div>
      </section>

    </>
  )
}

export default ToDoList