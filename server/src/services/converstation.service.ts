import Conversation from "../models/conversation.model";

export const createConversation = async (ids: any[]) => {
  try {
    const conversation = await Conversation.create({
      participants: ids
    })

    if (conversation) {
      return conversation;
    }

    return null;
  } catch (error) {
    console.error('Error while creating conversation:', error);
    throw error;
  }
}

export const findConversationByIds = async (ids: any[]) => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: ids }
    })

    if (conversation) {
      return conversation;
    }

    return null;
  } catch (error) {
    console.error('Error while finding Converstation:', error);
    throw error;
  }
}

export const getMessagesByUserIds = async (ids: any[]) => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: ids }
    }).populate('messages');

    if (conversation) {
      return conversation;
    }

    return null;
  } catch (error) {
    console.error('Error while finding Converstation:', error);
    throw error;
  }
}