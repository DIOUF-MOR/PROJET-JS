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
        notification('Attention le maximum de colonne est atteint', 'info')
        console.log(mbouss(notification('Attention le maximum de colonne est atteint', 'info')));
    }

})
corbeille.addEventListener('click', () => {
    contentCorbeille.classList.toggle('block')
})
addNote.addEventListener('click', function () {
    if (contener.childElementCount != 0) {
        body.appendChild(creatFormulaire())
    } else {

        addNote.style.color = 'red'
        notification('veuillez d abord creer une colonne', 'warcing')
        addNote.style.border = 'red 2px solid'
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
        divTache.className = 'divTache'
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
    contentTexarea.setAttribute('class', 'contentTexarea');
    var valTextArea = "";
    // recup(textarea,valTextArea,contentTexarea);
    for (let i = 0; i < textarea.length; i++) {
        valTextArea = textarea[i].value
        contentTexarea.innerText = valTextArea;
    }
    const inputDate = document.querySelectorAll('.inputDate');
    const contentInputDate = document.createElement('span');
    contentInputDate.setAttribute('id', 'contentInputDate');
    contentInputDate.setAttribute('class', 'contentInputDate');
    var valinputDate = "";
    // recup(inputDate,valinputDate,contentInputDate);
    for (let i = 0; i < inputDate.length; i++) {
        valinputDate = inputDate[i].value
        contentInputDate.innerText = valinputDate;
    }

    const contentInputTime = document.createElement('span');
    const inputTime = document.querySelectorAll('.inputTime');
    contentInputTime.setAttribute('id', 'contentInputTime')
    contentInputTime.setAttribute('class', 'contentInputTime')
    var valinputTime = ""
    // recup(inputTime,valinputTime,contentInputTime);
    for (let i = 0; i < inputTime.length; i++) {
        valinputTime = inputTime[i].value
        contentInputTime.innerText = valinputTime;
    }
    const contentInputTimefin = document.createElement('span');
    const inputTimefin = document.querySelectorAll('.inputTimefin');
    contentInputTimefin.setAttribute('id', 'contentInputTimefin');
    contentInputTimefin.setAttribute('class', 'contentInputTimefin');
    var valinputTimefin = ""
    // recup(inputTimefin,valinputTimefin,contentInputTimefin);
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
                e.target.parentElement.parentElement.parentElement.id = +colone.id
                let ok = colone.lastChild
                e.target.parentElement.parentElement.parentElement.style.backgroundColor = ok.style.backgroundColor
                contentCorbeille.appendChild(parent)
                contentItache.classList.add('viderCache')
                vider.innerHTML = 'vider'
                vider.classList.add('cacher')
            })
            let vider = document.createElement('button')
            vider.className = 'restaurer';
            vider.addEventListener('click', function () {
                parent.remove()
            })
            const restaurer = document.createElement('button');
            restaurer.innerHTML = 'Restaurer';
            restaurer.setAttribute('class', 'restaurer')
            restaurer.addEventListener('click', (e) => {
                let pere = e.target.parentElement.parentElement.parentElement;
                let col2 = document.querySelectorAll('.collone')
                col2.forEach(element => {
                    if (element.id === pere.id) {
                        element.lastChild.appendChild(pere)
                    } else
                        if (element.id === 1) {
                            element.lastChild.appendChild(pere)
                        }
                })
            })

            parent.addEventListener('mouseover', function () {
                valeurTache.classList.add('valeurTacheAffiche')
            })
            parent.addEventListener('mouseout', function () {
                valeurTache.classList.remove('valeurTacheAffiche')
            })
            contentInputDate.className = "contentInputDate"
            contentInputTime.className = "contentInputTime"
            contentInputTimefin.className = "contentInputTimefin"
            contentTexarea.className = "contentTexarea"
            const contentItache = document.createElement('div'); contentItache.className = 'contentItache'
            contentItache.append(itache, restaurer, vider)
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
    modal.appendChild(conteur);
    body.appendChild(modal);

    return body
}

const sms = document.querySelector('h3')
const notifier = document.querySelector('.notifier');
function notification(message, classN) {
    sms.innerText = message;
    notifier.setAttribute('class', 'afficheNotifier')
    notifier.classList.add(classN, 'animate__animated', 'animate__zoomIn')
    setTimeout(() => {
        notifier.setAttribute('class', 'notifier')
    }, 6000)
}

setInterval(() => {
    var divTacheAll = document.querySelectorAll('.divTache');
    // var tabValeurTache = document.querySelectorAll('.valeurTache')
    divTacheAll.forEach(element => {
        var dateTache = element.querySelector('#contentInputDate');
        var heureDebutTache = element.querySelector('#contentInputTime');
        var heureFinTache = element.querySelector('#contentInputTimefin');
        var buttonG = element.querySelector('#buttonG')
        var buttonD = element.querySelector('#buttonD')

        var monDateDebutTache = Date.parse(dateTache.innerText + " " + heureDebutTache.innerText);
        var monDateFinTache = Date.parse(dateTache.innerText + " " + heureFinTache.innerText);
        var monNewDate = new Date().getTime();
        // var firstInterval = monDateDebutTache - monNewDate;
        // var lastInterval = monDateFinTache - monNewDate;
        // firstInterval -= 1000;
        // lastInterval -= 1000;
        if (monNewDate >= monDateDebutTache && monNewDate < monDateFinTache) {
            element.children[1].classList.toggle('jotna')
            element.children[1].classList.add('valeurTacheAffiche');
        } else
            if (monNewDate >= monDateFinTache) {
                element.children[1].classList.remove('jotna')
                element.style.backgroundColor = "gray"
                element.children[1].classList.remove('valeurTacheAffiche');
                element.style.height = '6vh'
                buttonG.remove()
                buttonD.remove()
            }

    })

}, 1000)

const serigne = "http://localhost:8002/?controller=tache&action=";

const saveEtat = document.getElementById('save');
saveEtat.addEventListener('click', function () {
    var tabColonne = document.querySelectorAll('.collone');
    let tabColine = []
    for (let i = 0; i < tabColonne.length; i++) {
        let h3 = "collone" + i
        let contentNote = tabColonne[i].querySelector(".contentNote")
        let tabTache = contentNote.querySelectorAll('.divTache');
        let tab = []
        for (let j = 0; j < tabTache.length; j++) {
            text = tabTache[j].querySelector('.contentTexarea').innerText;
            date = tabTache[j].querySelector('.contentInputDate').innerText;
            heure_debut = tabTache[j].querySelector('.contentInputTime').innerText;
            heure_fin = tabTache[j].querySelector('.contentInputTimefin').innerText;

            tab.push({ text, date, heure_debut, heure_fin })
        }
        tabColine.push(h3, tab)
    }
    fetch(serigne + 'save_state',
        {
            method: "POST",
            body: JSON.stringify(
                {
                    Etat: tabColine
                }
            )
        })

})







