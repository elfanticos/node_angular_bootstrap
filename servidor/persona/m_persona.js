'use strict'
let  db = require('../index');

function getPersonas(id = null) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT *
                 FROM persona
                WHERE id_persona = COALESCE($1, id_persona)
                ORDER BY id_persona desc`;
        sql = db.pgpromise.as.format(sql, [id]);
        db.conection.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            console.log('getPersonas => '+err);
            reject({ msj: 'Hubo un error' });
        });
    });
}

function insertarPersona(data) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT 
                     INTO persona 
                          (nom_persona, ape_paterno, ape_materno, edad, correo)
                  VALUES ($1, $2, $3, $4, $5);`;
        sql = db.pgpromise.as.format(sql, [data.nombre, data.ape_paterno, data.ape_materno, data.edad, data.correo]);
        db.conection.result(sql).then(data => {
            if(data.rowCount == 0) reject({msj : 'Hubo un error'});
            else resolve({ msj: 'Se registro correctamente' });
        }).catch(err => {
            console.log('insertarPersona => ' + err);
            reject({ msj: 'Hubo un error' });
        });
    });
}

function editarPersona(data) {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE persona
                      SET nom_persona = $1, 
                          ape_paterno = $2, 
                          ape_materno = $3, 
                          edad = $4, 
                          correo = $5
                    WHERE id_persona = $6`;
        sql = db.pgpromise.as.format(sql, [data.nombre, data.ape_paterno, data.ape_materno, data.edad, data.correo, data.id_persona]);
        db.conection.result(sql).then(data => {
            if (data.rowCount == 0) reject({ msj: 'Hubo un error' });
            else resolve({ msj: 'Se actualizó correctamente' });
        }).catch(err => {
            console.log('editarPersona => ' + err);
            reject({ msj: 'Hubo un error' });
        });
    });
}

function eliminarPersona(id) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE 
                     FROM persona
                    WHERE id_persona = $1`;
        sql = db.pgpromise.as.format(sql, [id]);
        db.conection.result(sql).then(data => {
            if (data.rowCount == 0) reject({ msj: 'Hubo un error' });
            else resolve({ msj: 'Se elimino correctamente' });
        }).catch(err => {
            console.log('editarPersona => ' + err);
            reject({ msj: 'Hubo un error' });
        });
    });
}

module.exports = {
    getPersonas,
    insertarPersona,
    editarPersona,
    eliminarPersona
}