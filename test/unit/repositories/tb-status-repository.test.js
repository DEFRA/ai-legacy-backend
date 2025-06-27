import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TbStatusRepository } from '../../../src/repositories/tb-status-repository.js'

describe('TbStatusRepository', () => {
  let mockDb
  let tbStatusRepository

  beforeEach(() => {
    mockDb = vi.fn(() => ({
      distinct: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockResolvedValue([])
    }))

    tbStatusRepository = new TbStatusRepository(mockDb)
  })

  describe('getAllTbStatuses', () => {
    it('should return all TB statuses ordered by abbreviation', async () => {
      const mockTbStatuses = [
        {
          status_abb: 'FR',
          status: 'Fake Restricted',
          midlands: true,
          north: true,
          scotland: true,
          south_east: true,
          south_west: true,
          wales: true
        }
      ]

      mockDb.mockReturnValue({
        distinct: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockResolvedValue(mockTbStatuses)
      })

      const result = await tbStatusRepository.getAllTbStatuses()

      expect(mockDb).toHaveBeenCalledWith('tb_status_t')
      expect(result).toEqual(mockTbStatuses)
    })

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed')

      mockDb.mockReturnValue({
        distinct: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockRejectedValue(dbError)
      })

      await expect(tbStatusRepository.getAllTbStatuses()).rejects.toThrow('Database connection failed')
    })
  })

  describe('getTbStatusesByRegion', () => {
    it('should return TB statuses for valid region', async () => {
      const mockTbStatuses = [
        {
          status_abb: 'FR',
          status: 'Fake Restricted',
          midlands: true,
          north: false,
          scotland: false,
          south_east: false,
          south_west: false,
          wales: false
        }
      ]

      mockDb.mockReturnValue({
        distinct: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockResolvedValue(mockTbStatuses)
      })

      const result = await tbStatusRepository.getTbStatusesByRegion('midlands')

      expect(result).toEqual(mockTbStatuses)
    })

    it('should throw error for invalid region', async () => {
      await expect(tbStatusRepository.getTbStatusesByRegion('invalid_region')).rejects.toThrow(
        'Invalid region: invalid_region'
      )
    })

    it('should validate region parameter', async () => {
      const validRegions = ['midlands', 'north', 'scotland', 'south_east', 'south_west', 'wales']

      for (const region of validRegions) {
        mockDb.mockReturnValue({
          distinct: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue([])
        })

        await expect(tbStatusRepository.getTbStatusesByRegion(region)).resolves.toBeDefined()
      }
    })
  })
})
