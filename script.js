let initialScroll = true;
const heroParagraph = document.querySelector('.initial-hero p');

heroParagraph.addEventListener('transitioned', ()=> {
    heroParagraph.remove();
});

// Função para detectar se um elemento está visível na tela
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    /*
    console.log(`Element: ${element.tagName}, Content: "${element.innerText}, Window inner height: ${window.innerHeight}, Windows inner width: ${window.innerWidth} Rect: `, rect);
    console.log(`condition result for top:`, (rect.top >= 0));
    console.log(`condition result for left:`, (rect.left >= 0));
    console.log(`condition result for window-fit height:`, rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    console.log(`condition result for window-fit width:`, rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    */
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    //    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isScrolledMoreThan10Percent() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    console.clear();

    console.log(`Valor de scrollTop: `, scrollTop);
    console.log(`Valor de scrollHeight: `, scrollHeight);
    console.log(`valor de clientHeight: `, clientHeight);
    console.log(`Valor de scrolledPercentage: `, scrolledPercentage);
  
    return scrolledPercentage > 10;
    //return scrolledPercentage
  }


// Adiciona as classes para animações quando o elemento entra na tela
function handleScroll() {
    if (initialScroll) {
        // Ignora a execução se for a primeira vez após o carregamento
        initialScroll = false;
        return;
    }

    const titles = document.querySelectorAll('h2');
    const paragraphs = document.querySelectorAll('p:not(header p)');
    const hero = document.querySelector('.initial-hero');
    const herop = document.querySelector('.hero p');
    const indicator = document.querySelector('.scroll-indicator');

    titles.forEach(title => {
        if (isInViewport(title)) {
            title.classList.add('slide-in');
        }
    });

    paragraphs.forEach(paragraph => {
        if (isInViewport(paragraph)) {
            paragraph.classList.add('fade-in');
        }
    });

    if (hero && hero.classList.contains('initial-hero')) {
        hero.classList.remove('initial-hero');
        hero.classList.add('hero');
    }

    if (isScrolledMoreThan10Percent()) {
        herop.classList.add('faded');
        indicator.classList.add('faded-indicator');

    };
}


// Função throttle para limitar a frequência de execução
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this, args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

// Listener para rolagem
window.addEventListener('scroll', handleScroll);

// Mostra o título e o texto inicial imediatamente
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    hero.classList.add('initial-hero');
    hero.style.opacity = '1'; // Faz o conteúdo inicial visível
    hero.style.transition = 'opacity 0.8s ease-in-out'; // Animação suave ao aparecer´

    const headerParagraph = document.querySelector('header p');
    if (headerParagraph) {
        headerParagraph.style.opacity = '1';
        headerParagraph.style.transition = 'opacity 0.8s ease-in-out';
    }
});
