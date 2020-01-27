let express = require('express')
let router = express.Router()
let Intervention = require('../models/intervention')




// Get all interventions
router.get('/', async(req, res) => {
    try {
        let interventions = await Intervention.find()
        res.json(interventions)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one intervention
router.get('/:id',getIntervention, (req, res) => {
   
    
    res.json(res.intervention)
})

// Create one intervention
router.post('/', async(req, res) => {
    let intervention = new Intervention({
        
        createdOn:req.body.createdOn,
        createdBy: req.body.createdBy,
        tittle:req.body.tittle,
        type:req.body.type,
        location:req.body.location,
        status:req.body.status,
        comment:req.body.comment
      })
    
      try {
        const newIntervention = await intervention.save()
        res.status(201).json(newIntervention)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    });


// Update one intervention
router.patch('/:id', (req, res) => {
})

// Delete one intervention
router.delete('/:id', (req, res) => {
})

async function getIntervention(req, res, next) {
    try {
      intervention = await Intervention.findById(req.params.id)
      if (intervention == null) {
        return res.status(404).json({ message: 'Cant find Intervention'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.intervention = intervention;
    next()
  }





























































module.exports = router

