let express = require('express')
let router = express.Router()
let Intervention = require('../models/intervention')

let multer = require('multer')
let upload = multer({
      dest: 'uploads/'
});


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
router.post('/',upload.single('image'), async(req, res) => {
  console.log(req.file);
    let intervention = new Intervention({
        
        createdOn:req.body.createdOn,
        createdBy: req.body.createdBy,
        tittle:req.body.tittle,
        type:req.body.type,
        location:req.body.location,
        status:req.body.status,
        comment:req.body.comment,

      })
      try {
        let newIntervention = await intervention.save()
        res.status(201).json({message : 'Intervention succesfully created', newIntervention});
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    });
  

// Update one intervention
router.patch('/:id',getIntervention, async(req, res) => {
    if (req.body.createdBy != null) {
        res.intervention.createdBy = req.body.createdBy
      }
    
      if (req.body.tittle != null) {
        res.intervention.tittle = req.body.tittle
      }
      if (req.body.type != null) {
        res.intervention.type = req.body.type
      }
      if (req.body.location != null) {
        res.intervention.location = req.body.location
      }
      if (req.body.status != null) {
        res.intervention.status = req.body.status
      }

      if (req.body.comment != null) {
        res.intervention.comment = req.body.comment
      }
      try{
        let updatedIntervention = await res.intervention.save()
        res.json(updatedIntervention)
      } catch {
        res.status(400).json({ message: err.message })
      }
    
})

// Delete one intervention

router.delete('/:id', getIntervention,async(req, res) => {
    try {
        await res.intervention.remove()
        res.json({ message: 'Deleted This Intervention' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
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

