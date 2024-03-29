const logger  = require("../middleware/winston");
const statusCodes = require('../constants/statusCodes.js');
const notificationModel = require('../models/notificationModel');

/**
 * This function creates a notification in the database based on the provided recipient_email and content fields
 * @param {*} req 
 * @param {*} res 
 * @returns: The res object with a status code and a message indicating the success or failure of the notification creation
 */
const createNotification = async (req, res) => {
    const { recipient_email, content } = req.body;
    const newNotification = new notificationModel({
        recipient_email,
        content,
    });
    try {
        await newNotification.save();
        logger.info(`Notification created for ${recipient_email}`);
        res.status(statusCodes.success).send('Notification created successfully');
    } catch (error) {
        logger.error(`Error creating notification: ${error}`);
        if (error.name === 'ValidationError') {
            return res.status(statusCodes.badRequest).send('Invalid notification data');
        }
        res.status(statusCodes.queryError).send('Error creating notification');
    }

    // TODO - use socket.io to emit the notification to the recipient
}

/**
 * This function retrieves all notifications from the database based on the recipient_email and updates the isRead field to true
 * @param {*} req 
 * @param {*} res 
 * @returns: The res object with a status code and the notifications retrieved from the database or a message indicating the failure of the retrieval
 */
const getNotifications = async (req, res) => {
    const recipient_email = req.user.email;
    try {
        const notifications = await notificationModel.find({ recipient_email });
        // split the notifications into read and unread
        result = notifications.reduce((acc, notification) => {
            if (notification.isRead) {
                acc.read.push(notification);
            } else {
                acc.unread.push(notification);
            }
            return acc;
        }, { read: [], unread: [] });
        logger.info(`Notifications retrieved for ${recipient_email}`);
        // update all fetched notifications to isRead: true
        await notificationModel.updateMany({ recipient_email }, { isRead: true });
        res.status(statusCodes.success).send(result);
    } catch (error) {
        logger.error(`Error retrieving notifications: ${error}`);
        res.status(statusCodes.queryError).send('Error retrieving notifications');
    }
}
module.exports = {
    createNotification,
    getNotifications,
};