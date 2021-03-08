
export let noDropCursor = () => {

    let btnEdit = document.getElementsByClassName("edit");
    let btnEditArr = Array.prototype.slice.call(btnEdit);
    let btnDelete = document.getElementsByClassName("delete");
    let btnDeleteArr = Array.prototype.slice.call(btnDelete);

    btnEditArr.forEach(btn => {
        btn.style.pointerEvents = "none";
    });

    btnDeleteArr.forEach(btn => {
        btn.style.pointerEvents = "none"
    });

}