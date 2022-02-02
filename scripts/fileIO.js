let data;

fetch("/data/sample.json")
    .then(response => response.json())
    .then(x => { data = x });
data.then(items => console.log(items))


function download() {
    let filename = "MyToDoList.json"
    let text = data;
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}



function onChooseFile(event) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;

    let file = input.files[0];
    let fr = new FileReader();


    fr.onload = function() {
        data = fr.result; //itt még megvan az adat

    };
    console.log(data); //itt már nincs :D
    //fr.readAsText(file);

}