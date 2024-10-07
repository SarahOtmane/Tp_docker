const supertest = require('supertest');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const { app, server } = require('../app'); 
const User = require('../models/userModel');
const connectDB = require('../services/connectDB');


describe('Users controller', () => {
    beforeAll(async () => { await connectDB(); });
    
    afterAll(async () => { 
        await mongoose.disconnect(); 
        server.close();
    });

    describe('POST /users/register', () => {
        it('should return 403 if the email is empty', async() => {
            const response = await supertest(app)
                .post('/users/register')
                .send({
                    password: 'test',
                });
    
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Tous les champs sont requis.');
        });
        
        it('should return 403 if the password is empty', async() => {
            const response = await supertest(app)
                .post('/users/register')
                .send({
                    email: 'sarahotmane@gmail.com',
                });
    
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Tous les champs sont requis.');
        });

        it('should return 403 if the email is not correct', async() => {
            const response = await supertest(app)
                .post('/users/register')
                .send({
                    email: 'sarahotmane',
                    password: 'test'
                });
    
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe('Format d\'email invalide.');
        });

        it('should return 409 if the email is already used', async() => {
            await User.create({
                email: 'sarah@gmail.com',
                password: 'motdepasse',
            });

            const response = await supertest(app)
                .post('/users/register')
                .send({
                    email: 'sarah@gmail.com',
                    password: 'motdepasse',
                });
    
            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe('Cet email existe déjà.');
        });

        it('should return 201 when creating a new user', async() => {
            const response = await supertest(app)
                .post('/users/register')
                .send({
                    email: 'sarah@gmail.com',
                    password: 'motdepasse',
                });
    
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('Utilisateur créé avec succès.');
        });
    });
    
});