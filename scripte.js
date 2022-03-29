const body = document.querySelector('body')
const conteneurPrincipal = document.querySelector('.conteneurPrincipal');
const entete = document.querySelector('.entete');
const addColom = document.getElementById('addColom');
const addNote = document.getElementById('addNote');
const contener = document.querySelector('.contener');
const ajout = document.querySelector('.ajout')
let i = 0
addColom.addEventListener('click', function () {

    if (contener.childElementCount < 5) {
        i++
        contener.appendChild(creatColonne());
    }


})
addNote.addEventListener('click', function () {
    if (contener.childElementCount != 0) {
        body.appendChild(creatFormulaire())
    } else {
        addNote.innerText = "veuillez d'abord creer une collone";
        addNote.style.color = 'red'
        addNote.style.border = 'red 2px solid'
    }
})
function creatFormulaire() {
    const contentFormulaire = document.createElement('div')
    contentFormulaire.className = "contentFormulaire"
    const formulaire = document.createElement('div')
    formulaire.className = "formulaire animate__animated animate__zoomIn"
    const titreFormulaire = document.createElement('div')
    titreFormulaire.className = "titreFormulaire"
    const h3 = document.createElement('h3')
    h3.innerText = "NOUVELLE TACHE"
    const i = document.createElement('i')
    i.className = "fa-solid fa-delete-left"
    i.addEventListener('click', function () {
        contentFormulaire.classList.add('animate__animated', 'animate__zoomOutLeft')
    })
    titreFormulaire.append(h3, i)
    const corpFormulair = document.createElement('div')
    corpFormulair.className = "corpFormulair"
    const divtacheLabel = document.createElement('div')
    divtacheLabel.className = "divLabel"
    const tacheLabel = document.createElement('label')
    tacheLabel.innerText = "TACHE"
    divtacheLabel.appendChild(tacheLabel)
    const textarea = document.createElement('textarea')
    textarea.setAttribute('id', 'textarea')
    const divdateLabel = document.createElement('div')
    divdateLabel.className = "divLabel"
    const dateLabel = document.createElement('label')
    dateLabel.innerText = "Date"
    divdateLabel.appendChild(dateLabel)
    const inputDate = document.createElement('input'); inputDate.type = 'date'
    inputDate.setAttribute('id', 'inputDate')
    const divtimeLabel = document.createElement('div')
    divtimeLabel.className = "divLabel"
    const timeLabel = document.createElement('label')
    timeLabel.innerText = "Heure de début"
    divtimeLabel.appendChild(timeLabel)
    const inputTime = document.createElement('input'); inputTime.type = 'time'
    inputTime.setAttribute('id', 'inputTime')
    const divtimefinLabel = document.createElement('div')
    divtimefinLabel.className = "divLabel"
    const timefinLabel = document.createElement('label')
    timefinLabel.innerText = "Heure de Fin"
    divtimefinLabel.appendChild(timefinLabel)
    const inputTimefin = document.createElement('input'); inputTimefin.type = 'time'
    inputTimefin.setAttribute('id', 'inputTimefin')
    const button = document.createElement('button')
    button.className = "ajout"
    button.innerText = "Ajoute"
    button.addEventListener('click', function () {
        let note = document.querySelector('.contentNote')
        note.appendChild(contentTache())
        contentFormulaire.classList.add('animate__animated', 'animate__zoomOutLeft')
    })
    corpFormulair.append(divtacheLabel, textarea, divdateLabel, inputDate, divtimeLabel, inputTime, divtimefinLabel, inputTimefin, button)
    formulaire.append(titreFormulaire, corpFormulair)
    contentFormulaire.appendChild(formulaire)
    return contentFormulaire;
}
function creatColonne() {

    const collone = document.createElement('div')
    collone.className = "collone"
    collone.setAttribute('id',i)

    const titre = document.createElement('span')
    titre.className = "titre animate__animated animate__zoomIn"
    titre.addEventListener('click', function () {
        titre.contentEditable = true
    })
    const h3 = document.createElement('h3')
    h3.innerHTML = "Colonne " + i

    if (i > 5) {
        i = 0;
    }
    const croix = document.createElement('i')
    croix.className = "fa-solid fa-delete-left"
    croix.addEventListener('click', function () {


        conteneurPrincipal.appendChild(modalSuprimer())



    })

    const contentNote = document.createElement('span');
    contentNote.className = "contentNote animate__animated animate__zoomIn";
    var colors = ["lightyellow", "aliceblue", "powderblue", "darkkhaki", "thistle", "linen"];
    contentNote.style.backgroundColor = colors[i]

    titre.append(h3, croix)
    collone.append(titre, contentNote);

    return collone
}
function contentTache() {
    const divTache = document.createElement('div');
    divTache.className = "divTache";
    const buttonG = document.createElement('button');
    buttonG.className = "btn";
    buttonG.id = "buttonG";
    buttonG.innerHTML = "&#xab";

    const buttonD = document.createElement('button');
    buttonD.className = "btn";
    buttonD.id = "buttonD";
    buttonD.innerHTML = "&#xbb";
    buttonD.addEventListener('click',function(){
        this.parentElement.parentElement.parentElement.parentElement.children[id.target+1].lastElementChild.appendChild(this.parentElement)
    })
    const valeurTache = document.createElement('span')
    valeurTache.setAttribute('id', 'valeurTache')
    recupereNote(valeurTache);
    divTache.append(buttonG, valeurTache, buttonD);
    return divTache
}
function recupereNote(parent) {
    const textarea = document.querySelector('#textarea').value;
    const inputDate = document.querySelector('#inputDate').value;
    const inputTime = document.querySelector('#inputTime').value;
    const inputTimefin = document.querySelector('#inputTimefin').value;

    parent.append(textarea, inputDate, inputTime, inputTimefin);
    return parent;
}
function modalSuprimer() {

    const collone = document.querySelector('.collone');
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.setAttribute('class', 'modal');

    const modalSpr = document.createElement('div');
    modalSpr.setAttribute('id', 'modalSpr');


    const p = document.createElement('p');
    p.setAttribute('class', 'msgModal');
    p.innerText = 'Etees-vous vraiment sur de vouloir suprimer cette colonne avec ses taches';

    const suprimer = document.createElement('button');
    suprimer.innerHTML = "Suprimer";
    suprimer.setAttribute('id', 'suprimer');
    suprimer.setAttribute('class', 'btnModal');
    suprimer.addEventListener('click', function () {
        // this.parentElement.parentElement.remove()
        collone.target.remove()
        modal.classList.add('animate__animated', 'animate__zoomOutLeft')
    })
    const annuler = document.createElement('button');
    annuler.innerHTML = "Annuler";
    annuler.setAttribute('id', 'annuler');
    annuler.setAttribute('class', 'btnModal');
    annuler.addEventListener('click', function () {
        modal.classList.add('animate__animated', 'animate__zoomOutLeft')
        collone.remove();
    })
    const divbtn = document.createElement('div');
    divbtn.setAttribute('class', 'divbtn');

    divbtn.append(annuler, suprimer)

    modalSpr.append(p, divbtn);

    modal.appendChild(modalSpr)

    return modal;
}







