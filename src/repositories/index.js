import db from '../database/connection.js'
import { CountyRepository } from './county-repository.js'
import { CphRepository } from './cph-repository.js'
import { CaseRepository } from './case-repository.js'
import { AdminRepository } from './admin-repository.js'
import { FieldStaffRepository } from './field-staff-repository.js'
import { TbStatusRepository } from './tb-status-repository.js'
import { TestResultRepository } from './test-result-repository.js'
import { ActionCategoryRepository } from './action-category-repository.js'

// Initialize repositories with database connection
export const countyRepository = new CountyRepository(db)
export const cphRepository = new CphRepository(db)
export const caseRepository = new CaseRepository(db)
export const adminRepository = new AdminRepository(db)
export const fieldStaffRepository = new FieldStaffRepository(db)
export const tbStatusRepository = new TbStatusRepository(db)
export const testResultRepository = new TestResultRepository(db)
export const actionCategoryRepository = new ActionCategoryRepository(db)

// Export all repositories
export {
  CountyRepository,
  CphRepository,
  CaseRepository,
  AdminRepository,
  FieldStaffRepository,
  TbStatusRepository,
  TestResultRepository,
  ActionCategoryRepository
}
