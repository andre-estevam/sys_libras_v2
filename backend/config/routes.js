const admin = require('./admin')
module.exports = app =>{
//API's Publicas
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/signup', app.api.user.save)


//API's com acesso restrito... Precisa inserir Authorization bearer ao head com o Token

    app.route('/usuario')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))
    
    app.route('/usuario/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .delete(admin(app.api.user.remove))
        .get(admin(app.api.user.getById))
    
    app.route('/regional')
        .all(app.config.passport.authenticate())
        .post(app.api.regional.save)
        .get(app.api.regional.get)

    app.route('/regional/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.regional.save)
        .delete(app.api.regional.remove)
        .get(app.api.regional.getById)

    app.route('/interprete')
        .post(app.api.interprete.save)
        .get(app.api.interprete.get)
        
    app.route('/interpreteComComum')
        .get(app.api.interprete.getInterpretesWhithComum)
     
    app.route('/surdoComcomum')
        .get(app.api.surdo.getSurdosWhithComum)

    app.route('/colaboradorComcomum')
        .get(app.api.colaborador.getColaboradorWhithComum)
        
    app.route('/interprete/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.interprete.save)
        .delete(app.api.interprete.remove)
        .get(app.api.interprete.getById)
    
    app.route('/colaborador')
        .post(app.api.colaborador.save)
        .get(app.api.colaborador.get)

    app.route('/colaborador/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.colaborador.save)
        .delete(app.api.colaborador.remove)
        .get(app.api.colaborador.getById) 

    app.route('/surdo')
        .post(app.api.surdo.save)
        .get(app.api.surdo.get)

    app.route('/surdo/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.surdo.save)
        .delete(app.api.surdo.remove)
        .get(app.api.surdo.getById) 

    app.route('/comum')
        .all(app.config.passport.authenticate())
        .post(app.api.comum.save)
        .get(app.api.comum.get)

    app.route('/comum/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.comum.save)
        .delete(app.api.comum.remove)
        .get(app.api.comum.getById)

    app.route('/administracao')
        .all(app.config.passport.authenticate())
        .post(app.api.administracao.save)
        .get(app.api.administracao.get)

    app.route('/administracao/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.administracao.save)
        .delete(app.api.administracao.remove)
        .get(app.api.administracao.getById)

    }