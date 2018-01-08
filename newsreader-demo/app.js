/**
 * News reader app
 */

// newsapi.org API key: 8bab48fdf08948f1a01ef18bf3a8e211

const apiKey = '8bab48fdf08948f1a01ef18bf3a8e211'
const main = document.querySelector('main')
const sourceSelector = document.querySelector('#sourceSelector')
const defaultSource = 'the-washington-post'

// Entry point
window.addEventListener('load', async e => {
    updateNews()
    await updateSources()
    sourceSelector.value = defaultSource

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value)
    })

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js')
            console.log('SW registered')
        } catch (error) {
            console.log('SW Failed')
        }
    }
})

async function updateSources(){
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
    const json = await res.json()

    sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n')
}

async function updateNews(source = defaultSource) {

    var url = 'https://newsapi.org/v2/everything?' +
        // 'q=Apple&' +
        // 'from=2018-01-08&' +
        // 'sortBy=popularity&' +
        `sources=${source}&` +
        `apiKey=${apiKey}`;

    const res = await fetch(url)
    const json = await res.json()

    main.innerHTML = json.articles.map(createArticle).join('\n')
}

function createArticle(article) {
    return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="">
            <p>${article.description}</p>
        </a>
    </div>
    `
}