
export let noDropCursor = () => {

    let btnEdit = document.getElementsByClassName("edit");
    let btnEditArr = Array.prototype.slice.call(btnEdit);
    let btnDelete = document.getElementsByClassName("delete");
    let btnDeleteArr = Array.prototype.slice.call(btnDelete);

    btnEditArr.forEach(btn => {
        btn.style.pointerEvents = "none";
        btn.style.backgroundColor = "lightGray";
        btn.style.color = "gray";
        btn.style.border = " solid 1px lightGray";
    });

    btnDeleteArr.forEach(btn => {
        btn.style.pointerEvents = "none";
        btn.style.backgroundColor = "lightGray";
        btn.style.color = "gray";
        btn.style.border = " solid 1px lightGray";
    });

}

export let disableRadio = (input1, input2, input3) => {

    input1.setAttribute("disabled", "true");
    input2.setAttribute("disabled", "true");
    input3.setAttribute("disabled", "true");
    input1.style.pointerEvents = "none";
    input2.style.pointerEvents = "none";
    input3.style.pointerEvents = "none";

}

export let blockContainer = () => {
    document.querySelectorAll(".container")[1].style.pointerEvents = "none";
    document.body.style.overflow = "hidden"
}

export let deblockContainer = () => {
    document.querySelectorAll(".container")[1].style.pointerEvents = "auto";
    document.body.style.overflow = "auto"
}