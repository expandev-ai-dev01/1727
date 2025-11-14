/**
 * @schema functional
 * Business logic and operational procedures for NoteBox application
 */
CREATE SCHEMA [functional];
GO

/**
 * @table note Note storage for user-created annotations
 * @multitenancy true
 * @softDelete true
 * @alias nt
 */
CREATE TABLE [functional].[note] (
  [idNote] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idUser] INTEGER NOT NULL,
  [title] NVARCHAR(255) NOT NULL,
  [content] NVARCHAR(MAX) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL,
  [dateModified] DATETIME2 NOT NULL,
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

/**
 * @primaryKey pkNote
 * @keyType Object
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [pkNote] PRIMARY KEY CLUSTERED ([idNote]);
GO

/**
 * @foreignKey fkNote_Account
 * @target subscription.account
 * @tenancy true
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [fkNote_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @foreignKey fkNote_User
 * @target security.user
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [fkNote_User] FOREIGN KEY ([idUser])
REFERENCES [security].[user]([idUser]);
GO

/**
 * @index ixNote_Account
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixNote_Account]
ON [functional].[note]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index ixNote_Account_User
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixNote_Account_User]
ON [functional].[note]([idAccount], [idUser])
INCLUDE ([title], [dateCreated], [dateModified])
WHERE [deleted] = 0;
GO

/**
 * @index ixNote_Account_DateCreated
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixNote_Account_DateCreated]
ON [functional].[note]([idAccount], [dateCreated] DESC)
INCLUDE ([idNote], [title])
WHERE [deleted] = 0;
GO