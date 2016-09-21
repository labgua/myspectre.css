/* author: Sergio Guastaferro */

function rollback(ref, find){
    do{
        if( ref.classList.contains(find) ){
            return ref;
        }
    }while( ref = ref.parentNode );
    return null;
}
function cancel_toast(ref){
    var t, p;
    if( t = rollback(ref, "toast") ){
        p = t.parentNode;
        p.removeChild(t);
    }
}
function open_modal(selector){
    var modals;
    if((modals = document.querySelector("#modals")) == null ) {
        modals = document.createElement("div");
        modals.id = "modals";
        document.body.appendChild(modals);
    }

    modals.classList.add("active");

    var newModal = document.createElement("div");
    newModal.classList.add("modal");
    var m = document.querySelector(selector);
    newModal.appendChild(m);

    modals.insertBefore( newModal, modals.childNodes[0]);
}
function close_modal(ref){
    var mc;
    if( mc = rollback(ref, "modal-container") ){
        var layerModal = mc.parentNode;
        document.body.appendChild(mc);
        var modals = document.querySelector("#modals")
        modals.removeChild(layerModal);
        if( !modals.hasChildNodes() ){
            modals.classList.remove("active");
        }
    }
}

function make_toast(selector, toast_type, message){
    var box = document.querySelector(selector);
    var html = '<div class="toast '+ toast_type +'"><button class="btn btn-clear float-right" onclick="cancel_toast(this);"></button><span class="icon icon-error_outline"></span>'+message+'</div>';
    box.innerHTML = html + box.innerHTML; 
}
function open_menu(ref){
    ref.href = "javascript:void(0)";
    var p = ref.parentNode;
    var menu = p.querySelector(".dropdown-content");
    if( menu.classList.contains("block") ) menu.classList.remove("block");
    else menu.classList.add("block");
}
function toggle_small_tab(ref){
    var tab = ref.parentNode;
    if( tab.classList.contains("active") ) tab.classList.remove("active");
    else tab.classList.add("active");
}
function slide(selector, time){
    var list = new Array();
    var counter = 0;
    var box = document.querySelector(selector);
    var childs = box.children;
    var i;
    for( i = 0; i < childs.length; i++ ){
        if( childs[i].classList.contains("slide") ){
            list.push(childs[i]);
        }
    }

    var slideTask = function(){
        list[counter].classList.add("hide");
        counter = (counter + 1) % list.length;
        list[counter].classList.remove("hide");
    }

    setInterval(slideTask, time);
}

function show_image(ref){
    var src = ref.src;
    //TODO make a box on top to show an img of a gallery
}