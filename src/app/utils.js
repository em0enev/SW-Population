/**
 * Here you can define helper functions to use across your app.
 */
function delay(seconds) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, seconds * 1000)
    })
}



export default { delay }