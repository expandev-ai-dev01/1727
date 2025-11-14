/**
 * @summary
 * Note business logic and database operations
 *
 * @module services/note/noteRules
 *
 * @description
 * Handles note creation operations by calling stored procedures
 * and managing data transformations
 */

import { getPool } from '@/instances/database';
import { NoteCreateRequest, NoteCreateResult } from './noteTypes';

/**
 * @summary
 * Creates a new note in the database
 *
 * @function noteCreate
 * @module note
 *
 * @param {NoteCreateRequest} params - Note creation parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} params.title - Note title
 * @param {string} params.content - Note content
 *
 * @returns {Promise<NoteCreateResult>} Created note identifier
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {BusinessRuleError} When business rules are violated
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const note = await noteCreate({
 *   idAccount: 1,
 *   idUser: 1,
 *   title: 'My First Note',
 *   content: 'This is the content of my note'
 * });
 */
export async function noteCreate(params: NoteCreateRequest): Promise<NoteCreateResult> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('idUser', params.idUser)
    .input('title', params.title)
    .input('content', params.content)
    .execute('[functional].[spNoteCreate]');

  return result.recordset[0];
}
