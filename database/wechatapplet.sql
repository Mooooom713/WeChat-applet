/*
 Navicat MySQL Data Transfer

 Source Server         : wechatapplet
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : wechatapplet

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 23/06/2019 13:47:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `commenter_id` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `story_id` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `commenter_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `commenter_id`(`commenter_id`) USING BTREE,
  INDEX `story_id`(`story_id`) USING BTREE,
  INDEX `commenter_name`(`commenter_name`) USING BTREE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `story` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`commenter_name`) REFERENCES `user` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`commenter_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1344be8a-0e18-4ace-b8ad-cca48c8c9d2f', '2016220205032', 'hello world!', '1344be8a-0e18-4ace-b8ad-cca48c8c9d2f', 'atmoyxic');
INSERT INTO `comment` VALUES ('82319c10-b088-4a51-a07d-d973a05e3cf5', '2016220205032', 'well done', 'afe748c8-76aa-424d-836b-3554583f78ba', 'atmoyxic');

-- ----------------------------
-- Table structure for getup
-- ----------------------------
DROP TABLE IF EXISTS `getup`;
CREATE TABLE `getup`  (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `startDate` date NOT NULL,
  `duration` int(255) NOT NULL,
  `time` time(0) NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `initiator` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `participants_number` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `initiator`(`initiator`) USING BTREE,
  CONSTRAINT `getup_ibfk_1` FOREIGN KEY (`initiator`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of getup
-- ----------------------------
INSERT INTO `getup` VALUES ('86aeec5e-0447-4edb-9035-3cb789d38b16', '2018-02-02', 8, '08:00:00', NULL, NULL, '2016220205032', 1);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `photo_id` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `data` blob NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `image_ibfk_1`(`photo_id`) USING BTREE,
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photography` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for photography
-- ----------------------------
DROP TABLE IF EXISTS `photography`;
CREATE TABLE `photography`  (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `like_number` int(255) NOT NULL DEFAULT 0,
  `report` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 0,
  `publisher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publisher_id` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `publisher`(`publisher`) USING BTREE,
  INDEX `publisher_id`(`publisher_id`) USING BTREE,
  CONSTRAINT `photography_ibfk_1` FOREIGN KEY (`publisher`) REFERENCES `user` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `photography_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for selfstudy
-- ----------------------------
DROP TABLE IF EXISTS `selfstudy`;
CREATE TABLE `selfstudy`  (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` date NOT NULL,
  `begin_time` time(0) NOT NULL,
  `end_time` time(0) NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `initiator` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `participants_number` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `initiator`(`initiator`) USING BTREE,
  CONSTRAINT `selfstudy_ibfk_1` FOREIGN KEY (`initiator`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of selfstudy
-- ----------------------------
INSERT INTO `selfstudy` VALUES ('1344be8a-0e18-4ace-b8ad-cca48c8c9d2f', '立人楼', '2019-06-23', '15:08:20', '15:08:33', 'see you', '15680963917', '2016220205032', 2);
INSERT INTO `selfstudy` VALUES ('b7663031-eb07-486a-9797-0e686c4ddf3e', '立人楼', '2019-06-23', '15:08:20', '15:08:33', NULL, NULL, '2016220205032', 1);
INSERT INTO `selfstudy` VALUES ('d48644cc-2c7a-4714-9900-18ab99e80b03', '品学楼', '2019-06-22', '15:08:20', '15:08:22', '快来哦', '15680963917', '2016220205031', 1);

-- ----------------------------
-- Table structure for story
-- ----------------------------
DROP TABLE IF EXISTS `story`;
CREATE TABLE `story`  (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publisher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publisher_id` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `publisher`(`publisher`) USING BTREE,
  INDEX `publisher_id`(`publisher_id`) USING BTREE,
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`publisher`) REFERENCES `user` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `story_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of story
-- ----------------------------
INSERT INTO `story` VALUES ('1344be8a-0e18-4ace-b8ad-cca48c8c9d2f', 'hello', 'hello, world!', 'atmoyxic', '2016220205032');
INSERT INTO `story` VALUES ('afe748c8-76aa-424d-836b-3554583f78ba', 'test', 'hello world!', 'atmoyxic', '2016220205032');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `age` tinyint(4) NOT NULL,
  `grade` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `major` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` enum('student','admin') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2016220205031', 'password', 'amy', '女', 0, '', '', '', 'student');
INSERT INTO `user` VALUES ('2016220205032', 'password', 'atmoyxic', '女', 20, '大四', '信软', '软技', 'admin');

SET FOREIGN_KEY_CHECKS = 1;
