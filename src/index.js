import './module'
import './scss/index.scss'

console.log('Index is working!')
const xxx = [1,2,3].reduce((summ, e) => {
    summ += e
    return summ
}, 0)

async function f() {
    await Promise.resolve()
}

console.log()
