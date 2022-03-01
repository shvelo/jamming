import Container from 'typedi'
import { User } from '../user/models'
import { UserRepository } from '../user/user.repository'
import { AuthConfig } from './auth.config'
import { AuthService } from './auth.service'

jest.mock('../user/user.repository')

describe('AuthService', () => {
  let authService: AuthService
  let userRepository = {
    findByUsername: jest.fn(),
    findById: jest.fn(),
  }
  const secret = 'example'
  let authConfig = { secret }

  beforeAll(() => {
    Container.reset()
    Container.set(AuthConfig, authConfig)
    Container.set(UserRepository, userRepository)
    authService = Container.get(AuthService)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    Container.reset()
  })

  describe('signJwt and verifyJwt', () => {
    const payload = { userId: 1 }
    let jwt: string

    test('signJwt works without error', () => {
      jwt = authService.signJwt(payload)
      expect(jwt).toBeTruthy()
    })

    test('decodeJwt with signed jwt works without error', () => {
      const decoded = authService.verifyJwt(jwt)
      expect(decoded).toBeTruthy()
    })

    test('decoded payload is the same', () => {
      const decoded = authService.verifyJwt(jwt)
      expect(decoded.userId).toEqual(payload.userId)
    })

    test('verifyJwt throws an error for invalid jwt', () => {
      expect(() => {
        authService.verifyJwt('invalid jwt')
      }).toThrow()
    })

    describe('missing secret', () => {
      beforeAll(() => {
        authConfig.secret = ''
      })
      afterAll(() => {
        authConfig.secret = secret
      })

      test('signJwt throws an error', () => {
        expect(() => {
          authService.signJwt(payload)
        }).toThrow()
      })

      test('verifyJwt throws an error', () => {
        expect(() => {
          authService.verifyJwt(jwt)
        }).toThrow()
      })
    })
  })

  describe('generateJwt', () => {
    test('it passes proper payload to signJwt', () => {
      const userId = 9
      const user = { id: userId } as User
      authService.signJwt = jest.fn()
      authService.generateJwt(user)
      expect(authService.signJwt).toBeCalledWith({ userId })
    })
  })

  describe('getUserFromJwt', () => {

  })

  describe('login', () => {

  })

  describe('authenticate', () => {

  })
})
