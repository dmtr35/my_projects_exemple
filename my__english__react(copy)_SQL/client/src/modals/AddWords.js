import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../index"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { observer } from 'mobx-react-lite'
import { Form, Row, Col } from 'react-bootstrap'
import { addWords, addWordsFromFile } from '../http/collectionApi'
import Image from 'react-bootstrap/Image'
import info from '../assets/info.png'


const AddWords = observer(({ idColl, show, onHide }) => {
    const { fullCollections } = useContext(Context)
    const [arrWord, setArrWord] = useState([])
    const [file, setFile] = useState(null)
    console.log(idColl);
    


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

    const addWordsParent = () => {
        const filterArrWord = arrWord.filter((word) => word.eng && word.rus)
        const formData = new FormData()
        formData.append('filterArrWord', JSON.stringify(filterArrWord))
        formData.append('file', file)
        if (!file) {
            addWords(idColl, formData)
                .then(data => setArrWord([]))
                .then(data => fullCollections.setIsLoadColleltions(true))
                .then(data => fullCollections.setMenuColl(''))
        } else {
            addWordsFromFile(idColl, formData)
                .then(data => setFile(null))
                .then(data => setArrWord([]))
                .then(data => fullCollections.setIsLoadColleltions(true))
                .then(data => fullCollections.setMenuColl(''))
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
                    Добавить слова
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <div className='div_file'>
                        <Form.Control
                            className='upload_file'
                            type="file"
                            onChange={selectFile}
                        />
                        <div className='Instructions'>Инструкции</div>
                        <Image className='image_info' src={info} />
                    </div>
                    <p className='text_or'>И / Или</p>

                    <Button
                        variant={"outline-dark"}
                        onClick={addWord}
                    >
                        Добавить слово
                    </Button>
                    {arrWord.map(i =>
                        <Row className='mt-2' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.eng}
                                    onChange={(e) => changeWord('eng', e.target.value, i.number)}
                                    placeholder={'Введите слово'}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.rus}
                                    onChange={(e) => changeWord('rus', e.target.value, i.number)}
                                    placeholder={'Введите перевод'}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeWord(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addWordsParent}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})


export default AddWords



