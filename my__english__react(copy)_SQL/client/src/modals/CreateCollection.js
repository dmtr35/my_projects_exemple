import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../index"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { observer } from 'mobx-react-lite'
import { Form, Row, Col } from 'react-bootstrap'
import { createCollection, createFromFile } from '../http/collectionApi'
import Image from 'react-bootstrap/Image'
import info from '../assets/info.png'


const CreateCollection = observer(({ show, onHide }) => {
    const { fullCollections } = useContext(Context)
    const [name, setName] = useState('')
    const [arrWord, setArrWord] = useState([])
    const [file, setFile] = useState(null)
    const userId = localStorage.getItem('userId')


    const addWord = () => {
        setArrWord([...arrWord, { eng: '', rus: '', number: Date.now() }])
    }
    const removeWord = (number) => {
        setArrWord(arrWord.filter(i => i.number !== number))
    }
    const changeWord = (key, value, number) => {
        setArrWord(arrWord.map(i => i.number === number ? { ...i, [key]: value } : i))
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addCollection = () => {
        if (!name) {
            onHide()
            fullCollections.setMenuColl('')
            fullCollections.setMenuWord('')
            setArrWord([])
            return
        }
        const filterArrWord = arrWord.filter((word) => word.eng && word.rus)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('filterArrWord', JSON.stringify(filterArrWord))
        formData.append('file', file)
        if (!file) {
            createCollection(userId, formData)
                .then(data => onHide())
                .then(data => fullCollections.setIsLoadColleltions(true))
                .then(data => setName(''))
                .then(data => setArrWord([]))
                .then(data => fullCollections.setMenuColl(''))
                .then(data => fullCollections.setMenuWord(''))
        } else {
            createFromFile(userId, formData)
                .then(data => onHide())
                .then(data => fullCollections.setIsLoadColleltions(true))
                .then(data => setName(''))
                .then(data => setFile(null))
                .then(data => setArrWord([]))
                .then(data => fullCollections.setMenuColl(''))
                .then(data => fullCollections.setMenuWord(''))
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ???????????????? ?????????? ????????????????
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder="?????????????? ???????????????? ????????????????"
                    />
                    {/* <hr /> */}

                    <div className='div_file'>
                        <Form.Control
                            className='upload_file'
                            type="file"
                            onChange={selectFile}
                        />
                        <div className='Instructions'>????????????????????</div>
                        <Image className='image_info' src={info} />
                    </div>
                    <p className='text_or'>?? / ??????</p>
                    <Button
                        variant={"outline-dark"}
                        onClick={addWord}
                    >
                        ???????????????? ??????????
                    </Button>
                    {arrWord.map(i =>
                        <Row className='mt-2' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.eng}
                                    onChange={(e) => changeWord('eng', e.target.value, i.number)}
                                    placeholder={'?????????????? ??????????'}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.rus}
                                    onChange={(e) => changeWord('rus', e.target.value, i.number)}
                                    placeholder={'?????????????? ??????????????'}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeWord(i.number)}
                                    variant={"outline-danger"}
                                >
                                    ??????????????
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>??????????????</Button>
                <Button variant="outline-success" onClick={addCollection}>????????????????</Button>
            </Modal.Footer>
        </Modal>
    )
})


export default CreateCollection



