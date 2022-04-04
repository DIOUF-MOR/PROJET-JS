const body = document.querySelector('body')
const conteneurPrincipal = document.querySelector('.conteneurPrincipal');
const entete = document.querySelector('.entete');
const contentCorbeille = document.querySelector('.contentCorbeille');
const addColom = document.getElementById('addColom');
const addNote = document.getElementById('addNote');
const contener = document.querySelector('.contener');
const ajout = document.querySelector('.ajout')
const corbeille = document.querySelector('.corbeille')

let i = 0
addColom.addEventListener('click', function () {

    if (contener.childElementCount < 5) {
        i++
        contener.appendChild(creatColonne());
        refreche()
    } else {
        conteneurPrincipal.appendChild(mbouss(notification('Attention le maximum de colonne est atteint', 'info')))
        console.log(mbouss(notification('Attention le maximum de colonne est atteint', 'info')));
    }
    addNote.style.backgroundColor = "green"
    addNote.style.color = "white"
    addNote.innerHTML = "+ note";
    // addNote.style.border = ' none'
})
corbeille.addEventListener('click', () => {
    contentCorbeille.classList.toggle('block')
})
addNote.addEventListener('click', function () {
    if (contener.childElementCount != 0) {
        body.appendChild(creatFormulaire())
    } else {
        addColom.style.backgroundColor = "green"
        addColom.style.color = "white"
        addNote.innerHTML = "&#xab colonne";
        addNote.style.color = 'red'
        notification('veuillez d abord creer une colonne', 'warcing')
        // addNote.style.border = 'red 2px solid'
    }
})

