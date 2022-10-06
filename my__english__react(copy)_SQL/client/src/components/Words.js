import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import WordsList from "./WordsList"
import "../styles/module.css"
import { Form, FormControl } from "react-bootstrap"
import { switching } from "../utils/dopFunction"
import { BsFileArrowUpFill } from 'react-icons/bs'


const Words = () => {
    const [scrollToTopp, setScrollToTopp] = useState(false)
    const [search, setSearch] = useState('')
    

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 1000) {
                setScrollToTopp(true)
            } else {
                setScrollToTopp(false)
            }
        })
    }, [])
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="words-list">
            <div className="d-grid gap-2 mt-2 mb-2 m-7">
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="Search"
                        aria-label="Search"
                        onChange={e => setSearch(e.target.value)}
                    />
                    {/* <Button variant="secondary" className="m-1">Search</Button> */}
                    <div className="switch_block">
                        <div className="switch">
                            Mix
                        </div>
                        <Form.Check
                            onChange={() => switching()}
                            type="switch"
                            defaultChecked={localStorage.getItem('switch') === 'true'}
                            id="disabled-custom-switch"
                        />
                    </div>
                </Form>
            </div >
            <div>
                <WordsList search={search}/>
                {scrollToTopp
                    ?
                    <BsFileArrowUpFill
                        className="ScrollToTopp"
                        onClick={() => scrollUp()}
                    />
                    :
                    null}
            </div>
        </div >
    )
}



export default Words


