let target = 5;
let p1 = 0, p2 = 0;
let str, p, count = 0;
let gameOver = false;
let aName = 'Player A', bName = 'Player B';
let sync = 0;

const body = document.querySelector('body');
const sp1 = document.querySelector('#sp1');
const sp2 = document.querySelector('#sp2');
const bp1 = document.querySelector('#bp1');
const bp2 = document.querySelector('#bp2');
const brs = document.querySelector('#brs');
const recent = document.querySelector('#recent');
const start = document.querySelector('#hist');
//
const winner = document.querySelector('#winner');
const lead = document.querySelector('#lead');
const greet = document.querySelector('#greet');

function updateRecent(a) {
    if (a) {
        str = a == 'a' ? aName : bName;
        p = document.createElement('p');
        p.innerHTML = `${++count}. <span class="${a}Name">${str}</span> got a point`
        hist.insertAdjacentElement('afterbegin', p);
    }
    else {
        const ppss = document.querySelectorAll('#hist>p');
        for (let pp of ppss)
            start.removeChild(pp);
        count = 0;
    }
}

function reset() {
    sp1.innerText = sp2.innerText = '0';
    if (sync == 0)
        sp1.style.color = sp2.style.color = 'black';
    else
        sp1.style.color = sp2.style.color = 'white';
    p1 = p2 = 0;
    updateRecent(0);
    gameOver = false;
}

bp1.addEventListener('click', function () {
    if (!gameOver) {
        updateRecent('a')
        sp1.innerText = `${++p1}`;
        if (p1 == target) {
            gameOver = true;
            winner.innerText = `${aName}`;
            lead.innerText = `${p1 - p2}`
            sp1.style.color = 'green';
            sp2.style.color = 'red';
            greet.style.display = 'block';
        }
    }
})

bp2.addEventListener('click', function () {
    if (!gameOver) {
        updateRecent('b')
        sp2.innerText = `${++p2}`;
        if (p2 == target) {
            gameOver = true;
            winner.innerText = `${bName}`;
            lead.innerText = `${p2 - p1}`
            sp2.style.color = 'green';
            sp1.style.color = 'red';
            greet.style.display = 'block';
        }
    }
})

brs.onclick = () => { reset(); greet.style.display = 'none'; };


const names = document.querySelector('#names');
const A = document.querySelector('#a');
const B = document.querySelector('#b');
const invalid1 = document.querySelector('#invalid1');
const invalid2 = document.querySelector('#invalid2');

document.querySelector('#target').addEventListener('change',
    function () {
        target = parseInt(this.value);
        reset();
    }
)

document.querySelector('#edit').addEventListener('click',
    function () {
        names.style.display = 'block';
    }
)

document.querySelector('#nameHide').addEventListener('click',
    function () {
        names.style.display = 'none';
    }
)
document.querySelector('#nameSave').addEventListener('click',
    function () {
        let i = A.value.trim(), j = B.value.trim();
        let l = Math.max(i.length, j.length);
        if (l > 15) {
            invalid1.style.display = 'block'
            return;
        }
        if (i && j) {
            invalid1.style.display = 'none'
            invalid2.style.display = 'none'
            aName = i;
            bName = j;
            const aas = document.querySelectorAll('.aName');
            const bbs = document.querySelectorAll('.bName');
            for (let aa of aas)
                aa.innerText = aName;
            for (let bb of bbs)
                bb.innerText = bName;
            A.value = B.value = '';
            A.setAttribute('placeholder', `${aName}`);
            B.setAttribute('placeholder', `${bName}`);
            names.style.display = 'none';
            return;
        }
        else {
            invalid2.style.display = 'block'
            return;
        }
    }
)


const br = document.querySelector('#br');
const bcl = document.querySelector('#bcl');

br.onclick = () => { reset(); greet.style.display = 'none'; };

bcl.addEventListener('click', function () {
    greet.style.display = 'none';
})


//Dark Theme
const switchh = document.querySelector('.switch');
const divs = document.querySelectorAll('body>div');
const darkT = window.matchMedia('(prefers-color-scheme : dark)');
const toggg = document.querySelector('#toggle');

function themes() {
    if (sync == 0) {
        sp1.style.color = sp2.style.color = 'white';
        body.style.backgroundColor = '#212529';
        for (let k = 0; k < 3; k++) {
            divs[k].style.backgroundColor = '#343a40';
            divs[k].style.color = 'white';
            divs[k].style.border = '1px solid rgb(255, 255, 255, 0.3)'
        }
        sync = 1;
    } else {
        sp1.style.color = sp2.style.color = 'black';
        body.style.backgroundColor = 'white';
        for (let k = 0; k < 3; k++) {
            divs[k].style.backgroundColor = 'white';
            divs[k].style.color = 'black';
            divs[k].style.border = '1px solid rgb(210, 210, 210)'
        }
        sync = 0;
    }
}

switchh.addEventListener('click', themes)

if (darkT.matches) {
    toggg.checked = true;
    sync = 0; themes();
}
else {
    sync = 1; themes();
}