function creatFormulaire() {
    const contentFormulaire = document.createElement('div');
    contentFormulaire.className = "contentFormulaire";

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

    const inputDate = document.createElement('input');
    inputDate.type = 'date'
    inputDate.setAttribute('id', 'inputDate')
    inputDate.setAttribute('class', 'inputDate')
    inputDate.setAttribute('value', '')

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
    button.addEventListener('click', function (e) {
        const divTache = document.createElement('div');
        if (recupereNote(divTache) == false) {
            e.preventDefault();
        } else {
            const note = document.querySelector('.contentNote');
            divTache.className = "divTache animate__animated animate__zoomIn";
            note.appendChild(divTache);
            contentFormulaire.classList.add('animate__animated', 'animate__zoomOutLeft')
        }
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
    croix.className = "croix fa-solid fa-delete-left";
    croix.addEventListener('click', function (e) {
        if (e.target.parentElement.parentElement != contener.children[0] || contener.childElementCount == 1) {
            conteneurPrincipal.appendChild(modalSuprimer(e.target.parentElement.parentElement));
        }
    })

    const contentNote = document.createElement('span');
    contentNote.className = "contentNote animate__animated animate__zoomIn";
    var colors = ["lightyellow", "aliceblue", "powderblue", "darkkhaki", "thistle", "linen"];
    contentNote.style.backgroundColor = colors[i]

    titre.append(h3, croix)
    collone.append(titre, contentNote);

    return collone
}

function recupereNote(parent) {

    const buttonG = document.createElement('button');
    buttonG.className = "btn";
    buttonG.innerHTML = "&#xab";
    buttonG.id = "buttonG";
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
    valeurTache.setAttribute('class', 'valeurTache');

    const periodeTache = document.createElement('div');
    periodeTache.setAttribute('id', 'periodeTache');
    periodeTache.setAttribute('class', 'periodeTache');

    const contentTexarea = document.createElement('span');
    const textarea = document.querySelectorAll('.textarea');
    contentTexarea.setAttribute('id', 'contentTexarea');
    var valTextArea = "";
    for (let i = 0; i < textarea.length; i++) {
        valTextArea = textarea[i].value
        contentTexarea.innerText = valTextArea;
    }
    const contentInputDate = document.createElement('span');
    const inputDate = document.querySelectorAll('.inputDate');
    contentInputDate.setAttribute('id', 'contentInputDate');
    var valinputDate = "";
    for (let i = 0; i < inputDate.length; i++) {
        valinputDate = inputDate[i].value
        contentInputDate.innerText = valinputDate;
    }

    const contentInputTime = document.createElement('span');
    const inputTime = document.querySelectorAll('.inputTime');
    contentInputTime.setAttribute('id', 'contentInputTime');
    var valinputTime = ""
    for (let i = 0; i < inputTime.length; i++) {
        valinputTime = inputTime[i].value
        contentInputTime.innerText = valinputTime;
    }
    const contentInputTimefin = document.createElement('span');
    const inputTimefin = document.querySelectorAll('.inputTimefin');
    contentInputTimefin.setAttribute('id', 'contentInputTimefin');
    var valinputTimefin = ""
    for (let i = 0; i < inputTimefin.length; i++) {
        valinputTimefin = inputTimefin[i].value
        contentInputTimefin.innerText = valinputTimefin;
    }
    var mondateDebut = Date.parse(valinputDate + " " + valinputTime);
    var mondateFin = Date.parse(valinputDate + " " + valinputTimefin);
    var monNewDate = new Date().getTime();
    if (valTextArea == "" || valinputDate == "" || valinputTime == "" || valinputTimefin == "") {
        notification('tous les champ sont obligatoir', 'warcing');
        return false
    } else
        if (mondateDebut < monNewDate || mondateDebut > mondateFin) {
            notification('Veuiller saisir une date valide', 'warcing');
            return false

        } else {

            const itache = document.createElement('i')
            itache.className = 'fa fa-close'
            itache.setAttribute('id', 'itache')
            itache.addEventListener('click', (e) => {

                let colone = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
                let ok = colone.lastChild
                e.target.parentElement.parentElement.parentElement.id = colone.id
                e.target.parentElement.parentElement.parentElement.style.backgroundColor = ok.style.backgroundColor
                contentCorbeille.appendChild(parent)
            })

            const restaurer = document.createElement('button'); restaurer.innerHTML = 'Restaurer'; restaurer.setAttribute('class', 'restaurer')
            restaurer.addEventListener('click', (e) => {
                let pere = e.target.parentElement.parentElement.parentElement
                let col2 = document.querySelectorAll('.contentNote')
                col2.forEach(element => {
                    if (element.style.backgroundColor === pere.style.backgroundColor) {
                        element.appendChild(pere)
                    } else {
                        // col2[0].appendChild(pere)
                    }
                })
            })
            if (contener.childElementCount == 0) {
                restaurer.style.visibility = 'hidden'
            }
            parent.addEventListener('mouseover', function () {
                valeurTache.classList.add('valeurTacheAffiche')
            })
            parent.addEventListener('mouseout', function () {
                valeurTache.classList.remove('valeurTacheAffiche')
            })
            const contentItache = document.createElement('div'); contentItache.className = 'contentItache'
            contentItache.append(itache, restaurer)
            periodeTache.append(contentInputDate, contentInputTime, contentInputTimefin)
            valeurTache.append(contentItache, contentTexarea, periodeTache);
            parent.append(buttonG, valeurTache, buttonD)
        }

    return parent;
}

function modalSuprimer(parent) {

    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.setAttribute('class', 'animate__animated animate__zoomIn');

    const modalSpr = document.createElement('div');
    modalSpr.setAttribute('id', 'modalSpr');
    modalSpr.setAttribute('class', 'modalSpr');
    modalSpr.style.backgroundColor = parent.querySelector('.contentNote').style.backgroundColor

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
        notification('colonne suprimer avec succés', 'succes')
    })

    const annuler = document.createElement('button');
    annuler.innerHTML = "Annuler";
    annuler.setAttribute('id', 'annuler');
    annuler.setAttribute('class', 'btnModal');
    annuler.addEventListener('click', function () {
        modal.classList.add('animate__animated', 'animate__zoomOutRight')
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
    titreH3.forEach((element, i) => {
        element.innerText = 'Colonne' + (i + 1);
        element.parentElement.parentElement.id = i + 1;
    })
}
function mbouss(conteur) {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal')

    return modal.appendChild(conteur);
}

const sms = document.querySelector('h3')
const notifier = document.querySelector('.notifier');
function notification(message, classN) {
    sms.innerText = message;
    notifier.setAttribute('class', 'afficheNotifier')
    notifier.classList.add(classN, 'animate__animated', 'animate__fadeInDownBig')
    setTimeout(() => {
        notifier.setAttribute('class', 'notifier')
    }, 5000)
}

setInterval(() => {
    var divTacheAll = document.querySelectorAll('.divTache');
    divTacheAll.forEach(element => {
        var dateTache = element.querySelector('#contentInputDate');
        var heureDebutTache = element.querySelector('#contentInputTime');
        var heureFinTache = element.querySelector('#contentInputTimefin');

        var monDateDebutTache = Date.parse(dateTache.innerText + " " + heureDebutTache.innerText);
        var monDateFinTache = Date.parse(dateTache.innerText + " " + heureFinTache.innerText);
        var monNewDate = new Date().getTime();
        var firstInterval = monDateDebutTache - monNewDate;
        var lastInterval = monDateFinTache - monNewDate;
        firstInterval -= 1000;
        lastInterval -= 1000;
        if (firstInterval <= 1000) {
            let valeurTache=document.getElementById('valeurTache')
            valeurTache.classList.toggle('jotna')
            // alert('la tache a démare')
        }
        if (lastInterval <= 1000) {
            let buttonG = document.querySelector('.btn')
            let buttonD = document.querySelector('.btn')
            buttonG.remove()
            buttonD.remove()
        }
    })

}, 1000)



