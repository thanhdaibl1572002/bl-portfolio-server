import { initializeApp } from 'firebase-admin/app'
import { credential } from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = require('bl-folio-firebase-service-account.json')

const firebaseAdmin = initializeApp({
  credential: credential.cert(serviceAccount)
})

export const firebaseAdminAuth = getAuth(firebaseAdmin)

export default firebaseAdmin