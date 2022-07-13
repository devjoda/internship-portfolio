export default class Loader {
    constructor() {
        // contains hashes that should be visible/hidden
        this._loaderHashes;
        this._loaderDomElement;
        this.init();
    }

    // loaderDomElement
    get loaderDomElement() {
        return this._loaderDomElement;
    }
    set loaderDomElement(value) {
        this._loaderDomElement = value;
    }

    // loaderHashes
    get loaderHashes() {
        return this._loaderHashes;
    }
    set loaderHashes(value) {
        this._loaderHashes = value;
    }

    init() {
        this._loaderHashes = [];
        this._loaderDomElement = document.querySelector(".loader");
    }

    /**
     * @description checks current hash to determine if loader should be visible/hidden
     * @author Joachim Danielsen <joachim.danielsen@outlook.com>
     * @return {Boolean} 
     * @memberof Loader
     */
    check() {
        if (this._loaderHashes.length === 0) {
            this._loaderDomElement.classList.add("hide");
            return false;
        } 
        let currentHash = window.location.hash;
        for (const loaderHash of this._loaderHashes) {
            if (currentHash === loaderHash) {
                this._loaderDomElement.classList.remove("hide");
                return false;
            } else {
                this._loaderDomElement.classList.add("hide");
                return true;
            }

        }
    }
}