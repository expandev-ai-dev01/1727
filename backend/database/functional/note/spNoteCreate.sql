/**
 * @summary
 * Creates a new note with title and content for the authenticated user.
 * Automatically generates creation and modification timestamps.
 *
 * @procedure spNoteCreate
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - POST /api/v1/internal/note
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier for multi-tenancy isolation
 *
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: User identifier who is creating the note
 *
 * @param {NVARCHAR(255)} title
 *   - Required: Yes
 *   - Description: Title of the note (max 255 characters)
 *
 * @param {NVARCHAR(MAX)} content
 *   - Required: Yes
 *   - Description: Content of the note (supports free text)
 *
 * @returns {INT} idNote - Identifier of the newly created note
 *
 * @testScenarios
 * - Valid creation with all required parameters
 * - Validation failure for empty title
 * - Validation failure for empty content
 * - Validation failure for title exceeding 255 characters
 * - Security validation for invalid account/user
 */
CREATE OR ALTER PROCEDURE [functional].[spNoteCreate]
  @idAccount INTEGER,
  @idUser INTEGER,
  @title NVARCHAR(255),
  @content NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {titleRequired}
   */
  IF (@title IS NULL OR LTRIM(RTRIM(@title)) = '')
  BEGIN
    ;THROW 51000, 'titleRequired', 1;
  END;

  /**
   * @validation Title length validation
   * @throw {titleExceedsMaxLength}
   */
  IF (LEN(@title) > 255)
  BEGIN
    ;THROW 51000, 'titleExceedsMaxLength', 1;
  END;

  /**
   * @validation Required parameter validation
   * @throw {contentRequired}
   */
  IF (@content IS NULL OR LTRIM(RTRIM(@content)) = '')
  BEGIN
    ;THROW 51000, 'contentRequired', 1;
  END;

  /**
   * @validation Account existence validation
   * @throw {accountDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [subscription].[account] acc WHERE acc.[idAccount] = @idAccount)
  BEGIN
    ;THROW 51000, 'accountDoesntExist', 1;
  END;

  /**
   * @validation User existence and account association validation
   * @throw {userDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [security].[user] usr WHERE usr.[idUser] = @idUser AND usr.[idAccount] = @idAccount)
  BEGIN
    ;THROW 51000, 'userDoesntExist', 1;
  END;

  DECLARE @idNote INTEGER;
  DECLARE @currentDateTime DATETIME2 = GETUTCDATE();

  BEGIN TRY
    /**
     * @rule {db-multi-tenancy,fn-note-creation} Insert new note with account isolation
     */
    BEGIN TRAN;

      INSERT INTO [functional].[note] (
        [idAccount],
        [idUser],
        [title],
        [content],
        [dateCreated],
        [dateModified],
        [deleted]
      )
      VALUES (
        @idAccount,
        @idUser,
        @title,
        @content,
        @currentDateTime,
        @currentDateTime,
        0
      );

      SET @idNote = SCOPE_IDENTITY();

      /**
       * @output {NoteCreateResult, 1, 1}
       * @column {INT} idNote
       * - Description: Identifier of the newly created note
       */
      SELECT @idNote AS [idNote];

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO