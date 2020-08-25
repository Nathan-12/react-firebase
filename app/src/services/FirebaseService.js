export default class FirebaseService {

    static list = (firestore, callback) => {

        let ref = firestore.collection('estudantes')
        ref.onSnapshot(
            (query) => {
                let estudantes = []
                query.forEach(
                    (doc) => {
                        const { nome, curso, IRA } = doc.data()
                        estudantes.push(
                            {
                                _id: doc.id,
                                nome,
                                curso,
                                IRA
                            }
                        )//push de estudantes
                    }//doc
                )//for Each
                
                //callback
                callback(estudantes)

            }//Query

        )//onSnapshot
    }

    static delete = (firestore, callback, id) => {
        
        firestore.collection('estudantes').doc(id).delete()
            .then(()=> callback('Ok'))
            .catch(error=>callback('Não ok'))
    }

    static create = () => {

    }

    static retrieve = () => {

    }

    static edit = () => {

    }


}