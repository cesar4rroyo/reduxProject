import axios from "axios";
import { TRAER_POR_USUARIO } from "../types/publicacionesTypes";

export const traerPorUsuario = key => async (dispatch, getState) => {
    const { usuarios } = getState().usuariosReducers;
    const { publicaciones } = getState().publicacionesReducers;
    const usuario_id = usuarios[key].id;
    const respuesta = await axios.get(
        `http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );
    const publicaciones_actualizadas = [...publicaciones, respuesta.data];

    dispatch({
        type: TRAER_POR_USUARIO,
        payload: publicaciones_actualizadas
    });
};
