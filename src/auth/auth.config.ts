import { Service } from 'typedi'

@Service()
export class AuthConfig {
  secret = process.env.JWT_SECRET
}
