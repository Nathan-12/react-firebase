import React, { Component } from 'react'

import TableRow from './TableRow'

import FirebaseContext from '../utils/FirebaseContext'

const ListPage = () => (
    <FirebaseContext.Consumer>
        { contexto => <List firebase={contexto}/>}
    </FirebaseContext.Consumer>
)

class List extends Component {

    constructor(props){
        super(props)
        this.state = {estudantes:[]}
    }

    componentDidMount(){
        this.ref = this.props.firebase.getFirestore().collection('estudantes')
        this.ref.onSnapshot(this.popularEstudantes.bind(this))
    }

    popularEstudantes(query){
        let estudantes = []
        query.forEach(
            (doc) => {
                const {nome, curso, IRA} = doc.data()
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
        this.setState({estudantes:estudantes})
    }

    montarTabela(){
        if(!this.state.estudantes) return
        return this.state.estudantes.map(
            (est,i)=>{
                return <TableRow estudante={est} 
                                 key={i} 
                                 firebase={this.props.firebase}/>
            }
        )
    }


    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Listar Estudantes</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>IRA</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.montarTabela()}
                    </tbody>

                </table>


            </div>
        )
    }
}

export default ListPage