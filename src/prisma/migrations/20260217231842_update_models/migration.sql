/*
 Warnings:
 
 - You are about to drop the column `open` on the `Inbox` table. All the data in the column will be lost.
 - You are about to drop the column `openUntil` on the `Inbox` table. All the data in the column will be lost.
 - Added the required column `lockedUntil` to the `Inbox` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable
ALTER TABLE
  `Inbox` DROP COLUMN `open`,
  DROP COLUMN `openUntil`,
ADD
  COLUMN `lockedUntil` DATETIME(3) NOT NULL,
ADD
  COLUMN `locked` BOOLEAN AS (`lockedUntil` > CURRENT_TIMESTAMP(3)) VIRTUAL;