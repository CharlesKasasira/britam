import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import Header from '../../components/header/Header';
import { functions, db } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { FaEllipsisV } from "react-icons/fa";
import { Table } from 'react-bootstrap'
import { getDocs, collection, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Modal } from 'react-bootstrap'
import { useForm } from "../../hooks/useForm";
import ClientModal from '../../components/ClientModal';
import { MdEdit, MdDelete } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'

function Supervisors() {

    useEffect(() => {
      document.title = 'Britam - Supervisors'

      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.supervisor === true)
          setSuperviors(myUsers)
      }).catch((err) => {
          console.log(err)
      })
      getUsersMeta()

    }, [])

    const [fields, handleFieldChange] = useForm({
      user_role: '',
      email: '',
      name: '',
      dob: '',
      gender: '',
      phone: '',
      address: '',
      licenseNo: '',
      NIN: '',
      photo: '',
  })
  
  const [singleDoc, setSingleDoc] = useState(fields);
  
  const getSingleSupervisor = async (id) => setSingleDoc(supervisors.filter(supervisor => supervisor.uid == id)[0])

    

    const getSingleDoc = async (id) => {
      const docRef = doc(db, "organisations", id);
      const docSnap = await getDoc(docRef);
      setSingleDoc(docSnap.data());
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [meta, setMeta] = useState([])
    const [editID, setEditID] = useState(null);
    const metaCollectionRef = collection(db, "usermeta");
    const getUsersMeta = async () => {
      const data = await getDocs(metaCollectionRef);
      setMeta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

  const [supervisors, setSuperviors] = useState([]);

  const [editContactId, setEditContactId] = useState(null);

  const [ currentPage, setCurrentPage ] = useState(1)
  const [supervisorsPerPage] = useState(10)

  const indexOfLastSupervisor = currentPage * supervisorsPerPage
  const indexOfFirstSupervisor = indexOfLastSupervisor - supervisorsPerPage
  const currentSupervisors = supervisors.slice(indexOfFirstSupervisor, indexOfLastSupervisor)
  const totalPagesNum = Math.ceil(supervisors.length / supervisorsPerPage)



  const handleDelete = async (id) => {
    const deleteUser = httpsCallable(functions, 'deleteUser')
    deleteUser({uid:id}).then().catch(err => {
      console.log(err)
    })

    const userMetaDoc = doc(db, "usermeta", id);
    await deleteDoc(userMetaDoc);
  };



    // search by name
    const [searchText, setSearchText] = useState('')
    const handleSearch = ({ target }) => setSearchText(target.value);
    const searchByName = (data) => data.filter(row => row.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

    // actions context
  const [showContext, setShowContext] = useState(false)
  window.onclick = function(event) {
      if (!event.target.matches('.sharebtn')) {
          setShowContext(false)
      }
  }
  const [clickedIndex, setClickedIndex] = useState(null)

    return (
        <div className='components'>
          <Header title="Supervisors" subtitle="MANAGING SUPERVISORS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/admin/add-user">
                    <button className="btn btn-primary cta">Add supervisor</button>
                </Link>               
            </div>

            <Modal show={show} onHide={() =>
              {
                handleClose()
                setSingleDoc(fields)
              }}>
              <ClientModal fields={fields} singleDoc={singleDoc} handleFieldChange={handleFieldChange} />
            </Modal>

            <div className="shadow-sm table-card componentsData">   
                <div id="search">
                      <SearchBar placeholder={"Search Supervisor by name"} value={searchText} handleSearch={handleSearch}/>
                      <div></div>
                      <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                </div>

                    <Table hover striped responsive className='mt-5'>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {searchByName(supervisors).map((supervisor, index) => (
                              <tr key={supervisor.uid}>
                              <td>{index+1}</td>
                              <td>{supervisor.name}</td>
                              <td>{supervisor.email}</td>
                              {meta.filter(user => user.id == supervisor.uid).map(user => (
                                <Fragment key={user.id}>
                                  <td>{user.gender}</td>
                                  <td>{user.phone}</td>
                                  <td>{user.address}</td>
                                </Fragment>
                              ))}
                
                              <td className="started">
                                <button className="sharebtn" onClick={() => {setClickedIndex(index); setShowContext(!showContext)}}>&#8942;</button>

                                <ul  id="mySharedown" className={(showContext && index === clickedIndex) ? 'mydropdown-menu show': 'mydropdown-menu'} onClick={(event) => event.stopPropagation()}>
                                            <li onClick={() => {
                                                        setShowContext(false)
                                                        const confirmBox = window.confirm(
                                                          `Are you sure you want to ${supervisor.name}`
                                                        );
                                                        if (confirmBox === true) {
                                                          handleDelete(supervisor.uid)
                                                        }
                                                      }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdDelete/></i> Delete
                                                  </div>
                                            </li>
                                            <li onClick={() => {
                                                    setShowContext(false)
                                                    setEditID(supervisor.uid);
                                                    getSingleSupervisor(supervisor.uid)
                                                    handleShow();
                                                  }}
                                                >
                                                  <div className="actionDiv">
                                                    <i><MdEdit/></i> Edit
                                                  </div>
                                            </li>
                                            <li onClick={() => setShowContext(false)}
                                                >
                                                  <div className="actionDiv">
                                                    <i><AiFillCloseCircle/></i> Close
                                                  </div>
                                            </li>
                                </ul>
                              </td>
                          </tr>
                          ))}
                          <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr><th>#</th><th>Name</th><th>Email</th><th>Gender</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </tfoot>
                    </Table>

                  <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentSupervisors}
                    sortedEmployees={supervisors}
                    entries={'Supervisor'} />

               
            </div>
        </div>
    )
}

export default Supervisors
