import { type Collection, MongoClient } from 'mongodb'

interface MongoHelperType {
  client: MongoClient | null
  uri: string | undefined
  connect (uri: string): Promise<void>
  disconnect (): Promise<void>
  getCollection (name: string): Collection
  map (data: any): any
}

export const MongoHelper: MongoHelperType = {
  client: null,
  uri: undefined,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = new MongoClient(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    if (this.client === null) this.client = new MongoClient(this.uri)
    return this.client.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...dataWithoutId } = data
    return Object.assign({}, { id: data._id, ...dataWithoutId })
  }
}
