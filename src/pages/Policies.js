
import React, { useState, useEffect } from 'react'
import { Form,Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { useForm } from '../hooks/useForm'
import dynamicFields from '../helpers/multipleChoice'
import AddClient from '../parts/AddClient'

import '../styles/Policies.css'



import moment from 'moment'

// import AddClient from '../parts/AddClient'

// enlarging the size of + and -

function Policies() {
    const [ formData, setFormData ] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ field, handleFieldChange ] = useForm({})
    const [ classes, setClasses ] = useState([])
    const [ vehicleUses, setVehicleUses ] = useState([])
    let date = moment().format("l")
    // console.log(date)
    const [ policyStartDate, setPolicyStartDate ] = useState(null)
    const [ policyEndDate, setPolicyEndDate ] = useState(null)
    const [ currency, setCurrency ] = useState({})


    

    // console.log(policyStartDate)

    const { currencies, make, categories } = dynamicFields

    useEffect(() => {
        document.title = 'Britam - Policies'
    }, [])

    
    const [ clientDetails, setClientDetails ] = useState({}) 

    const [ stickers, setStickers ] = useState([
        {
            referenceNo:'',
            plateNo:'',
            seatingCapacity:'',
            ccPower:'',
            grossWeight:'',
            category:'', 
            motorClass:'',
            chasisNo:'',
            motorMake:'',
            vehicleUse:'',
            totalPremium:''
        }
    ])

    const handleInputChange = (index, event) => {
        const values = [...stickers]
        values[index][event.target.name] = event.target.value
        
                                        
        // console.log(event.name, event.target.value)
        setStickers(values)
    }

    const addStickerMotorDetails = () => {
        setStickers([
            ...stickers,
            {
                referenceNo:'',
                plateNo:'',
                seatingCapacity:'',
                ccPower:'',
                grossWeight:'',
                category:'', 
                motorClass:'',
                chasisNo:'',
                motorMake:'',
                vehicleUse:'',
                totalPremium:''
            }
        ])
        // console.log(stickers)
    }

    const removeStickerMotorDetails = (index) => {
        if(stickers.length > 1){
            const stickersDetails = [...stickers]
            stickersDetails.splice(index, 1)
            setStickers(stickersDetails)
        }
        return
        // const filteredStickers = stickers.filter(sticker => sticker !== stickers[index])
        // setStickers(filteredStickers)
    }

    

    const renderStickerDetails = (singleSticker, index) => {
        return (
            <React.Fragment key={index}>
                <tr>
                    <td style={{verticalAlign:"middle", paddingLeft:"1vh", paddingRight:"1vh"}}>{index + 1 > 9 ? index + 1 : `0${index+1}`}</td>
                    <td style={{paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="referenceNo">
                                    <Form.Control type="text" name="referenceNo" placeholder="Reference No" value={singleSticker.referenceNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="grossWeight">
                                    <Form.Control type="text" name="grossWeight" placeholder="Gross Weight" value={singleSticker.grossWeight} onChange={event => handleInputChange(index, event)} />
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="motorMake" value={singleSticker.motorMake}>
                                    <Form.Select type="text" name="motorMake" aria-label="Motor Make" onChange={event => handleInputChange(index, event)}>
                                        <option>Motor Make</option>
                                        {make.map((motorMake, index) => <option key={index} value={motorMake[0]}>{motorMake[1]}</option>)}
                                    </Form.Select>
                                </Form.Group >
                            </div>
                        </div> 
                    </td>
                    <td style={{paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="plateNo">
                                    <Form.Control type="text" name="plateNo" placeholder="Plate No" value={singleSticker.plateNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="category" > 
                                    <Form.Select type="text" name="category" aria-label="category" value={singleSticker.category} onChange={event => {
                                        handleInputChange(index, event)
                                        
                                        const result = categories.filter(category => category.label === event.target.value)
                                        const [ category ] = result
                                        // eslint-disable-next-line no-lone-blocks
                                        console.log(date)
                                        
                                        if(category?.classes?.length > 0) {
                                            const [ {classes} ] = result
                                            setClasses(classes)
                                        } else {
                                            setClasses([])
                                        }
                                        
                                        if(category?.vehicle_use?.length > 0) {
                                            const [ {vehicle_use} ] = result
                                            setVehicleUses(vehicle_use)
                                        } else { 
                                            setVehicleUses([])
                                        }   
                                        
                                    }}>
                                        <option>-Select Category-</option>
                                        {categories.map((category, index) => <option key={index} value={category["label"]}>{category["label"]}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="vehicleUse">
                                    <Form.Select type="text" name="vehicleUse" aria-label="Vehicle Use" value={singleSticker.vehicleUse} onChange={event => handleInputChange(index, event)}>
                                        <option>Vehicle use</option>
                                        {vehicleUses.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </td>
                    <td style={{paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="seatingCapacity">
                                    <Form.Control type="text" name="seatingCapacity" placeholder="Seating Capacity" value={singleSticker.seatingCapacity} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="motorClass" >
                                    <Form.Select type="text" name="motorClass" aria-label="Motor Class" value={singleSticker.motorClass} onChange={event => handleInputChange(index, event)}>
                                        <option>Class</option>
                                        {classes.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="totalPremium" >
                                    <Form.Control type="text" name="totalPremium" placeholder="Total Premium" value={singleSticker.totalPremium} onChange={event => handleInputChange(index, event)} />
                                </Form.Group>
                            </div>
                        </div>
                    </td>
                    <td style={{verticalAlign:"top", paddingLeft:"1vh", paddingRight:"1vh"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"2vh"}}>
                            <div>
                                <Form.Group controlId="ccPower">
                                    <Form.Control type="text" name="ccPower" placeholder="CC Power" value={singleSticker.ccPower} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group controlId="chasisNo" aria-label="chasisNo">
                                    <Form.Control type="text" name="chasisNo" placeholder="Chasis No" value={singleSticker.chasisNo} onChange={event => handleInputChange(index, event)}/>
                                </Form.Group>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </td>
                    <td style={{paddingLeft:"1vh", paddingRight:"1vh", verticalAlign:"middle"}}>
                        <div style={{display:"flex", flexDirection:"column", gap:"5px", justifyContent:"flex-end"}}>
                            <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#CF144C", border:"none", color:"white"}}
                                onClick={() => removeStickerMotorDetails(index)}
                                type="button"
                            >-</button>
                            <button style={{height:"30px", width:"30px", borderRadius:"50%", backgroundColor:"#1475CF", border:"none", color:"white"}} 
                                onClick={() => addStickerMotorDetails()}
                                type="button"
                            >+</button>
                        </div>
                    </td>
                </tr>
            </React.Fragment>      
        )
    }

    const getExistingClient = ( name ) => { 

        // Dummy existing user data.
        // Implementation to be done based on the accessibility of the source of data and data structure implemementing the data bank.
        if(name) return (
            {
                name: 'david',
                email: 'davidderrickanyuru@gmail.com',
                nin:'CM97005509WTVG'
            }
        )
    }
    // const handleSubmit = () => {

    // }

    

    return (
        <div className='components'> 
            <div className='heading'>
                <h1 className='title'>Policies</h1>
                <p>MANAGING POLICIES</p>
            </div>
            <div className="table-card componentsData" style={{paddingBottom:"10vh"}}>
                <Form>
                    <div style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                        <Row style={{paddingTop:"2vh"}}>
                            <h1>
                                Client
                            </h1>    
                        </Row>
                        <Row style={{paddingBottom:"4vh"}}>
                            <Col xs="2">
                                <Form.Group className="mb-3" controlId="clientDetails">
                                    <Form.Control type="text" placeholder="Existing" onChange={event => {
                                        const existingClientDetails = getExistingClient(event.target.value)
                                        // console.log(existingClientDetails)
                                        setClientDetails(existingClientDetails)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col xs="3">
                                <button className="btn btn-primary" variant="primary" type="button" onClick={handleShow}> Add New Client </button> 
                            </Col>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Add New Client</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control placeholder="Enter name" />
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Date of birth</Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Gender</Form.Label>
                                                <div style={{"display": "flex", "gap": "10px"}}>
                                                    <div>
                                                        <input type="radio" name="gender" id="" style={{"margin-right": "5px"}}/>
                                                        <label htmlFor="gender">Male</label>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="gender" id="" style={{"margin-right": "5px"}}/>
                                                        <label htmlFor="gender">Female</label>
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Row>
                                        
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridEmail" style={{"display": "flex", "flex-direction": "column", "align-items": "start"}}>
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="tel" placeholder="Enter phone number" />
                                            </Form.Group>
                                        </Row>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control placeholder="Enter your address" />
                                        </Form.Group>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>upload profile image</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose} id="submit">
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Row>
                    </div>
                    <Row style={{paddingBottom:"6vh"}}>
                        <Col xs="3">
                            <Form.Group classname="mb-3" controlId="currency">
                                <Form.Select type="text" name="currency" aria-label="currency" id="currency" onChange={handleFieldChange}>
                                    <option>Currency</option>
                                    {currencies.map((currency, index) => <option value={currencies[index]}>{currency["code"]}</option>)}  
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    {}
                    
                    <Table striped bordered>
                        <tbody>
                            {stickers.map(renderStickerDetails)}
                        </tbody>
                    </Table>
                    {/*Sticker form details container.*/}
                    
                    
                    <div>
                        {
                            moment(policyEndDate).isValid() === true ? 
                                <>
                                    <Row style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                                        <Col xs="3">
                                            <Form.Group controlId="policyStartDate" >
                                                <Form.Label><h5>Policy Start Date</h5></Form.Label>
                                                <Form.Control type="date" name="policy_start_date" value={policyStartDate} defaultValue={date} onChange={event=> {
                                                    setPolicyStartDate(event.target.value)
                                                    setPolicyEndDate(moment(event.target.value).add(1, 'years').calendar())
                                                    console.log(`end ${policyEndDate}`)
                                                    // console.log(policyStartDate)
                                                }}/>   
                                            </Form.Group>
                                        </Col>
                                    </Row> 
                                    <Row>
                                        <Col xs="3">
                                            <Form.Group controlId="policyEndDate" >
                                                <Form.Label><h5>Policy End Date</h5></Form.Label>
                                                <Form.Control type="text" name="policy_start_date" value={policyEndDate} readOnly/>   
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>    
                                : 
                                <Row style={{paddingTop:"4vh", paddingBottom:"4vh"}}>
                                    <Col xs="3">
                                        <Form.Group controlId="policyStartDate" >
                                            <Form.Label><h5>Policy Start Date</h5></Form.Label>
                                            <Form.Control type="date" name="policy_start_date" value={policyStartDate} defaultValue={date} onChange={event=> {
                                                setPolicyStartDate(event.target.value)
                                                setPolicyEndDate(moment(event.target.value).add(1, 'years').calendar())
                                                console.log(`end ${policyEndDate}`)
                                                // console.log(policyStartDate)
                                            }}/>   
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                        }

                        

                        <div style={{display:"flex", justifyContent:"flex-end"}}>
                            <div>
                                <Button variant="primary" type="submit">
                                    Process 3rd Party
                                </Button>
                            </div>
                        </div>
                        {console.log(field)}  
                    </div> 
                </Form>
            </div>
        </div>
    )
}

export default Policies