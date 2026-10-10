import express from "express";
import bcrypt from "bcryptjs";
import { Persona, Libro, Venta } from "../models/index.js"

const inicio = async (req, res) => {
    const persona = await Persona.findAll({
        order: [['id', 'DESC']],
        include: [{ model: Venta, as: 'venta' }]
    });
    res.render("./personas/index.ejs", { persona, action: '/personas', method: 'POST' })
};
const verCrear = async (req, res) => {
    const persona = await Persona.findAll({
        order: [['id', 'DESC']],
        include: [{ model: Venta, as: 'venta' }]
    });
    res.render("./personas/formulario.ejs", { persona, action: 'personas/registrar', method: 'POST' })
};
// Guardar persona
const registro = async (req, res) => {
    try {
        const { nombre, apellido, email, edad } = req.body;
        await Persona.create({ nombre, apellido, email, edad });
        const persona = await Persona.findAll({
            order: [['id', 'DESC']],
            include: [{ model: Venta, as: 'venta' }]
        });
        res.redirect("/personas", { persona, mensaje: null, erro: null })
    } catch (err) {
        const persona = await Persona.findAll({
            order: [['id', 'DESC']],
            include: [{ model: Venta, as: 'venta' }]
        });
        res.render('./personas/index.ejs', {
            persona,
            action: '/personas/registrar',
            method: 'POST',
            mensaje: null,
            error: err.message
        });
    }
};
// FORMULARIO EDITAR
const editar = async (req, res) => {
    const persona = await Persona.findByPk(req.params.id);
    if (!persona) return res.redirect("/personas", { persona, mensaje: null, erro: null })
    res.render('personas/formulario', {
        persona,
        action: `/personas/${persona.id}?_method=PUT`,
        method: 'POST',
    });

};
// ACTUALIZAR
const actualizar = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (!persona) return res.redirect('/personas');
        await persona.update(req.body);
        res.redirect('/personas');
    } catch (error) {
        res.render('persona/formmulario', {
            persona: { ...req.body, id: req.params.id },
            action: `/personas/${req.params.id}?_method=PUT`,
            method: 'PUT',
            error: error.message,
        });
    }
};
// ELIMINAR
const eliminar = async (req, res) => {
    await Persona.destroy({ where: { id: req.params.id } });
    res.redirect('/personas');
};
export { inicio, verCrear, registro, editar, actualizar, eliminar };