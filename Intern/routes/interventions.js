let express = require('express')
let router = express.Router()



// Get all interventions
router.get('/', (req, res) => {
    res.send('Hello World')
});

// Get one intervention
router.get('/:id', (req, res) => {
})

// Create one intervention
router.post('/', (req, res) => {
})

// Update one intervention
router.patch('/:id', (req, res) => {
})

// Delete one intervention
router.delete('/:id', (req, res) => {
})


































































module.exports = router