/*
 Navicat MySQL Data Transfer

 Source Server         : webchatapplet
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : wechatapplet

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 21/06/2019 18:13:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for getup
-- ----------------------------
DROP TABLE IF EXISTS `getup`;
CREATE TABLE `getup`  (
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `startDate` date NOT NULL,
  `duration` int(255) NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `initiator` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `participants_number` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`) USING BTREE
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
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2016220205031', 'password');
INSERT INTO `user` VALUES ('2016220205032', 'password');

SET FOREIGN_KEY_CHECKS = 1;
