import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Comentarios from "./Comentarios";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
    traerPorUsuario: publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
} = publicacionesActions;

class Publicaciones extends Component {
    async componentDidMount() {
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: {
                params: { key }
            }
        } = this.props;
        if (!this.props.usuariosReducers.usuarios.length) {
            await usuariosTraerTodos();
        }
        if (this.props.usuariosReducers.error) {
            return;
        }
        if (
            !("publicaciones_key" in this.props.usuariosReducers.usuarios[key])
        ) {
            publicacionesTraerPorUsuario(key);
        }
    }
    ponerUsuario = () => {
        const {
            usuariosReducers,
            match: {
                params: { key }
            }
        } = this.props;

        if (usuariosReducers.error) {
            return <Fatal mensaje={usuariosReducers.error} />;
        }

        if (!usuariosReducers.usuarios.length || usuariosReducers.cargando) {
            return <Spinner />;
        }
        const nombre = usuariosReducers.usuarios[key].name;
        return <h1>Publicaciones de {nombre}</h1>;
    };
    ponerPublicaciones = () => {
        const {
            usuariosReducers,
            usuariosReducers: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: {
                params: { key }
            }
        } = this.props;
        if (!usuarios.length) {
            return;
        }
        if (usuariosReducers.error) {
            return;
        }
        if (publicacionesReducer.cargando) {
            return <Spinner />;
        }
        if (publicacionesReducer.error) {
            return <Fatal mensaje={publicacionesReducer.error} />;
        }
        if (!publicaciones.length) {
            return;
        }
        if (!("publicaciones_key" in usuarios[key])) {
            return;
        }
        const { publicaciones_key } = usuarios[key];
        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        );
    };

    mostrarInfo = (publicaciones, pub_key) =>
        publicaciones.map((publicacion, com_key) => (
            <div
                className="pub_titulo"
                key={publicacion.id}
                onClick={() =>
                    this.props.this.mostrarComentarios(
                        pub_key,
                        com_key,
                        publicacion.comentarios
                    )
                }
            >
                <h2>{publicacion.title}</h2>
                <h3>{publicacion.body}</h3>
                {publicacion.abierto ? <Comentarios /> : ""}
            </div>
        ));

    mostrarComentarios = (pub_key, com_key, comentarios) => {
        this.props.abrirCerrar(pub_key, com_key);
        if (!comentarios.length) {
            this.props.traerComentarios(pub_key, com_key);
        }
    };

    render() {
        return (
            <div>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </div>
        );
    }
}

const mapStateToProps = ({ usuariosReducers, publicacionesReducer }) => {
    return {
        usuariosReducers,
        publicacionesReducer
    };
};
const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
};
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
