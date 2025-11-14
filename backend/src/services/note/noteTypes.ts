/**
 * @summary
 * Type definitions for note service operations
 *
 * @module services/note/noteTypes
 *
 * @description
 * Defines TypeScript interfaces and types for note-related operations
 */

/**
 * @interface NoteCreateRequest
 * @description Parameters required to create a new note
 *
 * @property {number} idAccount - Account identifier for multi-tenancy
 * @property {number} idUser - User identifier who is creating the note
 * @property {string} title - Note title (max 255 characters)
 * @property {string} content - Note content (free text)
 */
export interface NoteCreateRequest {
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
}

/**
 * @interface NoteCreateResult
 * @description Result returned after creating a note
 *
 * @property {number} idNote - Identifier of the newly created note
 */
export interface NoteCreateResult {
  idNote: number;
}

/**
 * @interface NoteEntity
 * @description Complete note entity structure
 *
 * @property {number} idNote - Unique note identifier
 * @property {number} idAccount - Associated account identifier
 * @property {number} idUser - User who created the note
 * @property {string} title - Note title
 * @property {string} content - Note content
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface NoteEntity {
  idNote: number;
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}
