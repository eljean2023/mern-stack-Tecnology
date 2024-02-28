const Agenda =require('../models/EventAgenda')

// Get Agenda list 

const getAllAgendas = async(req, res) =>{
    const agendas = await Agenda.find()
    return res.json(agendas)
 }

 // Get Agenda from user login 
const getAgendaUserLogin = async(req, res) =>{
    const agendas = await Agenda.find({user: req.user.id}).sort({ date: -1 })
    return res.json(agendas)
 }


//Create new Agenda

const agendaCreate= async(req,res)=>{
    const {name,link, /*hour, date,status,description,country, statex,address, pricex,filename */} = req.body;
    
    if(!name){
       return res.status(404).json({message :'Name is required'})
    }
    if(!link){
        return res.status(404).json({message :'Hour is required'})
     }
    
     /* if(!date){
        return res.status(404).json({message :'Date is required'})
     }

     if(!country){
        return res.status(404).json({message :'Date is country'})
     }
     if(!statex){
        return res.status(404).json({message :'Date is required'})
     }

     if(!address){
        return res.status(404).json({message :'Date is Address'})
     }

     if(!pricex){
        return res.status(404).json({message :'price is required'})
     }
    if(!status){
        return res.status(404).json({message :'Status is required'})
     }
     
    if(!description){
        return res.status(404).json({message :'Description is required'})
     } */
    
   const newAgenda = new Agenda({name,link/*hour,country,hour,date,status,description,pricex, statex, address,filename */})
     //newAgenda.filename =req.body.filename;
     //newAgenda.path = 'uploads/' + req.body.filename; 
     newAgenda.user = req.user
    await newAgenda.save()
    console.log(newAgenda)
    res.json({
        message : newAgenda
    })
    }

// Get a single Agenda(event) 

const getSingleAgenda = async(req, res) =>{
    const agenda = await Agenda.findById(req.params.id)
    return res.json(agenda)
 }
 

// Agenda Update
const agendaUpdate = async(req, res) =>{
    const {name,link/* hour,date,status,description,country, statex, address,pricex,filename */} = req.body;
    const NewAgendaUp =  {name,link/* hour,date,status,description,country, statex, address,pricex,filename */} ;
    await Agenda.findByIdAndUpdate(req.params.id, NewAgendaUp)
    console.log(NewAgendaUp)
    res.json({message: 'Agenda Updated'})
 }

 // Delete Agenda

 const agendaDelete = async(req, res) => {
    await Agenda.findByIdAndRemove(req.params.id);
    res.json({message: 'Agenda Deleted'})
 }
 

module.exports = {
    agendaCreate, getAllAgendas, getSingleAgenda, agendaUpdate, agendaDelete, getAgendaUserLogin
}