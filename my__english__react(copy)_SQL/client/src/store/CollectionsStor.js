import { makeAutoObservable } from "mobx"


export default class CollectionStore {
    constructor() {
        this._collections = []
        this._randomListWods = []
        this._isActive = false
        this._isLoadColleltions = false
        this._menuColl = []
        this._menuWord = []
        this._switching = true

        makeAutoObservable(this)
    }

    setCollections(collections) {
        this._collections = collections
    }
    setRandomListWods(randomListWods) {
        this._randomListWods = randomListWods
    }
    setIsActive(isActive) {
        this._isActive = isActive
    }
    setIsLoadColleltions(isLoadColleltions) {
        this._isLoadColleltions = isLoadColleltions
    }
    setMenuColl(menuColl) {
        this._menuColl = menuColl
    }
    setMenuWord(menuWord) {
        this._menuWord = menuWord
    }
    setSwitching(switching) {
        this._switching = switching
    }





    get collections() {
        return this._collections
    }
    get randomListWods() {
        return this._randomListWods
    }
    get isActive() {
        return this._isActive
    }
    get isLoadColleltions() {
        return this._isLoadColleltions
    }
    get menuColl() {
        return this._menuColl
    }
    get menuWord() {
        return this._menuWord
    }
    get switching() {
        return this._switching
    }



}