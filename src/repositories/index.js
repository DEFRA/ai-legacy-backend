import db from '../database/connection.js'
import { CountyRepository } from './county-repository.js'
import { CphRepository } from './cph-repository.js'
import { CaseRepository } from './case-repository.js'
import { AdminRepository } from './admin-repository.js'
import { FieldStaffRepository } from './field-staff-repository.js'

// Initialize repositories with database connection
export const countyRepository = new CountyRepository(db)
export const cphRepository = new CphRepository(db)
export const caseRepository = new CaseRepository(db)
export const adminRepository = new AdminRepository(db)
export const fieldStaffRepository = new FieldStaffRepository(db)

// Export all repositories
export {
  CountyRepository,
  CphRepository,
  CaseRepository,
  AdminRepository,
  FieldStaffRepository
}
