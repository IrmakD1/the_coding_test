const { Router } = require('express')

module.exports = () => {
    const router = Router()

    router.use('/', (req, res) => {
        res.send('Hello World')
    })

    return router
}