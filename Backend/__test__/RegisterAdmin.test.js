const { register } = require('./FunctionToBeTested/registerTest.js');
const User = require('../models/User');

describe('registerAdmin', () => {
    it('should register an admin', async () => {
        const req = {
            body: {
                name: 'Admin',
                email: 'mockadmin@gmail.com',
                tel: '1234567890',
                password: 'password',
                role: 'admin',
                hid: null
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockUser = {
            _id: 'userId123',
            name: 'Admin',
            email: 'mockadmin@gmail.com',
            tel: '1234567890',
            password: 'password',
            role: 'admin',
            hid: null
        }

        User.create = jest.fn().mockResolvedValue(mockUser);

        await register(req, res);

        expect(User.create).toHaveBeenCalledWith(req.body);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true
        });
    });
    it('should not register an admin fields is missing', async () => {
        const req = {
            body: {
                name: 'Admin',
                tel: '1234567890',
                password: 'password',
                hid: null
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockUser = {
            _id: 'userId123',
            name: 'Admin',
            tel: '1234567890',
            password: 'password',
            hid: null
        }

        User.create = jest.fn().mockResolvedValue(mockUser);

        await register(req, res);

        // expect(User.create).toHaveBeenCall(1);x

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: 'Please provide all required fields'
        });
    });

    it('should return 500 error if an error occurs during admin creation', async () => {
        const req = {
            body: {
                name: 'Admin',
                email: 'mockadmin@gmail.com',
                tel: '1234567890',
                password: 'password',
                role: 'admin',
                hid: null
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockUser = {
            _id: 'userId123',
            name: 'Admin',
            email: 'mockadmin@gmail.com',
            tel: '1234567890',
            password: 'password',
            role: 'admin',
            hid: null
        }

        User.create = jest.fn().mockRejectedValue(new Error('Test error'));

        await register(req, res);

        expect(User.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false
        });
    })
});
