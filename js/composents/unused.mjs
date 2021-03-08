export let  hideTable = () => {
    while (document.getElementsByTagName("table")[1].firstChild){
        document.getElementsByTagName("table")[1].removeChild(document.getElementsByTagName("table")[1].firstChild);
    }
}