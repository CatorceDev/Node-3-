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
const inicioLibros = async(req, res) => {
    const libros = await Libro.findAll({
        order: [['id', 'DESC']]
    })
    res.render("./libros/index.ejs", {libros, action: '/libros', method: 'POST'})
}

const inicioVentas = async(req, res) => {
    const ventas = await Venta.findAll({
        order: [['id', 'DESC']]
    })
    res.render("./ventas/index.ejs", {ventas, action: '/ventas', method: 'POST'})
}

const verCrear = async (req, res) => {
    const persona = await Persona.findAll({
        order: [['id', 'DESC']],
        include: [{ model: Venta, as: 'venta' }]
    });
    res.render("./personas/formulario.ejs", { persona, action: '/personas/registrar', method: 'POST' })
};

const verCrearLibros = async (req, res) => {
    const libros = await Libro.findAll({
        order: [['id', 'DESC']],
    })
    res.render("./libros/formulario.ejs", {libros: null, action: '/libros/registrar', method: 'POST'})
}

const verCrearVentas = async (req, res) => {
    const ventas = await Venta.findAll({
        order: [['id', 'DESC']],
    })
    res.render("./ventas/formulario.ejs", {ventas: null, action: '/ventas/registrar', method: 'POST'})
}
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
            action: '/registrar',
            method: 'POST',
            mensaje: null,
            error: err.message
        });
    }
};

const registroLibros = async (req, res) => {
    try {
        const { titulo, autor, precio } = req.body;

        await Libro.create({
            titulo,
            autor,
            precio
        });

        return res.redirect("/libros");

    } catch (err) {
        console.error("Error al registrar libro:", err);

        return res.status(500).render("./libros/formulario.ejs", {
            libro: req.body,
            action: "/libros/registrar",
            method: "POST",
            error: err.message
        });
    }
};


const registroVentas = async (req, res) => {
    try {
        const { cantidad, fecha } = req.body;

        await Venta.create({
            cantidad,
            fecha
        });

        return res.redirect("/ventas");

    } catch (err) {
        console.error("Error al registrar venta:", err);

        return res.status(500).render("./ventas/formulario.ejs", {
            ventas: req.body,
            action: "/ventas/registrar",
            method: "POST",
            error: err.message
        });
    }
};

// FORMULARIO EDITAR
const editarPersona = async (req, res) => {
    const persona = await Persona.findByPk(req.params.id);
    if (!persona) return res.redirect("/personas", { persona, mensaje: null, erro: null })
    res.render('personas/formulario', {
        persona,
        action: `/personas/${persona.id}?_method=PUT`,
        method: 'POST',
    });
};

const editarLibro = async (req, res) => {
    const libros = await Libro.findByPk(req.params.id)
    if (!libros) return res.redirect("/libros", {libros, mensaje: null, error: null})
    res.render('libros/formulario', {
        libros,
        action: `/libros/${libros.id}?_method=PUT`,
        method: 'POST',

    })
}

const editarVenta = async (req, res) => {
    const ventas = await Venta.findByPk(req.params.id)
    if (!ventas) return res.redirect("/ventas", {ventas, mensaje: null, error: null})
    res.render('ventas/formulario', {
        ventas,
        action: `/ventas/${ventas.id}?_method=PUT`,
        method: 'POST',

    })
}
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

const actualizarLibro = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) return res.redirect('/libros');
        await libro.update(req.body);
        res.redirect('/libros');
    } catch (error) {
        res.render('libros/formmulario', {
            libro: { ...req.body, id: req.params.id },
            action: `/libros/${req.params.id}?_method=PUT`,
            method: 'PUT',
            error: error.message,
        });
    }
};

const actualizarVenta = async (req, res) => {
    try {
        const ventas = await Venta.findByPk(req.params.id);
        if (!ventas) return res.redirect('/ventas');
        await ventas.update(req.body);
        res.redirect('/ventas');
    } catch (error) {
        res.render('ventas/formmulario', {
            ventas: { ...req.body, id: req.params.id },
            action: `/ventas/${req.params.id}?_method=PUT`,
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

const eliminarLibro = async (req, res) => {
    await Libro.destroy({ where: { id: req.params.id } });
    res.redirect('/libros');
};

const eliminarVenta = async (req, res) => {
    await Venta.destroy({ where: { id: req.params.id } });
    res.redirect('/ventas');
};

export { 
    inicio, 
    inicioLibros, 
    inicioVentas,
    verCrear, 
    verCrearLibros, 
    verCrearVentas,
    registro, 
    registroLibros,
    registroVentas, 
    editarPersona,
    editarLibro,
    editarVenta,
    actualizar, 
    actualizarLibro,
    actualizarVenta,
    eliminar,
    eliminarLibro,
    eliminarVenta };