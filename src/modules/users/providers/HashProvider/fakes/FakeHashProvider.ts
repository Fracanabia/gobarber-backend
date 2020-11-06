import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

class FakeHashProvider implements IHashProvider {
  public generateHash(payload: string): Promise<string> {
    return Promise.resolve(payload)
  }

  public compareHash(payload: string, hashed: string): Promise<boolean> {
    return Promise.resolve(payload === hashed)
  }
}
export default FakeHashProvider
