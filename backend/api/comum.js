
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations

     const save = async (req, res) => {
        const comum = { ...req.body }
        if(req.params.id) comum.id = req.params.id

        try {
            existsOrError(comum.nome, 'Nome da comum não informado')
            existsOrError(comum.idadministracao, 'Administração não informada')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(comum.id) {
            app.db('comuns')
                .update(comum)
                .where({ id: comum.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('comuns')
                .insert(comum)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
     }

     const get = (req, res) => {
        app.db('comuns')
            .select('id', 'nome', 'idadministracao', 'idregional')
            //.whereNull('deletedAt')
            .then(comum => res.json(comum))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('comuns')
            .select('id', 'nome', 'idadministracao', 'idregional')
            .where({ idadministracao: req.params.id })
            //.whereNull('deletedAt')
            .then(comum => res.json(comum))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Comum não informada.')

            const interprete = await app.db('interpretes')
                .where({ idcomum: req.params.id })
            notExistsOrError(interprete, 'Comum possui interpretes cadastrados.')
            const rowsDeleted = await app.db('comuns')
                .where({ id: req.params.id }).del()
            try{
                existsOrError(rowsDeleted, 'Comum não foi encontrada.')
            }catch(msg) {
                return res.status(400).send(msg)  
            }
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

     return {save, get, getById, remove}
}