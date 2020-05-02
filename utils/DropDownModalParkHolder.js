export default class DropDownModalParkHolder {
    static dropDown;
    static setDropDown(dropDown) {
        this.dropDown = dropDown;
    }
    static getDropDown() {
        return this.dropDown;
    }
    static alert(type, title, message) {
        return this.dropDown.alertWithType(type, title, message);
    }
}