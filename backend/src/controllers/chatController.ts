// Third party
import asyncHandler from "express-async-handler";
import debug from "debug";
import * as express from "express";
// Models
import ChatRoom from "../models/chatRoom.js";

const logger = debug("chat-app:chatController");

export const getChatRooms = asyncHandler(async (req, res, next) => {
  const chatRoomList = await ChatRoom.find({
    members: { $in: [req.params.userId] },
  }).exec();

  // console.log("chatRoomList", chatRoomList);

  // const filteredList: string[] = [];

  // for (let document of chatRoomList) {
  //   for (let value of Object.values(document)) {
  //     if (value !== req.params.userId) {
  //       filteredList.push(value);
  //     }
  //   }
  // }

  res.json(chatRoomList);
});

export const createChatRoom = asyncHandler(async (req, res, next) => {
  const newChatRoom = await ChatRoom.create({
    members: [req.body.senderId, req.body.receiverId],
  });

  res.status(201).json(newChatRoom);
});
