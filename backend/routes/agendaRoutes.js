const express =require('express');
const {agendaCreate, getAllAgendas, getSingleAgenda, agendaUpdate, agendaDelete, getAgendaUserLogin} = require('../controllers/agendaController')
const router = express.Router();

const pases = require('../helpers/verifyToken')

router.post('/newAgenda',pases, agendaCreate)

router.get('/allAgendas',getAllAgendas)

router.get('/agendaByUserLogin',pases, getAgendaUserLogin)

router.get('/singleAgenda/:id',pases, getSingleAgenda)

router.put('/upgradeAgenda/:id',pases, agendaUpdate)
 
router.delete('/deleteAgenda/:id',pases, agendaDelete)


module.exports = router
