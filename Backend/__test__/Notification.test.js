const{getNotification,addNotification,deleteNotification}=require('../controllers/notifications');
const Notification = require('../models/Notification');


describe('getNotification', () => {
    // jest.mock('../models/Notification');
    // const mockPopulate = jest.spyOn(Notification, 'populate');
    // mockPopulate.mockReturnValue([{ id: 'bookingId1', room: 'Room 1' }, { id: 'bookingId2', room: 'Room 2' }]); // Replace with desired behavior

  it('should return notifications for the user', async () => {
    const req = {
      user: {
        id: 'userId123' // Mock the user ID
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockNotifications = [{ id: 'notificationId123', message: 'Notification 1',bookingId:'1234'}, 
    { id: 'notificationId456', message: 'Notification 2',bookingId: '4567'}];

    Notification.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockNotifications)
    });

    await getNotification(req, res);

    expect(Notification.find).toHaveBeenCalledWith({ user: 'userId123' });
    //expect(Notification.populate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockNotifications });
  });
  it('require userId', async () => {
    const req = {
      
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockNotifications = [{ id: 'notificationId123', message: 'Notification 1',bookingId:'1234'}, 
    { id: 'notificationId456', message: 'Notification 2',bookingId: '4567'}];

    Notification.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockNotifications)
    });

    await getNotification(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({success:false,message:"Cannot find Notification"});
  });

});

describe('addNotification', () => {
    it('should create a new notification', async () => {

      const req = {
        body: {
          _id: 'notificationId123',
          type: 'update',
          bookingId: 'bookingId123',
          user: 'userId123',
          checkin: '2024-05-01',
          checkout: '2024-05-05' 
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      const mockNotification = {
        _id: 'notificationId123',
        type: 'update',
        bookingId: 'bookingId123',
        user: 'userId123',
        checkin: '2024-05-01',
        checkout: '2024-05-05' 
      };
      Notification.create = jest.fn().mockResolvedValue(mockNotification);
  
      await addNotification(req, res);
  
      expect(Notification.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockNotification });
    });
  
    it('should return 400 if required fields are missing', async () => {

      const req = {
        body: {

        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await addNotification(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Missing required fields" });
    });
  
    it('should return 400 if notification type is invalid', async () => {

      const req = {
        body: {
          _id: 'notificationId123',
          bookingId: 'bookingId123',
          user: 'userId123',
          checkin: '2024-05-01',
          checkout: '2024-05-05' 
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      await addNotification(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid notification type" });
    });

    it('should return 500 error if an error occurs during notification creation', async () => {

        const req = {
          body: {
            _id: 'notificationId123',
            type: 'update',
            bookingId: 'bookingId123',
            user: 'userId123',
            checkin: '2024-05-01',
            checkout: '2024-05-05' 
          }
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
    
        Notification.create = jest.fn().mockRejectedValue(new Error('Test error'));

        await addNotification(req, res);

        expect(Notification.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Cannot create Notification" });
      });
  

  });

  describe('deleteNotification', () => {
    it('should delete a notification successfully', async () => {

      const req = {
        params: {
          id: 'notificationId123'
        },
        user: {
          id: 'userId123',
          role: 'admin'
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNotification = {
        _id: 'notificationId123',
        user: 'userId123'

      };
      Notification.findById = jest.fn().mockResolvedValueOnce({ // Mocks a notification document
        user: 'userId123', // Example user ID
        deleteOne: jest.fn().mockResolvedValueOnce() // Mock deleteOne to resolve
      });

      await deleteNotification(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
    });
  
    it('should return 404 if notification is not found', async () => {

      const req = {
        params: {
          id: 'notificationId123'
        },
        user: {
          id: 'userId123'
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Notification.findById = jest.fn().mockResolvedValue(null);

      await deleteNotification(req, res);
  
      expect(Notification.findById).toHaveBeenCalledWith('notificationId123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Notification not found" });
    });
  
    it('should return 401 if not authorized to delete notification', async () => {

      const req = {
        params: {
          id: 'notificationId123'
        },
        user: {
          id: 'otherUserId', 
          role: 'user'
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockNotification = {
        _id: 'notificationId123',
        user: 'userId123'
      };
      Notification.findById = jest.fn().mockResolvedValue(mockNotification);

      await deleteNotification(req, res);
  
      expect(Notification.findById).toHaveBeenCalledWith('notificationId123');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Not authorized to delete Notification" });
    });
  
    it('should return 500 if not Provide the notification id', async () => {

        const req = {
         
          user: {
            id: 'otherUserId', 
            role: 'user'
          }
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };

        const mockNotification = {
          _id: 'notificationId123',
          user: 'userId123'
        };
        Notification.findById = jest.fn().mockResolvedValue(mockNotification);

        await deleteNotification(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({success:false,message:"Cannot delete Notification"});
      });
  });
