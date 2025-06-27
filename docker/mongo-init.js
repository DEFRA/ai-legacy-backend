/* eslint-disable */

/**
 * MongoDB Initialization Script
 * This script runs when the MongoDB container starts for the first time
 * It seeds the TB status reference data into the database
 *
 * This file is executed by MongoDB's docker-entrypoint-initdb.d mechanism
 * and should be written in MongoDB shell JavaScript syntax
 */

// Switch to the tbcms database
db = db.getSiblingDB('tbcms')

console.log('🚀 Starting MongoDB initialization...')

/**
 * Check if TB status data already exists
 * @returns {number} Count of existing TB status documents
 */
function checkExistingData () {
  console.log('🔍 Checking for existing TB status data...')
  return db.tbStatus.countDocuments()
}

/**
 * Seed TB status reference data into the database
 * @returns {void}
 */
function seedTbStatusData () {
  console.log('🌱 Seeding TB status reference data...')

  const now = new Date()

  // TB Status reference data
  const allRegions = ['midlands', 'north', 'scotland', 'southEast', 'southWest', 'wales']

  const tbStatusData = [
    {
      code: 'FR',
      description: 'Fake Restricted',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'FT1',
      description: 'Fake First Test',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'FT2',
      description: 'Fake Second Test',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'FC',
      description: 'Fake Clear',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'FSU',
      description: 'Fake Suspended',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    }
  ]

  // Insert TB status data
  const result = db.tbStatus.insertMany(tbStatusData)
  console.log('✅ Inserted ' + result.insertedIds.length + ' TB status records')

  // Create indexes
  db.tbStatus.createIndex({ code: 1 }, { unique: true })
  db.tbStatus.createIndex({ description: 1 })
  console.log('✅ Created indexes for TB status collection')

  // Verify data
  const count = db.tbStatus.countDocuments()
  console.log('📊 Total TB status records: ' + count)
}

/**
 * Main initialization logic
 * @returns {void}
 */
function initializeMongoDB () {
  try {
    const existingCount = checkExistingData()

    if (existingCount > 0) {
      console.log('📊 TB status data already exists (' + existingCount + ' records), skipping seed...')
    } else {
      seedTbStatusData()
      console.log('🎉 TB status seeding completed!')
    }

    console.log('✅ MongoDB initialization complete!')
  } catch (error) {
    console.log('❌ MongoDB initialization failed: ' + error.message)
    throw error
  }
}

// Execute the initialization
initializeMongoDB()
