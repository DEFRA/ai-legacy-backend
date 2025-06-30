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
 * Check if allocation booking method data already exists
 * @returns {number} Count of existing allocation booking method documents
 */
function checkExistingAllocationBookingMethodData () {
  console.log('🔍 Checking for existing allocation booking method data...')
  return db.allocationBookingMethod.countDocuments()
}

/**
 * Check if TB result data already exists
 * @returns {number} Count of existing TB result documents
 */
function checkExistingTbResultData () {
  console.log('🔍 Checking for existing TB result data...')
  return db.tbResult.countDocuments()
}

/**
 * Seed TB status reference data into the database
 * @returns {void}
 */
function seedTbStatusData () {
  console.log('🌱 Seeding TB status reference data...')

  const now = new Date()

  // TB Status reference data
  const allRegions = ['midlands', 'north', 'scotland', 'south_east', 'south_west', 'wales']

  const tbStatusData = [
    {
      code: 'OTF',
      description: 'OTF',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFS',
      description: 'OTFS',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFS2',
      description: 'OTFS2',
      validRegions: ['midlands', 'north', 'south_east', 'south_west'],
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFW',
      description: 'OTFW',
      validRegions: allRegions,
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFW (Last 3 Yrs)',
      description: 'OTFW (Confirmed disease within the last three years)',
      validRegions: [],
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFW (Cont to Conf)',
      description: 'OTFW (Contiguous to confirmed breakdown)',
      validRegions: [],
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFW (Last 3 Yrs + Cont to Conf)',
      description: 'OTFW (Confirmed disease within the last three years & Contiguous to confirmed breakdown)',
      validRegions: [],
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFW (DL at PME)',
      description: 'OTFW (DL at PME)',
      validRegions: [],
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFW (Positive Culture)',
      description: 'OTFW (Positive Culture)',
      validRegions: [],
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'OTFW2',
      description: 'OTFW2',
      validRegions: ['wales'],
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
 * Seed TB result reference data into the database
 * @returns {void}
 */
function seedTbResultData () {
  console.log('🌱 Seeding TB result reference data...')

  const now = new Date()

  // TB Result reference data
  const tbResultData = [
    {
      code: 'NVL',
      description: 'NVL',
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'NVL - Neg',
      description: 'NVL - Neg',
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'NVL - Pos',
      description: 'NVL - Pos',
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'VL',
      description: 'VL',
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'VL - Neg',
      description: 'VL - Neg',
      createdAt: now,
      updatedAt: now
    },
    {
      code: 'VL - Pos',
      description: 'VL - Pos',
      createdAt: now,
      updatedAt: now
    }
  ]

  // Insert TB result data
  const result = db.tbResult.insertMany(tbResultData)
  console.log('✅ Inserted ' + result.insertedIds.length + ' TB result records')

  // Create indexes
  db.tbResult.createIndex({ code: 1 }, { unique: true })
  db.tbResult.createIndex({ description: 1 })
  console.log('✅ Created indexes for TB result collection')

  // Verify data
  const count = db.tbResult.countDocuments()
  console.log('📊 Total TB result records: ' + count)
}

/**
 * Seed allocation booking method reference data into the database
 * @returns {void}
 */
function seedAllocationBookingMethodData () {
  console.log('🌱 Seeding allocation booking method reference data...')

  const now = new Date()

  // Allocation booking method reference data
  const allocationBookingMethodData = [
    {
      method: 'Phone',
      createdAt: now,
      updatedAt: now
    },
    {
      method: 'Email',
      createdAt: now,
      updatedAt: now
    },
    {
      method: 'Online Portal',
      createdAt: now,
      updatedAt: now
    },
    {
      method: 'Fax',
      createdAt: now,
      updatedAt: now
    },
    {
      method: 'In Person',
      createdAt: now,
      updatedAt: now
    }
  ]

  // Insert allocation booking method data
  const result = db.allocationBookingMethod.insertMany(allocationBookingMethodData)
  console.log('✅ Inserted ' + result.insertedIds.length + ' allocation booking method records')

  // Create indexes
  db.allocationBookingMethod.createIndex({ method: 1 }, { unique: true })
  console.log('✅ Created indexes for allocation booking method collection')

  // Verify data
  const count = db.allocationBookingMethod.countDocuments()
  console.log('📊 Total allocation booking method records: ' + count)
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

    const existingTbResultCount = checkExistingTbResultData()

    if (existingTbResultCount > 0) {
      console.log('📊 TB result data already exists (' + existingTbResultCount + ' records), skipping seed...')
    } else {
      seedTbResultData()
      console.log('🎉 TB result seeding completed!')
    }

    const existingAllocationBookingMethodCount = checkExistingAllocationBookingMethodData()

    if (existingAllocationBookingMethodCount > 0) {
      console.log('📊 Allocation booking method data already exists (' + existingAllocationBookingMethodCount + ' records), skipping seed...')
    } else {
      seedAllocationBookingMethodData()
      console.log('🎉 Allocation booking method seeding completed!')
    }

    console.log('✅ MongoDB initialization complete!')
  } catch (error) {
    console.log('❌ MongoDB initialization failed: ' + error.message)
    throw error
  }
}

// Execute the initialization
initializeMongoDB()
