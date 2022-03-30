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
        refreche()
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
    textarea.setAttribute('class', 'textarea')
    const divdateLabel = document.createElement('div')
    divdateLabel.className = "divLabel"
    const dateLabel = document.createElement('label')
    dateLabel.innerText = "Date"
    divdateLabel.appendChild(dateLabel)
    const inputDate = document.createElement('input'); inputDate.type = 'date'
    inputDate.setAttribute('id', 'inputDate')
    inputDate.setAttribute('class', 'inputDate')
    const divtimeLabel = document.createElement('div')
    divtimeLabel.className = "divLabel"
    const timeLabel = document.createElement('label')
    timeLabel.innerText = "Heure de début"
    divtimeLabel.appendChild(timeLabel)
    const inputTime = document.createElement('input'); inputTime.type = 'time'
    inputTime.setAttribute('id', 'inputTime')
    inputTime.setAttribute('class', 'inputTime')
    const divtimefinLabel = document.createElement('div')
    divtimefinLabel.className = "divLabel"
    const timefinLabel = document.createElement('label')
    timefinLabel.innerText = "Heure de Fin"
    divtimefinLabel.appendChild(timefinLabel)
    const inputTimefin = document.createElement('input'); inputTimefin.type = 'time'
    inputTimefin.setAttribute('id', 'inputTimefin')
    inputTimefin.setAttribute('class', 'inputTimefin')
    const button = document.createElement('button')
    button.className = "ajout"
    button.innerText = "Ajoute"
    button.addEventListener('click', function () {
        const note = document.querySelector('.contentNote');
        const divTache = document.createElement('div');
        divTache.className = "divTache";
        note.appendChild(recupereNote(divTache));
        contentFormulaire.classList.add('animate__animated', 'animate__zoomOutLeft')
    })
    corpFormulair.append(divtacheLabel, textarea, divdateLabel, inputDate, divtimeLabel, inputTime, divtimefinLabel, inputTimefin, button)
    formulaire.append(titreFormulaire, corpFormulair)
    contentFormulaire.appendChild(formulaire)
    return contentFormulaire;
}

let compt = 1;
function creatColonne() {
    const contener = document.querySelector('.contener')
    const collone = document.createElement('div')
    collone.className = "collone"
    collone.id = compt;
    /* console.log(collone.id); */
    compt++;

    const titre = document.createElement('span')
    titre.className = "titre animate__animated animate__zoomIn"
    titre.addEventListener('click', function () {
        titre.contentEditable = true
    })
    const h3 = document.createElement('h3')
    h3.className = 'titre-h3';
    h3.innerText = "Colonne " + i
    if (i > 5) {
        i = 0;
    }
    const croix = document.createElement('i')
    croix.className = "fa-solid fa-delete-left";
    croix.addEventListener('click', function (e) {
        if (e.target.parentElement.parentElement != contener.children[0] || contener.childElementCount == 1) {

            conteneurPrincipal.appendChild(modalSuprimer(e.target.parentElement.parentElement));
            // refreche();

        }
    })

    const contentNote = document.createElement('span');
    contentNote.className = "contentNote animate__animated animate__zoomIn";
    var colors = ["lightyellow", "aliceblue", "powderblue", "darkkhaki", "thistle", "linen"];
    contentNote.style.backgroundColor = colors[i]

    titre.append(h3, croix)
    // refreche()
    collone.append(titre, contentNote);

    return collone
}

function recupereNote(parent) {

    const buttonG = document.createElement('button');
    buttonG.className = "btn";
    buttonG.id = "buttonG";
    buttonG.innerHTML = "&#xab";
    buttonG.addEventListener('click', function (e) {
        collone = e.target.parentElement.parentElement.parentElement;
        const idColloneActuel = +collone.id;
        const collonePrecedent = document.getElementById(idColloneActuel - 1);
        collonePrecedent.lastChild.appendChild(e.target.parentElement)
    })
    const buttonD = document.createElement('button');
    buttonD.className = "btn";
    buttonD.id = "buttonD";
    buttonD.innerHTML = "&#xbb";
    buttonD.addEventListener('click', function (e) {
        collone = e.target.parentElement.parentElement.parentElement;
        const idColloneActuel = +collone.id;
        const colloneSuivant = document.getElementById(idColloneActuel + 1);
        colloneSuivant.lastChild.appendChild(e.target.parentElement)
    })
    const valeurTache = document.createElement('div');
    valeurTache.setAttribute('id', 'valeurTache');

    const contentTexarea = document.createElement('span');
    const textarea = document.querySelectorAll('.textarea');
    for (let i = 0; i < textarea.length; i++) {
        var valTextArea = "";
        valTextArea = textarea[i].value
        contentTexarea.innerText = valTextArea;
    }
    const contentInputDate = document.createElement('span');
    const inputDate = document.querySelectorAll('.inputDate');
    for (let i = 0; i < inputDate.length; i++) {
        var valinputDate = "";
        valinputDate = inputDate[i].value
        contentInputDate.innerText = valinputDate;
    }
    const contentInputTime = document.createElement('span');
    const inputTime = document.querySelectorAll('.inputTime');
    for (let i = 0; i < inputTime.length; i++) {
        var valinputTime = ""
        valinputTime = inputTime[i].value
        contentInputTime.innerText = valinputTime;
    }
    const contentInputTimefin = document.createElement('span');
    const inputTimefin = document.querySelectorAll('.inputTimefin');
    for (let i = 0; i < inputTimefin.length; i++) {
        var valinputTimefin = ""
        valinputTimefin = inputTimefin[i].value
        contentInputTimefin.innerText = valinputTimefin;
    }
    valeurTache.append(contentTexarea, contentInputDate, contentInputTime, contentInputTimefin);
    parent.append(buttonG, valeurTache, buttonD)
    return parent;
}

function modalSuprimer(parent) {

    const collone = document.querySelector('.collone');
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.setAttribute('class', 'modal');

    const modalSpr = document.createElement('div');
    modalSpr.setAttribute('id', 'modalSpr');


    const p = document.createElement('p');
    p.setAttribute('class', 'msgModal');
    p.innerText = 'Etes-vous vraiment sur de vouloir suprimer cette colonne avec toutes ses taches';

    const suprimer = document.createElement('button');
    suprimer.innerText = "Suprimer";
    suprimer.setAttribute('id', 'suprimer');
    suprimer.setAttribute('class', 'btnModal');
    suprimer.addEventListener('click', function () {
        parent.remove()
        modal.classList.add('animate__animated', 'animate__zoomOutLeft')

        refreche();
    })

    const annuler = document.createElement('button');
    annuler.innerHTML = "Annuler";
    annuler.setAttribute('id', 'annuler');
    annuler.setAttribute('class', 'btnModal');
    annuler.addEventListener('click', function () {
        modal.classList.add('animate__animated', 'animate__zoomOutLeft')
        // collone.remove();
    })
    const divbtn = document.createElement('div');
    divbtn.setAttribute('class', 'divbtn');

    divbtn.append(annuler, suprimer)

    modalSpr.append(p, divbtn);

    modal.appendChild(modalSpr)
    return modal;
}

function refreche() {
    const titreH3 = document.querySelectorAll('.titre-h3');
    console.log(titreH3.length)
    titreH3.forEach((element, i) => {
        element.innerText = 'Colonne' + (i + 1);
        element.parentElement.parentElement.id = i + 1;
    })
}







