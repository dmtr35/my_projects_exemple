import React, { useContext, useEffect, useState } from "react"
import { getCollections, deleteCollection, deleteManyCollection } from "../http/collectionApi"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import '../styles/module.css'
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { handleChange, isCheckTrue } from "../utils/dopFunction"
import CreateCollection from "../modals/CreateCollection"
import EditCollection from "../modals/EditCollection"
import AddWords from "../modals/AddWords"
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';


const Collections = observer(() => {
    const { fullCollections } = useContext(Context)
    const [checked, setChecked] = useState(false);
    const [addCollectionsVisible, setAddCollectionsVisible] = useState(false)
    const [editCollectionsVisible, setEditCollectionsVisible] = useState(false)
    const [addWordsVisible, setAddWordsVisible] = useState(false)
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        getCollections(`${localStorage.getItem('userId')}`)
            .then(data => randomList(data))
            .then(data => fullCollections.setIsLoadColleltions(false))
    }, [checked, fullCollections.isLoadColleltions])

    const randomList = (data) => {
        console.log('data:', data);

        fullCollections.setCollections(data)
        let random = []
        data
            .filter(collection => isCheckTrue(collection.collection_id))
            .map((collection) =>
                collection.words
                    .map((word) =>
                        random
                            .push({ collectionId: collection.collection_id, wordId: word._id, eng: word.eng, rus: word.rus })
                    ))
        if (localStorage.getItem('switch') === 'true') random.sort(() => Math.random() - 0.5)
        fullCollections.setRandomListWods(random)
        console.log('random:', random);
    }

    const deleteColl = (id) => {
        deleteCollection(id)
            .then(data => fullCollections.setIsLoadColleltions(true))
    }
    const deleteManyColl = () => {
        deleteManyCollection(JSON.parse(localStorage.getItem(`arrCheck-${userId}`)))
        fullCollections.setIsLoadColleltions(true)
        localStorage.removeItem(`arrCheck-${userId}`)
    }

    const addMenuColl = (id) => {
        if (fullCollections.menuColl.includes(id)) {
            fullCollections.setMenuColl('')
        } else {
            fullCollections.setMenuWord('')
            fullCollections.setMenuColl([id])
        }
    }

    return (
        <div className="collection-list">
            <div className="d-grid gap-2 mt-2 mb-2 m-3">
                <Button
                    onClick={() => { setAddCollectionsVisible(true) }}
                    variant="primary"
                    size="lg"
                    className='button_add_collection'
                >Добавить колекцию</Button>
                <CreateCollection show={addCollectionsVisible} onHide={() => setAddCollectionsVisible(false)} />
            </div>
            {fullCollections.collections.map(collection =>
                <div
                    key={collection.collection_id}
                    className="m-1 collection_block">
                    <Card className="cardCollBasic_block">
                        <div className="cardCollBasic">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    style={{ cursor: 'pointer' }}
                                    type="checkbox"
                                    value="checked"
                                    onClick={() => setChecked(!checked)}
                                    defaultChecked={isCheckTrue(collection.collection_id)}
                                    onChange={() => handleChange(collection.collection_id)}
                                />
                            </div>
                            <div className="textFormColl">
                                {collection.name}
                            </div>
                            {!fullCollections.menuColl.includes(collection.collection_id) ?
                                <div className="parentMenu">
                                    <div
                                        className="menu"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <AiOutlineMenu
                                            className="iconMenuColl"
                                            onClick={() => addMenuColl(collection.collection_id)}
                                        />
                                    </div>
                                </div>
                                :
                                <div className="parentMenu" >
                                    <div
                                        className="menu4IconCollParent"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <AiOutlinePlusSquare
                                            className="iconMenuColl"
                                            onClick={() => setAddWordsVisible(true)}
                                        />
                                        <AiOutlineEdit
                                            className="iconMenuColl"
                                            onClick={() => setEditCollectionsVisible(true)}
                                        />
                                        <AiOutlineDelete
                                            className="iconMenuColl"
                                            onClick={() => deleteColl(collection.collection_id)}
                                        />
                                        <AiOutlineMenu
                                            className="iconMenuColl"
                                            onClick={() => addMenuColl(collection.collection_id)}
                                        />
                                        <EditCollection
                                            idColl={collection.collection_id}
                                            show={editCollectionsVisible}
                                            onHide={() => setEditCollectionsVisible(false)}
                                            collName={collection.name}
                                        />
                                        <AddWords
                                            idColl={collection.collection_id}
                                            show={addWordsVisible}
                                            onHide={() => setAddWordsVisible(false)}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </Card>
                </div>
            )
            }
            <div className="d-grid gap-2 mt-2 mb-2 m-3">
                <Button
                    onClick={() => deleteManyColl()}
                    variant="primary"
                    size="lg"
                >
                    Удалить отмеченные
                </Button>
            </div>
        </div >
    )
})




export default Collections