import React, { useContext, useState } from "react"
import Card from "react-bootstrap/Card"
import "../styles/module.css"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { deleteWord } from '../http/collectionApi';
import EditWord from '../modals/EditWord';

const WordsList = observer(({ search }) => {
    const { fullCollections } = useContext(Context)
    const [active, setActive] = useState([])
    const [editWordVisible, setEditWordVisible] = useState(false)
    console.log(search);



    const turnWord = (id) => {
        if (active.includes(id)) {
            fullCollections.setMenuWord('')
            fullCollections.setMenuColl('')
            setActive(active.filter(i => i !== id))
        } else {
            fullCollections.setMenuWord('')
            fullCollections.setMenuColl('')
            setActive([...active, id])
        }
    }
    const turnMenu = (id) => {
        if (fullCollections.menuWord.includes(id)) {
            fullCollections.setMenuWord('')
        } else {
            fullCollections.setMenuColl('')
            fullCollections.setMenuWord([id])
        }
    }
    const delWord = (collId, wordId) => {
        deleteWord(collId, wordId)
            .then(data => fullCollections.setIsLoadColleltions(true))
            .then(data => fullCollections.setIsLoadColleltions(true))
    }


    return (
        <>
            {fullCollections.randomListWods
                .filter(word => word.eng.includes(search) || word.rus.includes(search))
                .map((word) =>
                    <div
                        key={word.wordId}
                        className=" m-2" >
                        <Card className=" wordblock"
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="d-flex"
                            >
                                {!active.includes(word.wordId)
                                    ?
                                    <>
                                        <div
                                            className={'wordEng w-100'}
                                            onClick={() => turnWord(word.wordId)}
                                        >
                                            {word.eng}
                                        </div>
                                        {!fullCollections.menuWord.includes(word.wordId)
                                            ?
                                            <div className="menu1IconParent">
                                                <div
                                                    className="menu1Icon"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <AiOutlineMenu
                                                        className="imageMemu"
                                                        onClick={() => { turnMenu(word.wordId) }}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div className="menu3IconParent d-flex">
                                                <div
                                                    className="menu3Icon d-flex"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <AiOutlineEdit
                                                        className="imageMemu"
                                                        onClick={() => setEditWordVisible(true)}
                                                    />
                                                    <EditWord currentCollId={word.collectionId} wordId={word.wordId} show={editWordVisible} onHide={() => setEditWordVisible(false)} engW={word.eng} rusW={word.rus} />
                                                    <AiOutlineDelete
                                                        className="imageMemu"
                                                        onClick={() => delWord(word.collectionId, word.wordId)}
                                                    />
                                                    <AiOutlineMenu
                                                        className="imageMemu"
                                                        onClick={() => { turnMenu(word.wordId) }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </>
                                    :
                                    <>
                                        <div
                                            style={{ background: "#0D6EFD", color: '#fff' }}
                                            className={'wordEng w-100'}
                                            onClick={() => turnWord(word.wordId)}
                                        >
                                            {word.rus}
                                        </div>
                                        {!fullCollections.menuWord.includes(word.wordId)
                                            ?
                                            <div className="menu1IconParent">
                                                <div
                                                    className="menu1Icon"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <AiOutlineMenu
                                                        className="imageMemuColor"
                                                        onClick={() => { turnMenu(word.wordId) }}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div className="menu3IconParent">
                                                <div
                                                    className="menu3Icon d-flex"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <AiOutlineEdit
                                                        className="imageMemuColor"
                                                        onClick={() => setEditWordVisible(true)}
                                                    />
                                                    <EditWord currentCollId={word.collectionId} wordId={word.wordId} show={editWordVisible} onHide={() => setEditWordVisible(false)} engW={word.eng} rusW={word.rus} />
                                                    <AiOutlineDelete
                                                        className="imageMemuColor"
                                                        onClick={() => delWord(word.collectionId, word.wordId)}
                                                    />
                                                    <AiOutlineMenu
                                                        className="imageMemuColor"
                                                        onClick={() => { turnMenu(word.wordId) }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </Card>
                    </div>
                )
            }
        </>
    )
})



export default WordsList
