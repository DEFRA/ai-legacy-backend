import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TbStatusService } from '../../../../../src/api/v1/reference/tb-status-service.js'

/**
 * Test suite for TbStatusService
 * Covers all public methods and edge cases
 */
describe('TbStatusService', () => {
  let mockRepository
  let service

  beforeEach(() => {
    mockRepository = {
      getAll: vi.fn(),
      getByRegion: vi.fn()
    }
    service = new TbStatusService(mockRepository)
  })

  describe('constructor', () => {
    it('should create service instance with repository', () => {
      expect(service.repository).toBe(mockRepository)
    })
  })

  describe('getOptions', () => {
    describe('without region filter', () => {
      it('should return formatted options when repository returns data', async () => {
        const mockData = [
          { code: 'ACTIVE', description: 'Active TB Case' },
          { code: 'CLOSED', description: 'Closed TB Case' }
        ]
        mockRepository.getAll.mockResolvedValue(mockData)

        const result = await service.getOptions()

        expect(mockRepository.getAll).toHaveBeenCalledOnce()
        expect(mockRepository.getByRegion).not.toHaveBeenCalled()
        expect(result).toEqual([
          { code: 'ACTIVE', description: 'Active TB Case' },
          { code: 'CLOSED', description: 'Closed TB Case' }
        ])
      })

      it('should return empty array when repository returns null', async () => {
        mockRepository.getAll.mockResolvedValue(null)

        const result = await service.getOptions()

        expect(result).toEqual([])
      })

      it('should return empty array when repository returns empty array', async () => {
        mockRepository.getAll.mockResolvedValue([])

        const result = await service.getOptions()

        expect(result).toEqual([])
      })

      it('should handle null parameter explicitly', async () => {
        mockRepository.getAll.mockResolvedValue([])

        const result = await service.getOptions(null)

        expect(mockRepository.getAll).toHaveBeenCalledOnce()
        expect(result).toEqual([])
      })
    })

    describe('with region filter', () => {
      it('should return formatted options for valid region', async () => {
        const mockData = [
          { code: 'REGIONAL', description: 'Regional TB Case' }
        ]
        mockRepository.getByRegion.mockResolvedValue(mockData)

        const result = await service.getOptions('north-west')

        expect(mockRepository.getByRegion).toHaveBeenCalledWith('north-west')
        expect(mockRepository.getAll).not.toHaveBeenCalled()
        expect(result).toEqual([
          { code: 'REGIONAL', description: 'Regional TB Case' }
        ])
      })

      it('should trim whitespace from region parameter', async () => {
        mockRepository.getByRegion.mockResolvedValue([])

        await service.getOptions('  north-west  ')

        expect(mockRepository.getByRegion).toHaveBeenCalledWith('north-west')
      })

      it('should return empty array when no regional data found', async () => {
        mockRepository.getByRegion.mockResolvedValue([])

        const result = await service.getOptions('unknown-region')

        expect(result).toEqual([])
      })
    })

    describe('parameter validation', () => {
      it('should throw error for empty string region', async () => {
        await expect(service.getOptions('')).rejects.toThrow(
          'Region parameter must be a non-empty string when provided'
        )
      })

      it('should throw error for whitespace-only region', async () => {
        await expect(service.getOptions('   ')).rejects.toThrow(
          'Region parameter must be a non-empty string when provided'
        )
      })

      it('should throw error for numeric region', async () => {
        await expect(service.getOptions(123)).rejects.toThrow(
          'Region parameter must be a non-empty string when provided'
        )
      })

      it('should throw error for boolean region', async () => {
        await expect(service.getOptions(true)).rejects.toThrow(
          'Region parameter must be a non-empty string when provided'
        )
      })

      it('should throw error for object region', async () => {
        await expect(service.getOptions({})).rejects.toThrow(
          'Region parameter must be a non-empty string when provided'
        )
      })
    })

    describe('error handling', () => {
      it('should wrap repository errors with descriptive message', async () => {
        const repositoryError = new Error('Database connection failed')
        mockRepository.getAll.mockRejectedValue(repositoryError)

        await expect(service.getOptions()).rejects.toThrow(
          'Failed to retrieve TB status options: Database connection failed'
        )
      })

      it('should wrap regional repository errors with descriptive message', async () => {
        const repositoryError = new Error('Regional query failed')
        mockRepository.getByRegion.mockRejectedValue(repositoryError)

        await expect(service.getOptions('north-west')).rejects.toThrow(
          'Failed to retrieve TB status options: Regional query failed'
        )
      })
    })

    describe('data formatting', () => {
      it('should only include code and description fields', async () => {
        const mockData = [
          {
            code: 'ACTIVE',
            description: 'Active TB Case',
            extraField: 'should not appear',
            _id: 'mongo-id',
            validRegions: ['north', 'south']
          }
        ]
        mockRepository.getAll.mockResolvedValue(mockData)

        const result = await service.getOptions()

        expect(result).toEqual([
          { code: 'ACTIVE', description: 'Active TB Case' }
        ])
        expect(result[0]).not.toHaveProperty('extraField')
        expect(result[0]).not.toHaveProperty('_id')
        expect(result[0]).not.toHaveProperty('validRegions')
      })

      it('should handle missing properties gracefully', async () => {
        const mockData = [
          { code: 'ACTIVE' }, // missing description
          { description: 'No Code Case' }, // missing code
          {} // missing both
        ]
        mockRepository.getAll.mockResolvedValue(mockData)

        const result = await service.getOptions()

        expect(result).toEqual([
          { code: 'ACTIVE', description: undefined },
          { code: undefined, description: 'No Code Case' },
          { code: undefined, description: undefined }
        ])
      })
    })
  })
})
