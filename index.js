var elements = []

// to keep all tasks even when reloading is done of the page
window.onload = () => {
    if(localStorage.getItem("todo-elements") != null) {
        elements = JSON.parse(localStorage.getItem("todo-elements"))
    }
    display();
}

//we add tasks to elements list by checking they do not contain only spaces or blanks
function addElement() {
    if(document.querySelector(".addTask").value.trim() != "") {
        elements.push(document.querySelector(".addTask").value.trim());
        storeInLocal();
        display();
    }
    // var text = document.querySelector(".addTask").value.trim();
    //     jQuery.post('http://127.0.0.1:5000/api/v2/item', { text: text } , function(data) {
    //         console.log(data);
    //         if (data["error"]) {
    //             $("#msg").html('Error: ' + data["error"]);
    //         }
    //         if (data["ok"]) {
    //             $("#msg").html('Item ' + data["text"] + ' added');
    //         }
    //         storeInLocal
    //         display();

    //     });
    //    return false;
}
// to store elements list in local Storage this is helper function
function storeInLocal() {
    localStorage.setItem("todo-elements", JSON.stringify(elements));
}
// to display all elements each time we call it
function display() {
    document.querySelector(".taskList").innerHTML = "";
    for(var i = 0; i < elements.length; i++ ) {
        document.querySelector(".taskList").innerHTML += "<center><div class='element'>"+elements[i]+"<img class='edit' src='https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png' alt='editIcon' onclick='edit("+i+")'><img class='tick' src='https://mpng.subpng.com/20190418/qgh/kisspng-check-mark-clip-art-scalable-vector-graphics-compu-filecheck-mark-9x9-svg-wikimedia-commons-5cb934f793fb76.4831322815556415916061.jpg' onclick='strike("+i+")'><img class='bin' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfMjlNMV03CeD1yzvPB0El5VAvudP39bklg&usqp=CAU' onclick='del("+i+")'></div></center>";
    }
}
//to edit given element from elements list
function edit(index) {
    var newText = prompt('Enter new Task');
    if(newText != null) {
        elements[index] = newText;
    }
    display();
}
// using splice method we remove the element with given index
function del(index) {
    elements.splice(index, 1);
    storeInLocal();
    display();
}

//<strike> is HTML element to add strike through over text
function strike(index) {
    if(elements[index].includes("<strike>")) {
        elements[index] = elements[index].replace("<strike>", "");
        elements[index] = elements[index].replace("</strike>", "");
    } else {
        elements[index] = "<strike>" + elements[index] + "</strike>";
    }
    storeInLocal();
    display();
}